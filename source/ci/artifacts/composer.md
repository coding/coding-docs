---
title: Composer - CODING 帮助中心
pageTitle: Composer
pagePrevTitle: PHP 自动化测试
pagePrev: ci/testing/php.html
pageNextTitle: 构建 Docker 类型制品
pageNext: ci/artifacts/docker.html
alias: 
-   devops/ci/artifacts/composer.html
-   ci/artifacts/composer.html
---

本文将给出如何使用持续集成任务构建 Composer 制品的示例 Jenkinsfile。构建完成后可以使用预置插件便捷的上传至 CODING 制品仓库中。在使用该功能之前，请确保您对 Maven 类型制品库有[初步了解](/docs/artifacts/quick-start/composer.html)。

### Jenkinsfile

```groovy
pipeline {
  agent {
    docker {
      reuseNode 'true'
      registryUrl 'https://coding-public-docker.pkg.coding.net'
      image 'public/docker/php:8.0'
      // image 'public/docker/php:7.4' 以及 7.3、7.2、7.1、5.6
      args '-v /var/run/docker.sock:/var/run/docker.sock -v /usr/bin/docker:/usr/bin/docker -v /root/.cache:/root/.cache'
    }
  }
  stages {
    stage('检出') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: GIT_BUILD_REF]],
          userRemoteConfigs: [[
            url: GIT_REPO_URL,
            credentialsId: CREDENTIALS_ID
          ]]])
        }
      }
    stage('安装依赖') {
      steps {
        sh 'curl https://mirrors.cloud.tencent.com/composer/composer.phar -o /usr/local/bin/composer && chmod +x /usr/local/bin/composer'
        sh 'composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/'
        sh 'find /etc/apt/ -name "*.list" -print0 | xargs -0 sed -i -E "s/[a-z]+.debian.org/mirrors.cloud.tencent.com/g"'
        sh 'apt-get update && apt-get install -y libzip-dev unzip zip zlib1g-dev'
        sh 'docker-php-ext-install zip'
        sh 'composer install --no-dev'
        sh 'composer install'
      }
    }
    stage('检查代码规范') {
      steps {
        sh './vendor/bin/phpcs --extensions=php --standard=PSR12 src/ tests/'
        sh './vendor/bin/phpmd . text phpmd.xml --exclude vendor'
      }
    }
    stage('单元测试') {
      steps {
        sh 'XDEBUG_MODE=coverage ./vendor/bin/phpunit --coverage-clover coverage.xml --coverage-filter src/ tests/'
      }
    }
    stage('发布私有包') {
      steps {
        script {
          if (env.TAG_NAME ==~ /.*/ ) {
            ARTIFACT_VERSION = "${env.TAG_NAME}"
          } else {
            ARTIFACT_VERSION = "dev-${env.BRANCH_NAME.replace('/', '-')}"
          }
        }
        sh 'rm composer.lock'
        sh 'zip -r composer-package.zip . -x "./vendor/*"'
        withCredentials([
          usernamePassword(
            // CODING 持续集成的环境变量中内置了一个用于上传到当前项目制品库的凭证
            credentialsId: env.CODING_ARTIFACTS_CREDENTIALS_ID,
            usernameVariable: 'CODING_ARTIFACTS_USERNAME',
            passwordVariable: 'CODING_ARTIFACTS_PASSWORD'
          )]) {
              script {
                sh "curl -f -T composer-package.zip -u ${CODING_ARTIFACTS_USERNAME}:${CODING_ARTIFACTS_PASSWORD} https://${env.CCI_CURRENT_TEAM}-composer.pkg.coding.net/westore/composer?version=${ARTIFACT_VERSION}"
              }
        }
      }
    }
  }
}
```

### [环境变量](#env)

如果发布到「本项目」的制品库，无需设置环境变量。如果发布到「其他项目」，请阅读[《外部制品库认证》](/docs/ci/artifacts/outside.html)。

团队成员在进行本地开发时，可以使用自己的账号和密码，在 Linux/macOS 中修改 `~/.composer/auth.json`：

```json
{
     "http-basic": {
         "your-team-composer.pkg.coding.net": {
             "username": "<EMAIL>",
             "password": "<PASSWORD>"
         }
     }
 }
```
