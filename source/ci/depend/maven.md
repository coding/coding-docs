---
title: Maven - CODING 帮助中心
pageTitle: Maven
pagePrevTitle: 安装 Go 依赖包
pagePrev: ci/depend/go.html
pageNextTitle: 安装 PHP 依赖包
pageNext: ci/depend/php.html
alias: ci/depend/maven.html
---

Java 使用「Maven 制品库」存放依赖包，使用 Maven 或 Gradle 等构建工具进行依赖管理和安装。本文以 Gradle 为例，而 Maven 老项目可使用命令一键升级到 Gradle：

```shell
gradle init --type pom
```

### Gradle bin

Gradle 构建时会先下载 bin，官方下载链接在海外，内地用户访问可能很慢，建议切换为腾讯云镜像，即修改项目中的 `gradle/wrapper/gradle-wrapper.properties`：

```shell
# 腾讯云镜像
distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-6.8.1-bin.zip

# 默认海外
# distributionUrl=https\://services.gradle.org/distributions/gradle-6.8.1-bin.zip
```

### [公共制品库](#public)

Maven 公共制品库在海外，CODING 持续集成已内置国内镜像加速，无需配置。如本地开发需要加速，按照以下代码修改 `~/.gradle/init.gradle`：

```groovy
def repoConfig = {
    all { ArtifactRepository repo ->
        if (repo instanceof MavenArtifactRepository) {
            def url = repo.url.toString()
            if (url.contains('repo1.maven.org/maven2')
                || url.contains('jcenter.bintray.com')
                || url.contains('maven.google.com')
                || url.contains('plugins.gradle.org/m2')
                || url.contains('repo.spring.io/libs-milestone')
                || url.contains('repo.spring.io/plugins-release')
                || url.contains('repo.grails.org/grails/core')
                || url.contains('repository.apache.org/snapshots')
            ) {
                println "gradle init: [buildscript.repositories] (${repo.name}: ${repo.url}) removed"
                remove repo
            }
        }
    }

    // 腾讯云 maven 镜像聚合了：central、jcenter、google、gradle-plugin
    maven { url 'https://mirrors.cloud.tencent.com/nexus/repository/maven-public/' }
    maven { url 'https://maven.aliyun.com/repository/central' }
    maven { url 'https://maven.aliyun.com/repository/jcenter' }
    maven { url 'https://maven.aliyun.com/repository/google' }
    maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
    maven { url 'https://maven.aliyun.com/repository/spring' }
    maven { url 'https://maven.aliyun.com/repository/spring-plugin' }
    maven { url 'https://maven.aliyun.com/repository/grails-core' }
    maven { url 'https://maven.aliyun.com/repository/apache-snapshots' }
}

allprojects {
    buildscript {
        repositories repoConfig
    }

    repositories repoConfig
}
```

### [私有制品库](#private)

使用 Maven 私有制品库需先获得用户名/密码，参考文档：[《搭建团队级制品库》](/docs/artifacts/practices/team-share.html)。

#### gradle.properties

将制品库地址和用户名/密码添加到项目的 `build.gradle` 同一级目录下的 `gradle.properties` 文件中：

```ini
codingArtifactsMavenUrl=https://codes-farm-maven.pkg.coding.net/repository/share/build/
codingArtifactsUsername=无需填写
codingArtifactsPassword=无需填写
```

#### build.gradle

```groovy
repositories {
    maven {
        url codingArtifactsMavenUrl
        credentials {
            username = codingArtifactsUsername
            password = codingArtifactsPassword
        }
    }
}

dependencies {
    implementation 'com.tencent:cloudpay:1.6'
    implementation '[GROUP_ID]:[ARTIFACT_ID]:[VERSION]'
}
```

#### [本地构建](#local-build)

把用户名/密码作为参数传入构建命令：

```shell
./gradlew build -Dorg.gradle.project.codingArtifactsUsername=foo -Dorg.gradle.project.codingArtifactsPassword=bar
```

#### [持续集成构建](#Jenkins)

把用户名/密码填入环境变量：

![](https://help-assets.codehub.cn/enterprise/20210205151137.png)

```shell
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]], 
            userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]])
      }
    }
    stage('编译') {
      steps {
        sh "./gradlew build -Dorg.gradle.project.codingArtifactsUsername=$CODING_ARTIFACTS_USERNAME -Dorg.gradle.project.codingArtifactsPassword=$CODING_ARTIFACTS_PASSWORD"
      }
    }
  }
}
```

==== 2020/08/21 ====
