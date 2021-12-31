---
title: Java Spring Boot - CODING 帮助中心
pageTitle: Java Spring Boot
pagePrevTitle: 自动化测试介绍
pagePrev: ci/testing/intro.html
pageNextTitle: PHP 自动化测试
pageNext: ci/testing/php.html
alias: 
-   devops/ci/testing/java-spring-boot.html
-   ci/testing/java-spring-boot.html
---

Spring Boot 2.2 版本开始引入 JUnit 5 作为默认的单元测试组件，适用于 Java 8 及更高版本。

### [安装](#install)

修改项目中的 `build.gradle` 文件，引入 JaCoCo 测试覆盖率工具，并配置「行覆盖率」需达到 80%：

```shell
plugins {
  id 'org.springframework.boot' version '2.3.4.RELEASE'
  id 'io.spring.dependency-management' version '1.0.10.RELEASE'
  id 'java'
  id 'jacoco'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

repositories {
  mavenCentral()
}

dependencies {
  implementation 'org.springframework.boot:spring-boot-starter'
  testImplementation('org.springframework.boot:spring-boot-starter-test') {
    exclude group: 'org.junit.vintage', module: 'junit-vintage-engine'
  }
}

test {
  useJUnitPlatform()
  finalizedBy jacocoTestCoverageVerification
}

jacocoTestCoverageVerification {
  violationRules {
    rule {
      limit {
        counter = 'LINE'
        value = 'COVEREDRATIO'
        minimum = 0.8
      }
    }
  }
  dependsOn jacocoTestReport
}

jacocoTestReport {
  dependsOn test
}
```

### [编写测试代码](#code)

按照 [Spring Boot 官方文档](https://spring.io/guides/gs/spring-boot/)，编写代码。

业务代码（`src/main/java/com/example/demo/HomeController.java`）：

```java
package com.example.springboot;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class HelloController {

  @RequestMapping("/")
  public String index() {
    return "Greetings from Spring Boot!";
  }

}
```

单元测试代码（`src/test/java/com/example/springboot/HelloControllerTest.java`）：

```java
package com.example.springboot;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@SpringBootTest
@AutoConfigureMockMvc
public class HelloControllerTest {

  @Autowired
  private MockMvc mvc;

  @Test
  public void getHello() throws Exception {
    mvc.perform(MockMvcRequestBuilders.get("/").accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(content().string(equalTo("Greetings from Spring Boot!")));
  }
}
```

集成测试代码（`src/test/java/com/example/springboot/HelloControllerIT.java`）：

```java
package com.example.springboot;

import static org.assertj.core.api.Assertions.*;

import java.net.URL;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class HelloControllerIT {

  @LocalServerPort
  private int port;

  private URL base;

  @Autowired
  private TestRestTemplate template;

    @BeforeEach
    public void setUp() throws Exception {
        this.base = new URL("http://localhost:" + port + "/");
    }

    @Test
    public void getHello() throws Exception {
        ResponseEntity<String> response = template.getForEntity(base.toString(),
                String.class);
        assertThat(response.getBody()).isEqualTo("Greetings from Spring Boot!");
    }
}
```

### [本地运行](#run)

本地运行测试，将会在 `build/reports/jacoco/test/html/` 生成 HTML 格式的覆盖率报告。

如果行覆盖率不达标，将会报错退出。

```shell
$ ./gradlew clean test

> Task :test
2021-04-06 16:08:03.346  INFO 13478 --- [extShutdownHook] o.s.s.concurrent.ThreadPoolTaskExecutor  : Shutting down ExecutorService 'applicationTaskExecutor'

> Task :jacocoTestCoverageVerification FAILED
[ant:jacocoReport] Rule violated for bundle workshop: lines covered ratio is 0.6, but expected minimum is 0.8

FAILURE: Build failed with an exception.

$ open build/reports/jacoco/test/html/index.html
```

![](https://help-assets.codehub.cn/enterprise/20200919000036.png)


### [持续集成](#ci)

```groovy
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: '*']],
          userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]
        ])
      }
    }
    stage('测试') {
      agent {
        docker {
          image 'adoptopenjdk:11-jdk-hotspot'
          args '-v /root/.gradle/:/root/.gradle/ -v /root/.m2/:/root/.m2/'
          reuseNode true
        }
      }
      steps {
        sh './gradlew test'
      }
      post {
        // 不管成功失败，都收集简易测试结果
        always {
          junit 'build/test-results/**/*.xml'
        }
        // 成功时，才收集测试覆盖率报告
        success {
          codingHtmlReport(name: '测试覆盖率报告', tag: 'test', path: 'build/reports/jacoco/test/html', entryFile: 'index.html')
        }
      }
    }
  }
}
```

==== 2020/09/28 ====
