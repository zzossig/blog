---
title: "자바스크립트 호이스팅(hoisting)"
date: 2019-12-25T22:09:34+09:00
description: 자바스크립트 변수의 범위 특성, 끌어 올림이란?
tags:
- javascript
series:
- 
categories:
- 란?
featured_image: feature2/crane.png
---

## 변수 호이스팅

호이스팅(hoisting)이란 말은, 변수가 선언되기 이전에 변수를 사용하면, 변수가 사용된 블럭 범위의 맨 위로 변수를 끌어올려서 undefined를 할당한다는 말이다.

- 다음 코드는 a라는 변수를 선언하지 않았으므로, Reference Error가 발생한다.

    ```javascript
    console.log(a);
    ```

- 다음 코드는 변수를 선언하기 전에 변수를 사용했지만, 에러가 발생하지 않는다.

    ```javascript
    console.log(a); // undefined
    var a = 1;
    ```

- 다음 코드는 위의 코드와 동치이다. a변수가 블럭 최상단으로 끌어올려졌는데, 이게 바로 호이스팅(hoisting) 이다.

    ```javascript
    var a;
    console.log(a); // undefined
    a = 1;
    ```

## 함수 호이스팅

함수 호이스팅은, 함수를 선언하기 전에 함수를 사용할 수 있게, 함수선언이 코드블럭 최상단으로 끌어올려진다는 말이다.

- 함수 선언 전에 함수를 사용할 수 있다.

    ```javascript
    myFunc(); // This is text
    function myFunc() {
      console.log('This is text');
    }
    ```

- 다음 코드는 위의 코드와 동치이다. 함수가 코드 최상단으로 끌어올려졌다.

    ```javascript
    function myFunc() {
      console.log('This is text');
    }
    myFunc();
    ```

- 함수를 var에 선언할 때는 변수 호이스팅쪽 행동을 따른다. 따라서 다음 코드는 에러를 발생시킨다.

    ```javascript
    myFunc(); // TypeError: myFunc is not a function
    var myFunc = function() {
      console.log('This is text');
    }
    ```

- 다음 코드는 위의 코드와 동치이다.

    ```javascript
    var myFunc;
    myFunc(); // TypeError: myFunc is not a function
    myFunc = function() {
      console.log('This is text');
    }
    ```

- 호이스팅 예제

    ```javascript
    var a = 1;
    function myFunc() {
      console.log(a);
      var a = 2;
      console.log(a);
    }
    ```

    위의 예제에서 각각의 `console.log(a)`가 출력하는 값이 어떻게 될까? 위의 코드는 다음과 동치이다.

    ```javascript
    var a = 1;
    function myFunc() {
      var a;
      console.log(a);
      a = 2;
      console.log(a);
    }
    ```

    따라서 첫번째 console.log에는 `undefined`가, 두번째 console.log에는 `2`가 출력된다.

## 호이스팅 범위

### 변수를 선언하는 3가지 방법

예전 자바스크립트에서는 변수를 var로만 선언할 수 있었는데, es6문법에서 let과 const가 추가됐다.

```javascript
var a = 1;
let b = 2;
const c = 3;
```

### 선언된 변수의 특성

var의 경우 블럭 유효범위(block scope)가 없지만, 함수 유효범위는 있다. let의 경우, 블럭 유효범위를 가지고, const의 경우 블럭 유효범위를 가짐과 동시에 변수가 선언된 이후에 해당 변수의 값을 변경할 수 없게 된다.

예를들어 블럭 유효범위는 다음과 같이 {}로 감싸여져 있는 부분을 말한다. 블럭 유효범위는 함수 유효범위를 포괄한다.

```javascript
if (a === 1) {
  console.log(a);
}
```

함수 유효범위는 함수가 선언된 곳의 {}로 감싸여져 있는 부분을 말한다.

```javascript
function myFunc() {
  console.log(a);
}
```

### var의 호이스팅 범위

var의 경우, 블럭 유효범위가 없다고 말했다. 따라서 호이스팅 되는 범위가 가장 넓다.

- 다음 코드는 함수 블럭이 var의 최상단 블럭이 되고, if 블럭과 그 안의 for 블럭이 존재한다.

    ```javascript
    function myFunc() {
      var a = 1;
      if (true) {
        var b = 2;
        for (var i = 0; i < 10; i ++) {
          console.log(i);
        }
      }
    }
    ```

- 다음 코드는 위의 코드와 동치이다. 블럭이 중첩되어 있어도(if안의 for문), 최상단 블럭으로 변수가 끌어올려진다.

    ```javascript
    function myFunc() {
      var a;
      var b;
      var i;

      a = 1;
      if (true) {
        b = 2;
        for (i = 0; i < 10; i ++) {
          console.log(i);
        }
      }
    }
    ```

### const와 let의 호이스팅 범위

const와 let은 블럭 범위를 가지고, 변수가 사용되는 범위를 최소화 한다.

- 다음의 두 코드는 동치이다.

    ```javascript
    function myFunc() {
      let a = 1;
      if (true) {
        let b = 2;
      }
    }
    ```

    ```javascript
    function myFunc() {
      let a;
      a  = 1;
      if (true) {
        let b;
        b = 2;
      }
    }
    ```

- 다음은 에러를 발생시킨다

    ```javascript
    function myFunc() {
      let a;
      a  = 1;
      if (true) {
        let b;
        b = 2;
      }
      console.log(b); // ReferenceError
    }
    ```

- 결론은 let과 const는 블럭 유효범위의 최상단으로 끌어올려 진다.