---
title: 在持续集成中使用 Docker - CODING 帮助中心
pageTitle: 在持续集成中使用 Docker
pagePrevTitle: qci-plugin
pagePrev: ci/plugins/customize/qci-plugin.html
pageNextTitle: Jenkins when 条件判断
pageNext: ci/practice/jenkins-when.html
alias: devops/ci/practice/docker.html
---

### [背景介绍](#intro)

在持续集成当中，除了使用 Docker 作为持续集成的[构建环境](/docs/ci/node/env.html#docker)外，您可能经常需要以 Docker 的形式运行额外的服务作为测试依赖，或在持续集成过程中构建 Docker 镜像，并推送到相关的制品库。

### [运行指定 Docker 镜像并在其中执行命令](#commands)

在构建过程中，您可能会需要使用到公有的 Docker 镜像仓库。以下是关于如何拉取指定的 Docker 镜像执行命令的 Jenkinsfile 参考。

```groovy
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                  script {
                    docker.image("ubuntu").inside('-e MY_ENV=123') {
                          sh 'echo ${MY_ENV}'
                    }     
                  }
            }
        }
    }
}
```

### [运行指定 Registry 的 Docker 镜像](#registry)

在构建过程中，您可能会需要使用到私有的 Docker 镜像仓库，例如希望使用 CODING 制品库中已上传的 Docker 镜像仓库。以下是相应的 Jenkinsfile 参考。

```groovy
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                  script {
                    docker.withRegistry('https://registry.example.com') {

                        // 将会从从主机名 registry.example.com 拉取 my-custom-image
                        docker.image('my-custom-image').inside {
                            sh 'make test'
                        }
                    }
                  }
            }
        }
    }
}
```

若所配置的 registry 对拉取操作带有鉴权，需要您提供有效的凭证 ID，以下是相应的 Jenkinsfile 参考。

```groovy
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                  script {
                    docker.withRegistry('https://registry.example.com', 'my-credentials-id') {

                    }
                  }
            }
        }
    }
}
```

### [在持续集成过程中构建 Docker 镜像](#docker)

```groovy
pipeline {
    agent any
    stages {
        // 需要检出代码后，才可以使用代码仓库内的 Dockerfile
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM', 
                    branches: [[name: env.GIT_BUILD_REF]], 
                    userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]])
            }
        }
        stage('Build') {
            steps {
                script {
                    // 默认将使用根路径的 Dockerfile 进行构建
                    docker.build('my-docker-image:1.0.0')
                }
            }
        }
    }
}
```

如需为构建指定额外的参数, 例如使用指定目录的 Dockerfile，以下是相应的 Jenkinsfile 参考。

```groovy
pipeline {
    agent any
    stages {
        // 需要检出代码后，才可以使用代码仓库内的 Dockerfile
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM', 
                    branches: [[name: env.GIT_BUILD_REF]], 
                    userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]])
            }
        }
        stage('Build') {
            steps {
                script {
                    // 将使用 ./dockerfiles/Dockerfile.build 进行构建
                    docker.build('my-docker-image:1.0.0', '-f Dockerfile.build ./dockerfiles')
                }
            }
        }
    }
}
```

### [将 Docker 镜像推送到指定的 Registry](#registry)

以下是相应的 Jenkinsfile 参考。

```groovy
pipeline {
    agent any
    stages {
        // 需要检出代码后，才可以使用代码仓库内的 Dockerfile
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM', 
                    branches: [[name: env.GIT_BUILD_REF]], 
                    userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]
                ])
            }
        } 

        stage('Build') {
            steps {
                  script {
                      docker.build('my-docker-image:1.0.0')

                    docker.withRegistry('https://registry.example.com', 'my-credentials-id') {
                        docker.image('my-docker-image:1.0.0').push()                    
                    }
                  }
            }
        }
    }
}
```


### [使用 Docker 运行额外的服务作为测试依赖](#testing-depand)

在测试过程当中，您可以使用 Docker 来运行如 MySQL 等可被用作测试依赖的服务。下述示例使用了两个容器，一个作为 MySQL 的服务，另一个提供执行环境 （使用 docker link 连接两个容器）。

```groovy
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                  script {
                    docker.image('mysql:5').withRun('-e "MYSQL_ROOT_PASSWORD=my-secret-pw"') { c ->
                        // 注意：这里 callback 的运行环境并不是上面运行的 mysql:5 环境内，而是运行 docker 的宿主机环境 

                        // 运行第二个 mysql 作为执行环境

                        docker.image('mysql:5').inside("--link ${c.id}:db") {
                          // 这里执行的命令都是在第二个运行的 mysql docker 容器内
                          // 等待 mysql 服务等待
                          sh 'while ! mysqladmin ping -hdb --silent; do sleep 1; done'
                        }

                        // callback 内容运行完毕后，mysql docker 容器将会自动 stop 和 rm 掉
                    }       
                  }
            }
        }
    }
}
```

### [同时运行多个容器作为测试的依赖服务](#nested)

有时候您可能不止需要一个额外的服务作为测试依赖，可以使用嵌套的方式来运行多个服务。

```groovy
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                  script {
                    docker.image('mysql:5').withRun('-e "MYSQL_ROOT_PASSWORD=my-secret-pw"') { c1 ->
                        // 注意：这里 callback 的运行环境并不是上面运行的 mysql:5 环境内，而是运行 docker 的宿主机环境

                        docker.image('redis').withRun('') { c2 ->
                            // 注意：这里 callback 的运行环境并不是上面运行的 redis 环境内，而是运行 docker 的宿主机环境
                            sh 'docker ps'
                        } 
                    }       
                  }
            }
        }
    }
}
```

### [参考文档](#reference)

如您还想进一步了解 Jenkins 当中使用 Docker 的配置方式，可以参考 Jenkins 官方文档：
-   [《在流水线中使用 Docker》](https://jenkins.io/zh/doc/book/pipeline/docker/)
-   [《流水线语法 —— 代理》](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#%E4%BB%A3%E7%90%86)

==== 2021/11/21 ====
