---
title: "Java FCM Admin SDK 오류 정리"
date: "2024-12-19"
---

# java.lang.NoClassDefFoundError: org/apache/hc/client5/http/config/ConnectionConfig

아래의 의존성을 추가해주었다.

```js
implementation("org.apache.httpcomponents.client5:httpclient5:5.3.1")
```

# java.lang.NoClassDefFoundError: org/apache/hc/core5/http2/impl/nio/ClientHttp1UpgradeHandler

아래의 의존성을 추가해주었다.

```java
implementation("org.apache.httpcomponents.core5:httpcore5-h2:5.3.1")
implementation("org.apache.httpcomponents.core5:httpcore5:5.3.1")
```
