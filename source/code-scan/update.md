---
title: 规则包更新记录 - CODING 帮助中心
pageTitle: 规则包更新记录
pagePrevTitle: 扫描方案
pagePrev: host/code-scan/projects.html
pageNextTitle: 代码浏览与对比
pageNext: host/browsing.html
alias: host/codedog/task.html
---

官方规则包是由 CODING 按照一些设定的场景对规则库中的规则进行筛选和评审得到的规则集合，便于按照使用场景快速启用扫描能力。这些官方规则包由 CODING 进行统一维护，随着时间的沉淀，我们将不断根据用户数据和新接入的工具规则来不断对官方规则包进行优化，进而提供更优质的扫描能力。

本文记录了历次规则包的升级公告与相关内容。

---

### [2021.03.05 升级](#03-05)

#### 概述

本次更新将于 `2021.03.05` 进行，对现存**扫描业务**及**扫描方案中的自定义内容**不会造成影响。

本次更新将对现有规则包进行整体升级，新增的规则包均为代码规范类规则包，新增的规则包将在系统推荐扫描方案中将默认启用，在自定义扫描方案中需自行手动启用。

完善了现有的基础、功能、安全类型规则包。

我们将在后续推出规则包版本管理能力，您从容选择是否沿用历史版本的规则包（敬请期待）。若有任何问题，欢迎发送邮件至  <a href="mailto:support@coding.net">support@coding.net</a> 或通过[工单](https://e.coding.net/signin?redirect=/workorder)联系我们。

#### 内容

#### JAVA

更新内容

**- 功能规则包**

保留规则包中原有规则，更新 `无用的循环`、`应该重用随机对象`、`"equals(Object obj)" 和 "hashCode()" 应该一同重写`等推荐规则。

**- 安全规则包**

保留规则包中原有规则，更新 `printstacktrace(…)不应该被调用`、`IP地址硬编码`、`使用伪随机数生成器`、`Cookie 中存储个人数据` 等规则，以发现更多影响应用安全的潜在代码问题。

**- 代码规范规则包**

此规则包将与原有规则包差别较大，新的规则包根据腾讯云内部实践经验所整理。

---

#### JavaScript

更新内容

**- 代码规范规则包**

此规则包将与原有规则包差别较大，新的规则包根据腾讯云内部的实践经验所整理。

**- 功能规则包**

保留规则包中原有规则，增加如 `禁止在 finally 语句块中出现控制流语句`、`不允许类成员中有重复的名称` 等推荐规则。

**- 安全规则包**

保留规则包中原有规则，新增更多规则以发现更多可能影响应用安全的代码问题，如 `不安全的加密`、`不安全的哈希检查` 等。

新增 `VUE` 规则包

1.  新增 `VUE` 代码规范规则包。

2.  新增 `VUE` 推荐规则包。

---

#### TypeScript

更新内容

**- 代码规范规则包**

此规则包将与原有规则包差别较大，新的规则包根据腾讯云内部的实践经验所整理。

---

#### C/C++

更新内容

**- 安全规则包**

保留规则包中原有规则，增加如 `IP 硬编码`、`类型转换前是否使用了取址操作符` 等推荐规则。

**- 代码规范规则包**

此规则包将与原有规则包差别较大，新的规则包根据腾讯云内部的实践经验所整理。

---

#### Python

更新内容

**- 功能规则包**

保留规则包中原有规则，增加 `从返回值为 None 的函数中复制` 等推荐规则。

**- 代码规范规则包**

此规则包将与原有规则包差别较大，新的规则包根据腾讯云内部的实践经验所整理。

---

#### Object-C

更新内容

**- 代码规范规则包**

此规则包将与原有规则包差别较大，新的规则包根据腾讯云内部的实践经验所整理。

---

#### C

更新内容

**- 功能规则包**

保留规则包中原有规则，增加如 `Unity 项目禁止使用 LINQ (GC 内存分配较大，影响性能)` 等推荐规则。

**- 代码规范规则包**

此规则包将与原有规则包差别较大，新的规则包根据腾讯云内部的实践经验所整理。

---

#### Kotlin

更新内容

**- 基础规则包**

保留规则包中原有规则，增加如 `when 表达式中出现重复的 case`、`重写 equals 时覆盖 hashCode` 等推荐规则。

---

#### GO

更新内容

**- 代码规范规则包**

此规则包将与原有规则包差别较大，新的规则包根据腾讯云内部的实践经验所整理。

### [2021.06.01 升级](#06-01)

#### 概述

本次升级主要针对 Java 语言的官方规则包，结合使用数据对现有规则包再次进行了走查、评审，主要调整内容如下：

1.  对 Java 规范规则包中的规则进行了精简，且剩下的规则进行适当的"降级"以及规则描述补全。
2.  对原有 Java 敏感信息规则包进行了拆分处理，将其中 5 条敏感信息规则归并到 通用敏感信息规则包，剩余 3 条安全类规则整合到 Java 安全规则包中
3.  丰富 Java 安全规则包，一方面如上文描述从 Java 敏感信息中将安全规则迁移，另一方面增加三条 cobra 工具下的安全规则。
4.  对 Java 功能规则包以及 Xcheck 规则包，修复规则包中部分规则描述

#### 影响

*以下仅影响启用 Java 规则包的项目*

1.  代码规范评分可能会提升，本次更新对规范规则包中规则进行了适当的"降级处理"
2.  扫描出的安全问题可能会增加，请重点关注。本次新增加了三条默认规则
3.  敏感信息问题可能会被关闭，敏感信息规则一般需要您根据公司实际情况调整规则参数中的正则表达式，如果希望可以通过正则表达式来扫描代码中是否存在某些敏感信息，可以前往敏感信息规则包中设置。

#### 内容

1.  Java 代码规范规则包中，完善规则描述，调整规则严重级别，调整详情如下：

   以下规则从 错误级别 调整至 提示级别

   **错误级别调整至警告级别**

   ```text
   AvoidEscapedUnicodeCharacters、NoLineWrap、CustomImportOrder、OverloadMethodsDeclarationOrder、NeedBraces、LeftCurly、RightCurly、OneStatementPerLine、OperatorWrap、
SeparatorWrap、EmptyLineSeparator、NoWhitespaceBefore、ParenPad、MethodParamPad、MultipleVariableDeclarations、ArrayTypeStyle、MissingSwitchDefault、
InterfaceTypeParameterName、MethodTypeParameterName、ClassTypeParameterName、CatchParameterName、AbbreviationAsWordInName、LambdaParameterName、FallThrough
   ```

   **错误级别调整至提示级别**

   ```text
   OuterTypeFilename、WrongEncoding、FileTooLong、FileTabCharacter、IllegalTokenText、AvoidStarImport、OneTopLevelClass、Indentation、WhitespaceAround、UpperEll、
VariableDeclarationUsageDistance、AnnotationLocation、CommentsIndentation、PackageName、TypeName、MethodName、ConstantName、LocalVariableName、MemberName、
ParameterName
   ```

   警告级别调整至提示级别

   ```text
   LineLength、ModifierOrder
   ```

2.  Java 敏感信息规则包

   此规则包将拆分，如对此规则包有自定义内容仍然会保留。此规则包原有规则将分别合入 Java 安全规则包和 敏感信息规则包中

3.  Java 安全规则包

   此规则包中将增加以下规则

   ```text
   允许任意证书（CWE-295）、Logger敏感信息、打印堆栈信息、DmiConstantDbPassword、DmiEmptyDbPassword、LoggingPrivateData
   ```

### [2021.10.08 升级](#10-08)

CODING 近期上新了两款工具（semgrep、CODEDOG 安全漏洞检查），增强了以下规则包扫描能力：

#### Java 基础规则包

将 semgrep 下述规则，添加至 Java 基础规则包。

```java
DefaulthttpclientIsDeprecated
DesIsDeprecated
HttpservletPathTraversal
InsecureHostnameVerifier
InsecureSmtpConnection
InsecureTrustManager
JaxRsPathTraversal
NoNullCipher
NoStaticInitializationVector
NoStringEqeq
PermissiveCors
ServerDangerousObjectDeserialization
ServletresponseWriterXss
UnrestrictedRequestMapping
UseOfMd5
UseOfSha1
WeakSslContext
XmlinputfactoryExternalEntitiesEnabled
```

#### JS 安全规则包

将 semgrep 工具下述规则，添加至 JS 安全规则包。

```javascript
EqeqIsBad
GrpcNodejsInsecureConnection
HardcodedJwtSecret
JwtExposedCredentials
JwtNoneAlg
```

将 CODEDOG 安全漏洞检查工具下述规则，添加至 JS 安全规则包：

```javascript
addEventListener message param 可控
Chrome ext function XSS
executeScript中参数拼接
Handlebars XSS
HTML attr injection
HTML injection
JQuery eval
JQuery HTML attr injection
JQuery XSS
JQuery 原型链污染
RCE in JS
URL Redirect
XSS in JS
```

#### TS 安全规则包

将 semgrep 工具下述规则，添加至 TS 安全规则包：

```typescript
ReactControlledComponentPassword
ReactDangerouslysetinnerhtml
ReactMarkdownInsecureHtml
```

#### Go 安全规则包

将 semgrep 工具下述规则，添加至 Go 安全规则包：

```go
AvoidSshInsecureIgnoreHostKey
DynamicHttptraceClienttrace
GrpcClientInsecureConnection
GrpcServerInsecureConnection
HardcodedEqTrueOrFalse
HardcodedJwtKey
InsecureModuleUsed
PathTraversalInsideZipExtraction
PotentialDosViaDecompressionBomb
PprofDebugExposure
SslV3IsInsecure
TlsWithInsecureCipher
UseOfDes
UseOfRc4
UselessIfBody
WipXssUsingResponsewriterAndPrintf
```

#### Python 安全规则包

将 semgrep 工具下述规则，添加至 Python 安全规则包。

```python
AutoescapeDisabled
AvoidInsecureDeserialization
CommandInjectionOsSystem
DangerousTemplateString
DefaultMutableDict
DefaultMutableList
DictDelWhileIterate
EvalInjection
ExecInjection
GlobalsMisuseCodeExecution
HardcodedToken
InsecureCipherAlgorithmBlowfish
InsecureCipherAlgorithmDes
InsecureCipherAlgorithmIdea
InsecureCipherAlgorithmRc2
InsecureCipherAlgorithmRc4
InsecureCipherAlgorithmXor
InsecureCipherModeEcb
InsecureDeserialization
InsecureHashAlgorithmMd2
InsecureHashAlgorithmMd4
InsecureHashAlgorithmMd5
InsecureHashAlgorithmSha1
InsufficientEcKeySize
IsNotIsNot
ListModifyWhileIterate
ListenEval
MassAssignment
NoAuthOverHttp
NoStringsAsBooleans
OsSystemInjection
PathTraversalFileName
PathTraversalOpen
PythonLoggerCredentialDisclosure
ReturnInInit
SqlalchemySqlInjection
SsrfRequests
StringIsComparison
TempfileWithoutFlush
UnquotedCsvWriter
UnverifiedSslContext
UseDefusedXmlrpc
UseNoneForPasswordDefault
UselessEqeq
UselessIfConditional
UselessLiteralDict
UserEval
UserExec
WeakSslVersion
XssHtmlEmailBody
XssSendMailHtmlMessage
YieldInInit
```

#### Ruby 基础规则包

将 semgrep 工具下述规则，添加至 Ruby 基础规则包：

```ruby
BadDeserialization
DivideByZero
FileDisclosure
FilterSkipping
ForceSslFalse
HardcodedHttpAuthInController
JrubyXml
JsonEntityEscape
MassAssignmentProtectionDisabled
MissingCsrfProtection
RubyJwtExposedCredentials
RubyJwtHardcodedSecret
RubyJwtNoneAlg
SslModeNoVerify
YamlParsing
```

#### PHP 基础规则包

将 semgrep 工具下述规则，添加至 Php 基础规则包：

```php
AssertUse
BackticksUse
EvalUse
ExecUse
FileInclusion
FtpUse
McryptUse
PhpinfoUse
PregReplaceEval
WeakCrypto
```

将 CODEDOG 安全漏洞检查工具下述规则，添加至 PHP 基础规则包：

```php
cURL SSRF
file_get_contents SSRF
get_headers SSRF
Information Disclosure
LDAP injection
Reflected XSS
Reflected XSS for echo
Remote code execute
remote file include
SQL injection
unserialize vulerablity
URL Redirector Abuse
variable shadowing
Xml injection
```



==== 2020/11/18 ====
