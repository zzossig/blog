---
title: "자바스크립트 클로저(closures)"
date: 2019-12-26T01:04:50+09:00
description: 클로저, 유효범위 체인, 변수 범위
tags:
- javascript
series:
-
categories:
- 란?
image: images/feature2/hunt.png
---

## 자바스크립트의 변수 범위

자바스크립트에서 변수의 범위는 보통 함수 선언 밖에 선언된 변수를 전역 변수로, 함수 안에 선언된 변수를 지역 변수로 생각하면 된다.

```javascript
var a = 1; // 전역 변수
function myFunc() {
  var b =2; // 지역 변수
}
```

그런데 사실, 자바스크립트에서 함수를 선언하게 되면, 자바스크립트만의 변수 범위를 설정하게 되는 특성이 있고, 이런 변수 범위를 가르켜 클로저(closure)라 한다.

```javascript
var a = 1; // 전역 변수
function myFunc(c) { // 변수 c도 myFunc 함수의 클로저 범위에 있음.
  var b =2; // 클로저 <- 개념, 추상적, 범위
}
```

따라서 함수가 선언된 곳에서 사용하는 변수들은 사실 지역 변수라는 이름보다 클로저라는 이름으로 생각하면 될 것 같다. 자바스크립트가 가지는 독특한 변수 범위 때문에, 클로저라는 이름이 생겨난 것이라 생각한다.

## 클로저 특성

### 특성1

저수준 언어인 C나 C++을 사용했던 사람이라면, 아마 자바스크립트의 변수 범위가 당연하게 느껴지지 않을 것이다. 다음 코드를 한번 보자.

```javascript
function myFunc() {
  var a = 1;
  function test() {
    console.log(a); // 1
  }
  test();
}
myFunc();
```

myFunc 함수 안에 test 함수를 정의했다. test함수 안에 a라는 변수를 정의하지 않았는데도, a라는 변수를 사용할 수 있게 된다. 이것은 자바스크립트가 test함수를 만들 때, closure라는 변수 범위를 생성하면서 test함수의 가장 가까운 쪽에 바인딩 되어있는 변수(그리고 전달인자)를 사용범위에 넣어주기 때문이다. 따라서 위의 코드는 에러를 발생시키지 않는, 자바스크립트에서 지극히 정상적인 코드다. var를 let이나 const로 바꿔도 결과는 `1`로 같다.

### 특성 2

자바스크립트의 클로저 개념을 다루면서 가장 헛갈리는 예제는 바로 다음일 것이다.

```javascript
var arr = [];
for (var i = 0; i < 10; i++) {
  arr[i] = function() {
    return i;
  };
}
console.log(i); // 10
console.log(arr[0]()); // 10
console.log(arr[1]()); // 10
console.log(arr[2]()); // 10
```

일반적으로, 세번의 콘솔 로그가 각각 0, 1, 2가 찍힐 것이라 예상할 것이다. 그러나 결과가 모두 10이다. 왜그럴까?

답은 뻔하다. 자바스크립트 언어 설계자가 함수의 변수 범위를 설정하고 사용할 때, 저런식으로 행동하도록 설계했기 때문이다. 
 
위의 예제에서 3번째 줄인 `arr[i] = function() {` 부분에서 함수를 선언할 때, 클로저 범위가 생성될 것이다. 10개의 arr[0~9]이름의 함수가 생성될 것이고, 이 각각의 함수가 사용할 수 있는 변수의 범위를 자바스크립트에서 만들 때 i라는 변수를 사용할 수 있게 할 것이다(특성1에서 말한대로.). 그리고 이 함수를 실행하는 부분(콘솔 로그찍는 3줄)에서 i의 값을 평가해야 하는데, 자바스크립트는 i가 for문을 다 돌고 난 후의 값인 10을 i의 값으로 가지고 있게 된다.

그러니까, 콘솔 로그를 찍을 때, 다음과 같이 생각하면 될 것 같다.

```javascript
var arr = [];
var i = 10;
arr[0] = function() {
  return i;
}
console.log(arr[0]()); // 10
```

그럼 위의 예제에서 콘솔 로그가 0, 1, 2를 찍게 하려면 어떻게 해야할까?

### 해결책

자바스크립트에서는 함수를 선언하자마자 바로 실행하게 하는 문법이 존재한다. 이를 IIFE(Immediately Invoked Function Expression)라고 줄여 부르기도 한다. 문법은 다음과 같다

```javascript
(function() {
  console.log('Hello world!');
})();
```

이 IIFE는 클로저에서 유용하게 사용할 수 있다. 특성2에서는 보았던 문제를 해결해보자.

```javascript
var arr = [];
for (var i = 0; i < 10; i++) {
  (function() {
    var j = i;
    arr[j] = function() {
    return j;
  };
  })();
}

console.log(arr[0]()); // 0
console.log(arr[1]()); // 1
console.log(arr[2]()); // 2
```

4번째 줄에서 var j로 변수를 새로 만드는게 싫으면, 함수의 인자로 i값을 넘겨도 된다.

```javascript
var arr = [];
for (var i = 0; i < 10; i++) {
  (function(j) {
    arr[j] = function() {
    return j;
  };
  })(i);
}

console.log(arr[0]()); // 0
console.log(arr[1]()); // 1
console.log(arr[2]()); // 2
```

## 정리

- 클로저는 자바스크립트에서 함수의 변수 범위를 나타내는 단어다.
- 자바스크립트에서 함수의 변수 범위가 다른 언어와 구별되는 차이점이 있어, 클로저라는 이름이 생겨났다.
- 클로저와 IIFE(즉시 실행 함수)를 결합한 패턴이 많이 쓰인다고 한다.