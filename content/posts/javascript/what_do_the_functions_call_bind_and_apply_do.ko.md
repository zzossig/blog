---
title: "자바스크립트의 call, apply, bind 함수 호출"
date: 2019-12-26T12:00:24+09:00
description: call, apply, bind함수는 언제쓰고 왜쓰는지
tags:
- javascript
series:
-
categories:
-
featured_image: feature3/three-triangles.png
---

## 함수를 호출하는 4가지 방법

자바스크립트의 함수는 다음과 같이 4가지 방법으로 호출할 수 있다.

- 일반 함수 호출

    ```javascript
    myFunc();
    ```

- 메서드 함수 호출

    ```javascript
    obj.myFunc();
    ```

- 생성자로 함수 호출

    ```javascript
    new myFunc();
    ```

- call()과 apply() 메서드로 호출

    ```javascript
    myFunc.call();
    myFunc.apply();
    ```

### 생성자로 함수 호출

자바나 C++등의 언어를 배운 사람들은 클래스 안에서 this라는 키워드를 사용해보거나 본 적이 있을 것이다. 자바스크립트에서는 이 this라는 키워드를 함수 안에서 쓸 수 있다. 함수의 this 키워드는, 함수로 객체를 만들 때 해당 객체의 context로 사용된다.

```javascript
function myFunc() {
    this.myVar = 1;
}
var obj = new myFunc;
console.log(obj); // myFunc {myVar: 1}
```

함수를 통해 생성한 `obj`객체는 마치 다른 언어에서 class를 통해 객체를 초기화 한것과 유사하게 obj 객체를 생성해 낸다. 이 때 만들어진 객체는 함수 안의 this라는 키워드를 참조할 수 있게 된다.

```javascript
...
console.log(myFunc.name) // myFunc, 객체 생성자의 이름이 표시됨
console.log(obj.myVar) // 1, 함수 안의 this 키워드 참조
```

### call과 apply

call과 apply는 자바스크립트 함수가 항상 내장하고 있는 메서드다. 다음과 같이 쓸 수 있다.

```javascript
function myFunc() {}
myFunc();
myFunc.call();
myFunc.apply();
```

왜 자바스크립트에서는 `myFunc()`처럼 일반적인 방식 외에 함수를 호출하는 다른 방식을 만든걸까? 

이것은 함수의 this키워드가 문맥에 따라 다르게 해석될 수 있기 때문에(참고: [자바스크립트 this에 대한 이해](/posts/javascript/what_does_the_this_keyword_mean)), call이나 apply를 통해 함수를 호출하면 이 문맥을 정확하게 할 수 있기 때문이다.

다음 코드는 `strict`모드의 여부에 따라 this의 문맥이 달라지는 것을 보여준다.

```javascript
// 다음의 this는 window객체를 가리킨다.
function myFunc() {
    console.log(this);
}
myFunc();

// 다음의 this는 undefined다.
'use strict';
function myFunc() {
    console.log(this);
}
myFunc();
```

## call과 apply 사용해보기

### call(apply) 메서드에 문맥 명시하기

```javascript
var obj = {
    myFunc: function() {
        // 'use strict';
        function otherFunc() {
            console.log(this);
        }
        otherFunc.call();
        // otherFunc.call(this);
        // otherFunc.call(obj);
    }
}
```

- otherFunc.call()
    위 예제의 7번째 줄에서, call을 파라미터 없이 쓰게되면 콘솔 로그가 찍는 값은 window 객체가 된다. 만약, `use strict`의 주석을 해제하고 strict 모드를 적용하면, 콘솔 로그는 undefined를 찍을 것이다.

- otherFunc.call(this)
    8번째 줄의 `call(this)`를 사용하게 되면, otherFunc 함수 안의 this키워드는 obj객체를 가리키게 된다.

- otherFunc.call(obj)
    9번째 줄의 `call(obj)`를 사용하게 되면, otherFunc 함수 안의 this키워드는 마찬가지로 obj객체를 가리키게 된다.

이처럼, call을 통해 함수를 호출하게 되면, this가 어떤 문맥을 사용할지, 내가 컨트롤 할 수 있게 된다. <U>call(apply)의 첫번째 파라미터로 넘기는 값이 호출되는 함수의 this 문맥이 된다.</U>

### call vs apply

기본적으로 call과 apply 메서드 모두 this 문맥을 명시한다는 목적은 같으나, 메서드를 호출할 때, 파라미터를 하나씩 넘기냐, array로 넘기냐에 따른 차이점만 존재한다.

```javascript
function myFunc(a, b, c) {
    console.log(this); // Number {!}
    console.log(a); // 2
    console.log(b); // 3
    console.log(c); // 4
}
myFunc.call(1, 2, 3, 4);
```

```javascript
function myFunc(a, b, c) {
    console.log(this); // Number {1}
    console.log(a); // 2
    console.log(b); // 3
    console.log(c); // 4
}
myFunc.apply(1, [2, 3, 4]);
```

## 함수의 bind 메서드

함수에 따로 정의를 하지 않아도 call과 apply메서드를 사용할 수 있는 것 처럼, bind 메서드 또한 특정한 목적을 달성하기 위해 함수에 미리 내장되어 있는 메서드다.

bind의 주요 목적은 함수와 객체를 서로 묶는 것이다. 다음 예제를 보자.

```javascript
var myFunc = function() {
    console.log(this);
}.bind(1);
console.log(myFunc()); // Number {1}
```

```javascript
var myFunc = function() {
    console.log(this);
}.bind(this);
console.log(myFunc()); // Window {...}
```

위의 예제를 보면, bind 메서드 또한 this 문맥을 직접 정할 수 있게 해준다. call과 apply와의 차이점은, call과 apply메서드는 사용하면 함수를 <U>호출</U>하지만, bind는 <U>새로운 함수를 반환한다는 것이다.</U>