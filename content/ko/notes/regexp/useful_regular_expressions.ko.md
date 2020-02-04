---
title: "자바스크립트 유용한 정규식 모음"
date: 2020-01-08T18:22:00+09:00
description: 이메일, 날짜, 비밀번호... 등등의 Regular Expreessions
draft: false
enableTocContent: false
tags:
- regexp
series:
-
categories:
-
image: images/feature4/save-archive.png
---

## 이메일

```javascript
var email = 'zzossig@gmail.com';
var emailRegexp = /^[^\s@]+@[^\s@.]+\.[^\s@.]+$/;
```

## 비밀번호

```javascript
var checkPass = function (password) {
  var theLength = /^.{8,32}$/; // 길이는 8~32자 사이
  var upper = /[A-Z]/; // 대문자
  var lower = /[a-z]/; // 소문자
  var numbers = /[0-9]/; // 숫자
  var special = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/; // 특수문자

  if (theLength.test(password) &&
    upper.test(password) &&
    lower.test(password) &&
    numbers.test(password) &&
    special.test(password)
  ) {
    return true;
  } else {
    return false;
  }
}
```

## 날짜

```javascript
var date = '2020/01/01';
var dateRegexp = /^([0-9]{2})?[0-9]{2}/(1[0-2]|0?[1-9])/(3[01]|[12][0-9]|0?[1-9])$/;
```
