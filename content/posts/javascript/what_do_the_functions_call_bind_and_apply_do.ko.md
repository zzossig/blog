---
title: "자바스크립트 call, bind, apply 함수"
date: 2019-12-26T12:00:24+09:00
description: call, bind, apply함수는 언제쓰고 왜쓰는지
draft: true
tags:
- javascript
series:
-
categories:
-
featured_image: feature3/three-triangles.png
---

```javascript
function myFunc() {
  console.log(this);
}
myFunc();
```

```javascript
function myFunc() {
  console.log(this);
}
myFunc.call();
```