---
title: "자바스크립트 IIFE란?"
date: 2019-12-26T02:44:07+09:00
description: 자바스크립트 즉시 실행 함수
tags:
- javascript
series:
-
categories:
- 란?
featured_image: feature2/minimum-value.png
---

{{< boxmd >}}
참고: [Do ES6 Modules make the case of IIFEs obsolete?](https://hashnode.com/post/do-es6-modules-make-the-case-of-iifes-obsolete-civ96wet80scqgc538un20es0)
{{< /boxmd >}}

## IIFE란?

Immediately Invoked Function Expression의 약자로 즉시 실행 함수를 뜻한다. 즉시 실행 함수의 사용 이유는 다음과 같이 생각해 볼 수 있겠다.

- 함수를 즉시 실행시켜야 할 때
- 함수를 딱 한번만 실행시켜야 할 때
- 예전에는 변수 선언 종류가 var 밖에 없었을 때, 변수의 사용 범위를 제한하기 위해.
- 모듈화

즉시 실행 함수 문법은 다음과 같다.

```javascript
(function() {
  console.log('Hello world!');
})();
```

## IIFE로 변수의 범위 제한

var의 변수는 블럭 범위를 가지지 않고, 함수 블럭 범위를 가진다. 따라서 예전의 es5의 자바스크립트에서 변수의 범위를 제한하려고 할 때, 함수를 사용해서 제한해야 했고 IIFE의 패턴을 사용하는게 한가지 방법이었다.

```javascript
(function() {
    var scoped = 42;
}());

console.log(scoped); // ReferenceError
```

```javascript
{
    let scoped = 42;
}

console.log(scoped); // ReferenceError
```

var의 경우, scoped 변수의 범위를 제한하기 위해 함수를 사용해야 했지만, let의 문법이 생기고 나서는 굳이 함수를 사용할 필요가 없어졌다.

## 모듈화

es5문법에서 모듈을 다음과 같은 패턴으로 만들곤 했다.

```javascript
var myModule = (function() {
  // counter 변수는 즉시실행 함수 클로저 범위 내에서 증가한다.
  var counter = 0;

  function increment() {
    counter++;
  }

  function print() {
    console.log(counter);
  }

  // 외부로 공개할 함수 리턴.
  return {
    increment: increment,
    print: print
  };
})();

myModule.increment();
myModule.print(); // 1
```

es6에서는 다음과 같이 모듈을 만든다. 물론 이 파일들을 합치려면 웹팩(webpack)을 써야한다.

```javascript
// myModule.js

let counter = 0;

export function increment() {
    counter++;
}

// logic.js

import {increment} from 'myModule.js';

increment();
```

myModule.js 파일에서 counter는 해당 파일의 지역변수가 된다.

## 결론

es6에서는 자바스크립트의 문법이 많이 개선되고 추가되고 바뀌었기 때문에 즉시 실행 함수의 입지가 매우 좁아졌다. 다만 많은 레거시 코드가 즉시 실행함수를 쓰고 있기 때문에, 이 문법을 알고는 있어야 한다.