---
title: Bake (Manifest) 阶段 - CODING 帮助中心
pageTitle: Bake (Manifest) 阶段
pagePrevTitle: Run Job (Manifest) 阶段
pagePrev: cd/pipe/stages/runjob.html
pageNextTitle: Deploy (Manifest) 阶段
pageNext: cd/pipe/stages/deploy.html
---

在 `Bake(Manifest)` 阶段，可以使用 Helm 将模板渲染为 manifest。相关的 Helm 命令是 `helm template`，如果您在本地安装了 Helm，运行 `helm template --help` 可了解更多细节。

Bake(Manifest) 可以帮助您打包和部署应用，一般用于开发和部署频率高的应用。**如果只是一次性安装第三方包，不推荐使用 Bake(Manifest)。**

### Bake（Manifest）阶段配置

Bake（Manifest）相关配置项有：

-   发布名称（必填）
  
  Helm chart 的发布名称

> 这里配置的名称将会覆盖 Produces Artifacts 处配置的名称。

-   模板制品（必填）
 
  Helm chart 以 `.tat.gz` 格式保存，您可以使用 `helm package /path/to/chart` 生成 Helm chart。运行命令 `helm package --help` 可以了解更多细节。

-   发布的命名空间（可选）

  Kunernetes 安装发布包的命名空间。如果不指定参数，将使用 `default` 命名空间。需要注意的是并非所有的 Helm charts 都会在 manifest 文件有 namespace 定义，请确保 manifests 文件中含有如下内容：

```groovy
metadata:
  namespace: {{ .Release.Namespace }}
```

<!- Zero or more override artifacts (optional)

<!The files passed to --values parameter in the helm template command. Each is a remotely stored artifact representing a Helm Value File.>

<!- Statically specified overrides

<!The set of static of key/value pairs that are passed as --set parameters to the helm template command.>

如下提供一个完整的 Bake(Manifest) 阶段配置示例：

![](https://help-assets.codehub.cn/enterprise/20200521143243.png)

在【Produces Arrifacts】配置栏指定在阶段执行完成后将自动创建一个 `embedded/base64` 格式的制品，即 bake 成功后可供下游阶段引用的资源清单（manifest）集。

![](https://help-assets.codehub.cn/enterprise/20200521143633.png)

如下为对应的 JSON 配置。

```json
{
  "type": "bakeManifest",
  "templateRenderer": "HELM2",
  "name": "Bake nginx helm template",
  "outputName": "nginx",
  "inputArtifacts": [
    {
      "account": "gcs",
      "id": "template-id"
    },
    {
      "account": "gcs",
      "id": "value-id"
    }
  ],
  "overrides": {
    "replicas": "3"
  },
  "expectedArtifacts": [
    {
      "defaultArtifact": {},
      "id": "baked-template",
      "matchArtifact": {
        "kind": "base64",
        "name": "nginx",
        "type": "embedded/base64"
      },
      "useDefaultArtifact": false
    }
  ]
}
```

### 配置下游的部署阶段

当资源清单（manifest）集被 Helm bake 成功后，便可以继续配置下游的阶段（可以是同一个部署流程的阶段也可以是被当前部署流程所触发的新阶段）。配置如下：

![](https://help-assets.codehub.cn/enterprise/20200521143854.png)

当阶段执行时，可以看到 Helm chart 中被部署的所有资源。

![](https://help-assets.codehub.cn/enterprise/20200521143936.png)

### 其他的模板引擎

除了 Helm，CODING CD 还支持 [Kustomize 模板引擎](https://www.spinnaker.io/guides/user/kubernetes-v2/kustomize-manifests/)。


==== 2020/08/13 ====
