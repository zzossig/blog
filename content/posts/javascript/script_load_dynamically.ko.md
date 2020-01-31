---
title: "자바스크립트 script 동적으로 로드하기"
date: 2020-01-29T10:13:19+09:00
description: utterances의 다이나믹한 테마 적용을 위해 script를 programmtically 로드해 보자.
draft: false
hideToc: false
enableToc: true
enableTocContent: false
tocPosition: outer
tags:
- javascript
series:
-
categories:
-
image: images/feature5/load.png
---

## 기존 script 로드방식의 문제점

자바스크립트를 로드하는 기본적인 방법은 다음과 같다.

```javascript
<script src="script.js">
```

이 방식은 문제가 있는데, 스크립트가 로드되고 실행되는 동안 브라우저가 DOM을 그리지 못하게 블럭하기 때문에, 스크립트가 0.5초 정도의 비중을 차지해도 사용자는 화면을 보지못해 답답함을 느낄 수 있다.

## async와 defer의 등장

기존 스크립트 로드방식의 문제점을 해결하기 위해 async와 defer 키워드가 등장했다. 다음과 같이 쓸 수 있다.

```javascript
<script async src="script.js">
<script defer src="script.js">
```

async와 defer는 둘 다 브라우저가 DOM을 먼저 그리게 하여 사용자가 답답함을 느끼지 않게끔 하기 위해 등장했다. 이 둘의 차이점을 알기 위해서는 브라우저가 자바스크립트를 해석하는 방식을 간단하게 알 필요가 있다.

### 브라우저가 자바스크립트를 해석하는 방식

자바스크립트는 변수와 함수 등으로 이루어진 코드일 것이다. 브라우저는 이 코드를 다운로드 받는 국면(phase)과 실행하는 국면(phase)으로 나눈다.

예를들어 다음과 같은 함수가 있다고 할 때, 스크립트 전체를 다운로드(fetch) 하는게 다운로드 국면, `myFunc()`로 함수를 호출하는걸 실행 국면으로 볼 수 있다.

```javascript
var myFunc = function() {
  console.log('good');
}
myFunc();
```

## 스크립트 로드 방식별 비교

- 기존의 스크립트 로드 방식에서는 브라우저가 해당 스크립트를 만나면 스크립트를 다운받고난 후 실행까지 해버린다. 이 동안에 브라우저는 DOM을 그리지 않는다.
- async 스크립트 로드 방식에서는 브라우저가 해당 스크립트를 만나면 DOM을 그림과 동시에 스크립트를 다운받는다. 스크립트를 다운받고 난 후 바로 스크립트를 실행하는데, 실행 국면에서는 DOM을 그리지 않는다.
- defer 스크립트 로드 방식에서는 브라우저가 해당 스크립트를 만나면 DOM을 그림과 동시에 스크립트를 다운받는다. 이 때, 스크립트를 전부 다운로드 받더라도 스크립트를 바로 실행하지 않고 DOM이 전부 그려질 때 까지 기다렸다가 스크립트가 실행된다.

따라서 가장 사용자 친화적인 스크립트 로드방식은 `defer`고 그다음이 `async`다.

## 자바스크립트로 스크립트 로드하기

스크립트를 로드할 때, 좀 더 동적으로 스크립트를 로드할 수 있다. 물론 기본적인 흐름은 위에서 언급한 것과 같지만, 그 흐름 내에서 좀 더 정교하게 스크립트를 로드할 필요가 있을 때 쓸 수 있는 방법이다. 방식은 다음과 같다.

```javascript
var myScript = document.createElement('script');
myScript.setAttribute('src', 'script.js');
myScript.setAttribute('crossorigin', 'anonymous');
myScript.setAttribute('async', '');

myScript.onload = function() {
}

document.getElementById('root').appendChild(myScript);
```

위의 코드는 script 태그를 만든 후, 그 태그에 `src`, `crossorigin`, `async` 속성을 부여하고 root element에 해당 스크립트를 붙여넣는 코드다.

나의 경우 블로그를 만들 때, `utterances` 댓글을 블로그에 적용하면서 테마를 동적으로 로드해야 했는데, 이 방식으로 문제를 해결했다.
