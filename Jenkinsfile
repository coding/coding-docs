pipeline {
  agent {
    docker {
      reuseNode 'true'
      registryUrl 'https://coding-public-docker.pkg.coding.net'
      image 'public/docker/nodejs:12'
    }

  }
  stages {
    stage('检出') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: '*']],
          userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]
        ])
        script {
          if ( env.MR_SOURCE_BRANCH ==~ /.*/ ) {
            sh "git checkout ${env.MR_TARGET_BRANCH}"
            sh "git checkout ${env.MR_SOURCE_BRANCH}"
          } else {
            sh "git checkout ${env.GIT_COMMIT}"
          }
        }
      }
    }
    stage('安装依赖') {
      steps {
        sh 'npm install'
      }
    }
    stage('检查代码规范') {
      when {
        changeRequest()
      }
      steps {
        sh "git diff --diff-filter=d --name-only ${env.MR_TARGET_BRANCH}... | grep '.md\$' | xargs npx remark -f"
        sh "git diff --diff-filter=d --name-only ${env.MR_TARGET_BRANCH}... | grep '.md\$' | xargs npx lint-md"
        sh "npx fnlint -c .fnlint.json"
      }
    }
    stage('增量检查 git commit') {
      when {
        changeRequest()
      }
      steps {
        script {
          sh 'npm install'
          sh """logs=`git log --pretty=format:'%s' ${env.MR_TARGET_BRANCH}... --no-merges`;
          echo "\$logs" | while read i; do echo \$i | npx commitlint; done
          """
        }
      }
    }    
    stage('构建') {
      steps {
        sh 'npx hexo generate'
        sh 'node generate-overview.js prod'
      }
    }
    stage('部署') {
      when {
        anyOf {
          branch 'master'
          tag '*'
        }
      }
      steps {
        sh 'mv public docs && mkdir public && mv docs public'
        sh 'npx hexo deploy'
      }
    }
  }
}