---
title: OpenAPI/Swagger - CODING 帮助中心
pageTitle: OpenAPI/Swagger
pagePrevTitle: 接入自动化工具
pagePrev: management/api/automation.html
pageNextTitle: Postman 导入指南
pageNext: management/api/postman.html
alias: management/api/import/openapi.html
---

> OpenAPI / Swagger 相较于其他规范完善程度更高，生态更加完整，是目前 CODING 推荐的 API 设计语言。

### 什么是 OpenAPI / Swagger

[OpenAPI](https://swagger.io/resources/open-api) 规范（OAS）是一种通用的、和编程语言无关的 API 描述规范，使人类和计算机都可以发现和理解服务的功能，而无需访问源代码、文档或针对接口进行嗅探。正确定义后，使用者可以使用最少的实现逻辑来理解远程服务并与之交互。

OpenAPI 始于 Swagger 规范，Swagger 规范已于 [2015 年捐赠给 Linux 基金会后改名为 OpenAPI](https://smartbear.com/blog/develop/what-is-the-difference-between-swagger-and-openapi/)，并定义最新的规范为 OpenAPI 3.0。

CODING 目前支持以下版本导入：

-   OpenAPI v3（OAS 3）
-   Swagger v2

### 最佳实践

通常，设计 API 规范有两个方向，Design-First（设计优先） 或 Code-First（编码优先）

1.  Design-First（设计优先）：

   即优先设计 API 规范，设计完成后再着手进行代码开发工作。

   采用 Design-First 就意味着，将设计 API 路由、参数等工作提前，后续整个软件开发的流程都需要围绕着 API 规范为核心，当然这需要有一定的设计经验的开发人员才能胜任。

   Design-First 有很多好处：

   -提高开发效率。开发团队将根据 API 规范进行并行开发和对接工作，而无需等待接口逻辑开发完毕。
   -降低接口开发的成本，无需修改代码逻辑即可轻松地修改 API 规范，因为 API 描述语言（如：OpenAPI）与编码语言无关
   -开发人员更加专注于设计 API 规范，对比 Code-First 可以描写更多 API 的细节，如：校验规则、范例数据等，同时开发人员对 API 的全局一致性、扩展性、规范性也有更好的把控。
   -在联调开发的过程中可以提前发现和解决问题，避免问题在开发完毕后修改的成本过高。
   -由于 API 描述更加标准化，可以方便做更多的 API 生态延伸，比如基于 API 规范生成 Mock API Server，开发  API 自动化测试代码，接入 API 网关等。

   点击查看[更多参考](https://swagger.io/blog/api-design/design-first-or-code-first-api-development)

2.  Code-First（编码优先）：

   即通过代码中关于 API 描述特性、注解或注释自动生成 API 描述文件的设计方式，如：JAVA 生态的 SpringFox。

   适合倾向于在代码上编写 API 规范，通过自动化设施自动生成文档的团队。
   
   Code-First 的优点：
   
   -节省时间。对于 API 开发者，编码的同时可以获得一份满足基本要求的 API 文档。
   -方便接入自动化 CI/CD 流程中。
   
   虽然 Code-First 省去了开发者设计 API 描述文件的阶段，提高了 API 开发者的效率，但是从整个团队的角度来看，效率并不一定提升了，反而有可能降低了效率。
   
   不同 API 开发者的经验和习惯的不同，极有可能在编码的过程中对 API 的限制条件考虑不全，又或者框架生成 API 文档的程序完善度不够，种种因素导致最终生成的 API 的描述无法达到理想标准。
   
   而很多 API 开发者习惯开发完成后才推送代码，并生成 API 文档，也导致了团队的进程阻塞于此，拖后了整个团队的开发进程。另一方面，API 在开发完成如果没有测试，很有可能导致 API 对接者在对接的过程中遇到重重阻碍。
   
   CODING 也希望各位开发者重视 API 设计的重要性，如果您喜欢 Code-First 设计方向，我们的建议是：
   
   -选用完善程度比较高的生成组件
   -对 API 的描述尽可能的细致、完整
   -优先设计路由、请求、响应等规则，详细的逻辑代码在 API 设计完成后再着手开发。

Design-First 和 Code-First 针对不同的场景有着各自的优势，不同团队对两者考虑的方向也不同，但是对 API 描述的完善不管是哪个方向都是最重要的。

下面我们将针对 Design-First 和 Code-First 两个方向的最佳实践作展开。

#### Design-First

OpenAPI 进化到 v3 版本后，虽然规范非常完善，但对于首次上手的同学来说还是非常复杂，那么带有界面的编辑工具会成为最佳选择。

这里我们推荐使用  [OpenAPI-GUI v3](https://mermade.github.io/openapi-gui) 来设计 API 描述文件，如下图所示。

![](https://help-assets.codehub.cn/enterprise/20191223145811.png)

##### OpenAPI-GUI v3 基本使用

OpenAPI-GUI v3 支持设计大多数常见情况的 API 规则，并且支持本地部署，非常适合新手，下面我们简单介绍一下 OpenAPI-GUI v3 的基本使用方式。

![](https://help-assets.codehub.cn/enterprise/20191223145901.png)

OpenAPI-GUI v3 的导航结构如上图所示。   

首先，我们切换到 `Header`，给 API 文档定义标题、描述、作者等基础信息。

![](https://help-assets.codehub.cn/enterprise/20191223150930.png)

接着，我们切换至 `Servers` 配置 API 各环境基础路径地址。

![](https://help-assets.codehub.cn/enterprise/20191223150958.png)

如果您的 API 需要经过鉴权（OAuth、APIKey 等），您可以切换到 `Security` 配置响应的鉴权信息，如下图所示。

![](https://help-assets.codehub.cn/enterprise/20191223151344.png)

下面将开始设计 API 分组，点击切换到 `Tags`，对应的之后设计的接口可与分组相关联，并在文档中展示时，合并到对应分组栏目中。

![](https://help-assets.codehub.cn/enterprise/20191223151421.png)

`Main` 为最主要的 API 设计界面，需要了解的是，CODING API 文档以 tag 分组，而该界面以路由+请求方法（Method）分组。

![](https://help-assets.codehub.cn/enterprise/20191223151435.png)

Description  TAB 用于填写接口的标题、描述和关联 tag 信息，建议全部填写，若未填 Summary，API 文档将显示 API ID（OperationID），未关联 tag 将归属于默认分组。

![](https://help-assets.codehub.cn/enterprise/20191223151448.png)

Parameter 用于定义请求 Query、Header、Cookie 和路由参数规则，Location 可指定参数位置。

![](https://help-assets.codehub.cn/enterprise/20191223151518.png)

而在非 GET 请求方式（Method）方式下，如 POST / PATCH / PUT 等，Request Body 则用于定义请求 Body 的规则，如 Form 表单参数、纯 JSON 方式提交参数定义等。

![](https://help-assets.codehub.cn/enterprise/20191223151530.png)

对应的 Request Body 必须定义 Media-Type，可定义多个 Media-Type，API 服务器将根据该参数识别 Body 内容结构，如上图所示 `application/json` 即为纯 JSON 方式提交表单参数。

您可以复用实体，下面会讲到，或者直接编辑请求结构，点击后弹出如下图所示，可直接编辑。

![](https://help-assets.codehub.cn/enterprise/20191223151608.png)

需要注意的是，该弹窗弹出位置可能会在显示页面下方，需要滚动到下方才可看到。

切换到  Response TAB，我们可以定义接口响应返回的结构。

在这个界面可以增加多条响应结构，如 200、400、401 多个状态码有多重不同响应返回结构，或者同状态码下不同 Media-Type 不同返回结构。

点击编辑结构和 Request Body 类似，可定义响应数据结构规则。

![](https://help-assets.codehub.cn/enterprise/20191223151646.png)

切换到 Security TAB，可以配置接口的鉴权配置，由于编辑器未完善，您可在设计完成后通过导出 OpenAPI 描述文件，以源文件的形式修改 scope 范围（可参考下方进阶教程）。

![](https://help-assets.codehub.cn/enterprise/20191223151703.png)

> 由于 Docs / Links / Callbacks 在日常使用时不常用到，CODING API 文档暂不作展示。

在设计完毕后，您可点击右上角 Save 按钮保存修改，并点击 `Export JSON` 或者 `Export YAML` 复制或者下载 OpenAPI 描述文件。

![](https://help-assets.codehub.cn/enterprise/20191223151714.png)

接着，在 CODING API 文档导入并发布。

![](https://help-assets.codehub.cn/enterprise/20191223152051.png)

等待发布完毕后，点击详情页的文档地址，查看最终效果。

##### 已有 OpenAPI 描述文件

如果您已有 OpenAPI 描述文件，或者您想先看一下效果，那么您可以切换到 `Upload` TAB，将描述文件填入编辑框，或者点击 `Demo` 加载范例文件，并点击 `Load Definition` 加载描述文件。

![](https://help-assets.codehub.cn/enterprise/20191223152111.png)

##### 进阶

虽然使用 OpenAPI-GUI v3 设计非常方便，但是对 OpenAPI 支持的并不完整，比如 Request & Response Example 无法在线编辑，这种场景下，我们就需要针对 OpenAPI 描述源文件进行编辑。

这里我们推荐使用 [Swagger Editor](https://editor.swagger.io/) 进行编辑，如下图所示：

![](https://help-assets.codehub.cn/enterprise/20191223152739.png)

Swagger Editor 是所见即所得的，并且如果写的语法有问题，会在对应段落显示错误提示，并说明错误原因，如下图所示：

![](https://help-assets.codehub.cn/enterprise/20191223152823.png)

相对于纯手写 OpenAPI 描述文件，Swagger Editor 有个贴心的功能，您可以很方便的通过可视化界面插入描述（如：path、operation 等）至编辑框中，如下图所示，

![](https://help-assets.codehub.cn/enterprise/20191223152830.png)

![](https://help-assets.codehub.cn/enterprise/20191223152838.png)

为了方便理解 OpenAPI v3 规范，我们在下方给出了 OpenAPI v3 的一般结构范例，对应的右边给出了字段的备注信息，方便对照：

> 该范例 CODING API 文档均支持展示

```yaml
openapi: 3.0.0														# 代表使用 OpenAPI v3 规范
info:																			# 这里写 API 文档基础信息
  title: 宠物商店 API 文档										# API 文档标题
  version: '1.0.0'													# API 文档版本
  description: 这是一篇关于宠物商店的 DEMO API 文档，仅做参考。		# API 文档描述
  contact:																	# 联系信息
    name: CODING
    url: 'https://coding.net'
    email: support@coding.net
servers:																	# 这里写 API 服务器地址，多条可代表不同环境
  - url: 'https://petstore.com/api/v1'
    description: 生产环境
  - url: 'http://test.petstore.com/api/v1'
    description: 测试环境
tags:																			# 标签，CODING 中可作为分组依据，name 作为分组名称
  - name: 宠物
    description: 所有关于宠物的内容
  - name: 会话
    description: 关于用户的注册、登录和登出
paths:                                    # 这里写具体的 API 的相关信息（API 名称、请求类型、摘要、请求参数、响应等）
  /pets/{petId}:														# 第一层，API 路由
    get:																			# 第二层，请求方法（Method）,如: get, post, delete 等
      tags:																			# 标签，与上方全局的标签对应，将该接口归于对应 tag 的组中
        - 宠物
      summary: 宠物详情														# 接口摘要，CODING 中可作为接口标题
      operationId: get-pet											# 接口 ID（必填），接口的唯一识别方式 
      description: 获取宠物信息						 		 		# 接口描述信息
      parameters:																# 接口参数，可多条，支持路由、Query、Header 参数
      	- schema:																	# 参数结构
          type: string															# 参数类型，integer / string / array 等
          name: petId																# 参数 key
          in: path																	# 路由（path）类型的参数
          required: true														# 是否必填
          description: 宠物 ID											 # 参数描述
        - schema:
            type: string
            enum:																		# 参数枚举
              - application/json
              - application/xml
            default: application/json
          in: header															# header 类型的参数
          name: Accept
          description: 返回数据媒体类型
        - schema:
            type: integer
            default: 1															# 参数默认值
          in: query																# Query 类型的参数
          name: page
          description: 页码
      security:																	# 接口授权信息，此处与全局 components/securitySchemes 对应
        - petstore_auth:													# 此处与 components/securitySchemes/petstore_auth 对应
            - 'read:pets'														# 此处代表接口 OAuth Scope 信息
      responses:																# 接口响应信息
        '200':																		# 响应状态码
          description: 以数组形式返回宠物信息 					# 响应描述信息
          headers:
            X-PAGE:
              schema:
                type: integer
              description: 当前页码
          content:																# 响应内容规范描述
            application/json:												# 响应内容 Media Type
              schema:																	# 响应内容结构
                type: array
                description: 宠物信息
                items:
                  $ref: '#/components/schemas/Pet'	# $ref 可用来引用 components/schemas 中的各种实体声明，减少相同数据结构冗余，增加复用性
              examples:															# 响应范例，建议填写，可用于 CODING API 文档范例显示以及 Mock API 模拟数据
                请求成功范例:														# 范例名称
                  value:																# 范例，展示时将转换成 JSON 形式
                    - id: 1
                      name: doggie
        '400':
          description: 请求失败
		patch:																	# patch 请求方法
			tags:
        - 宠物
      summary: 单独更新宠物属性
      operationId: patch-pet
      description: 单独更新宠物属性
      deprecated: true										 # 接口是否已废弃
      requestBody:												 # post / put / patch 等请求需要传输 body 时，请指定 requestBody，Path / Query / Header 请写在 parameters 中
        content:
          application/x-www-form-urlencoded:	# 媒体类型 Media Type
            schema:															# 参数结构与上述 parameters 中相同
              type: object
              properties:
                categoryId:
                  type: integer
                  description: 分类 ID
                status:
                  type: string
                  description: 状态
                  enum:
                    - available
                    - pending
                    - sold
                photoUrls:
                  type: array
                  description: 照片地址列表
                  items:
                    type: string
                    description: 照片地址
                name:
                  type: string
                  description: 宠物名称
                isHealthy:
                  type: boolean
                  description: 是否健康
                tagIds:
                  type: string
                  description: 标签 ID 数组
            examples:															# 请求 Body 范例，将在 CODING API 文档右侧范例区展示
              更新范例:																# 范例名称
                value:																# 范例内容，以下将以 JSON 形式展示
                  status: sold
      responses:
        '200':
          description: 更新成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'
components:															# 通用组件，可定义复用的实体、响应、请求以及授权信息等
  schemas:																# 实体信息
    Pet:																		# 实体 key
      title: Pet															# 名称
      type: object														# 实体数据结构类型
      description: 宠物实体信息									# 描述信息
      properties:															# 实体参数，可多条
        id:
          type: integer
          format: int64
          description: ID
        name:
          type: string
          example: doggie
          description: 名称
  securitySchemes:												# API 所使用的授权方式，可多条，CODING 会展示所有授权方式
    petstore_auth:													# 授权方式 Key
      type: oauth2														# 授权类型，可为：apiKey、http、oauth2、openIdConnect
      flows:																	# OAuth2 所需要的流程信息
        authorizationCode:											# OAuth2 授权类型，可为：implicit、password、clientCredentials、authorizationCode
          authorizationUrl: 'https://petstore.com/oauth/authorize'	# 跳转授权地址
          tokenUrl: 'https://petstore.com/oauth/token?grant_type=authorization_code'	# 获取 token 地址
          scopes:												# 所有 scope 列表
            'write:pets': 修改宠物信息权限
            'read:pets': 查看宠物信息权限
          refreshUrl: 'https://petstore.com/oauth/token?grant_type=refresh_token'		# 刷新 token 地址
      description: OAuth2 授权模式					# 描述信息
```

更详细的规范可参考：

-   [OpenAPI Map](https://openapi-map.apihandyman.io/)
-   [OpenAPI Specification](https://swagger.io/docs/specification/about/)

#### Code-First

通过自动生成 OpenAPI 描述文件，我们可以很简单的接入 CODING API 文档的自动化流程，方便开发同学提交代码自动发布 API 文档。

> 此处我们以 Java 语言的 [Springfox](https://github.com/springfox/springfox) 为例
> 其他语言可参考以下方案：
>
> -   PHP：[Swagger PHP](https://github.com/zircote/swagger-php)
> -   Go：[Go Swagger](https://github.com/go-swagger/go-swagger/)
> -   Python Flask：[Flask RestPlus](https://github.com/noirbizarre/flask-restplus)
> -   NodeJS Express：[Swagger Node Express](https://www.npmjs.com/package/swagger-node-express)
> -   [点击查看](https://swagger.io/tools/open-source/open-source-integrations)

首先我们新建一个 SpringBoot 项目，添加 springfox 依赖：

```groovy
dependencies {
	compile ('io.springfox:springfox-swagger2:2.9.2') {
		exclude(module: 'io.swagger:swagger-annotations')
		exclude(module: 'io.swagger:swagger-models')
	}
	compile("io.swagger:swagger-annotations:1.6.0")
	compile("io.swagger:swagger-models:1.6.0")
}
```

> 上面 swagger-annotations 指定新版本操作，由于在非 String 的请求参数（如 Integer） @RequestParam 中指定 defaultValue 时，springfox 2.9.2 依赖的 swagger 包较旧，导致编译时报类型转换错误的问题，在新版已解决。

然后我们在 Application 中针对 Springfox 进行初始化配置操作，并定义 Swagger API 文档的全局描述信息：

```Java
	@Bean
	public Docket docket(ServletContext servletContext) {
		ApiSelectorBuilder builder = new Docket(DocumentationType.SWAGGER_2)	// 定义 Swagger 2.0 规范
				.apiInfo(apiInfo())													// 定义全局描述信息
				.tags(new Tag("宠物", "所有关于宠物的内容"),		// 定义 tag，对应 CODING API 文档的菜单 API 分组
						new Tag("会话", "关于用户的注册、登录和登出"))
				.host("petstore.com")												// 定义 API 基础域名
				.pathProvider(new RelativePathProvider(servletContext) {	// 定义 API 基础路径前缀，与 host 配合组成 petstore.com/api/v1
					@Override
					public String getApplicationBasePath() {
						return "/api/v1";
					}
				})
				.select();

		builder.apis(RequestHandlerSelectors.withClassAnnotation(RestController.class));	// 指定只扫描 @RestController 注解的 Controller 的 API

		return builder.build()
				.ignoredParameterTypes(RequestAttribute.class)	// 排除扫描 @RequestAttribute 注解
				.ignoredParameterTypes(Errors.class);						// 排除扫描 @Errors 注解
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder()
				.title("宠物商店 API 文档")						// 定义文档标题
				.description("这是一篇关于宠物商店的 DEMO API 文档，仅做参考。")	// 定义文档描述
				.termsOfServiceUrl("http://swagger.io/terms/")						// 定义服务条款
				.contact(new Contact("CODING", "https://coding.net", "support@coding.net"))	// 定义联系信息
				.license("Apache 2.0")		// 定义 License
				.licenseUrl("http://www.apache.org/licenses/LICENSE-2.0.html")		// 定义 License URL
				.version("1.0.0")					// 定义 API 版本
				.build();
	}
	
```

接下来，我们可以开始设计 API 规则，以 PetController 为例，即 `/pets` 路由：

```java
@Api(tags = {"宠物"})
@RestController
@RequestMapping("/pets")
public class PetController {

    @ApiOperation(value = "宠物列表", notes = "列出所有宠物信息")
    @GetMapping("")
    public ResponseEntity<List<Pet>> all(@ApiParam(value="限制每页返回数量（最大限制：100）") @RequestParam(required = false, defaultValue = "20") Integer pagesize,
                                         @ApiParam(value="页码") @RequestParam(required = false, defaultValue = "1") Integer page) {
        return ResponseEntity.ok(new ArrayList<>());
    }

    @ApiOperation(value = "宠物详情", notes = "获取指定 ID 的宠物详情")
    @GetMapping("{petId}")
    public ResponseEntity<Pet> detail(@ApiParam(value="宠物 ID", required = true) @PathVariable Integer petId,
                                      @ApiParam(value = "媒体类型", required = true, allowableValues = "application/json,application/xml", defaultValue = "application/json") @RequestHeader String Accept) {
        return ResponseEntity.ok(null);
    }
}
```

这里我们定义了两个路由，分别为：

```bash
GET /pets 宠物列表
```

-   Query 请求参数

  -**pagesize** int 选填

    限制每页返回数量（最大限制：100）

    默认值 20

  -**page** int 选填

    页码

    默认值 1

-   响应结构

  -Pet 实体数组 array

```bash
GET /pets/{petId} 宠物详情
```

-   Header 参数

  -**Accept** string

    可选值 `application/json` `application/xml`，默认值 `application/json`。

    媒体类型

-   路由参数

  -**petId** int

    宠物 ID

-   响应结构

  -Pet 实体 object

至此，我们完成了上述两个 API 的设计，无需提前实现代码逻辑，我们即可获得 Swagger 2.0 的描述文件，步骤如下：

> 该范例使用 Jetty 作为 Server

1.  启动应用

   ```shell
   ./gradlew bootRun
   ```

2.  打开浏览器访问

   ```bash
   <http://127.0.0.1:{port}/v2/api-docs>
   ```

   其中 {port} 为配置的服务 WEB 端口

   返回的内容即为 Swagger 2.0 描述文件，如下图所示：

   ![](https://help-assets.codehub.cn/enterprise/20191223153216.png)

右键选择「存储为」保存至本地，可命名为 `xxx.json`，将该 Swagger 2.0 描述文件导入至 CODING 即可生成 API 文档，如下图所示：

![](https://help-assets.codehub.cn/enterprise/20191223153228.png)

生成的 API 文档效果如下图所示：

![](https://help-assets.codehub.cn/enterprise/20191223153241.png)

[点击查看](https://demo-api.coding.net/public/springfox-demo/springfox-demo/git/files)该范例的源代码。

更多 Springfox 的用法可参考[官方文档](http://springfox.github.io/springfox)

==== 2020/08/13 ====
