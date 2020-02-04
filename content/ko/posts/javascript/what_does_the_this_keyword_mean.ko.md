---
title: "자바스크립트 this에 대한 이해"
date: 2019-12-26T10:12:01+09:00
description: this키워드의 범위, 주의할 점
tags:
- javascript
series:
-
categories:
- 란?
image: images/feature2/hand-cursor.png
---

## 전역 범위

this는 아무런 코드블럭도 없을 때는, window객체를 가리킨다.

```javascript
console.log(this); // Window {}
```

따라서 다음은 모두 같은 값을 출력한다.

```javascript
this.a = 1;
console.log(this.a); // 1
console.log(window.a); // 1
console.log(a); // 1
```

## 함수 범위

다음과 같이 함수 안에 this를 사용했을 땐, window 객체를 가리킨다.

```javascript
function myFunc() {
  console.log(this); // Window {}
}
myFunc(); 
```

반면, 다음의 this 키워드는 myFunc 함수가 정의된 obj를 가리킨다.

```javascript
var obj = {
  myFunc: function() {
    console.log(this); // Object {}
  }
};
obj.myFunc(); 
```

주의할 점은, 다음과 같이 함수를 호출할 때는, window 객체를 가리킨다.

```javascript
var obj = {
  myFunc: function() {
    console.log(this); // Window {} ⚠️위의 Object {}와 다른 결과.
  }
};

var func = obj.myFunc; // 객체의 함수를 새로운 변수에 할당했다.
func(); 
```

위와같이 this 키워드는 같은 함수여도 this가 사용되는 *문맥*에 따라 값이 달라질 수 있는 것이다.

## 함수 안의 함수

다음과 같이 함수안의 함수에 this키워드를 쓰면, window 객체를 가리킨다.

```javascript
var obj = {
  myFunc: function() {
    console.log(this); // Object {}

    function otherFunc() {
      this.foo = 1;
      console.log(this); // Window {}
    }

    otherFunc(); 

    console.log(this.foo); // undefined
    console.log(window.foo); // 1
  }
}
obj.myFunc();
```

strict 모드일 때, 함수안의 함수에서 this는 정의되어 있지 않다(undefined).

```javascript
var obj = {
  myFunc: function() {
    "use strict";
    console.log(this); // Object {}

    function otherFunc() {
      this.foo = 1; // TypeError: 'foo' of undefined
      console.log(this); 
    }

    otherFunc();
  }
}
obj.myFunc();
```

따라서 함수 안의 함수에서, this 키워드를 사용하여 루트 오브젝트를 참조하고 싶다면, this 키워드가 존재하는 함수 블럭 안에서 that이나 self로 변수를 만들어 this값을 할당하는 방식을 많이 쓴다.

```javascript
var obj = {
  myFunc: function() {
    "use strict";
    console.log(this); // Object {}

    var that = this;
    function otherFunc() {
      console.log(that); // Object {}
    }

    otherFunc();
  }
}
obj.myFunc();
```

## 정리

- this가 전역 문맥에서 사용되었다면, Window객체를 가리킨다.
- this가 함수 안에서는 Window 객체를 가리킨다.
- this가 객체 안의 함수에서는 해당 객체를 가리킨다.
- this가 함수 안의 함수에서는 Window객체를 가리킨다.
- this가 strict 모드 일 때, 함수 안의 함수에서는 undefined다.
- this가 사용되는 문맥에 따라 결과값이 달라질 수 있기 때문에, 이를 안전하게 사용하기 위한 기법이 존재한다.

this를 안전하게 사용하는 방법은 함수를 정의하고 호출할 때, call, apply, bind 등의 메서드를 사용하는 것인데 이에 대해서는 다음 포스트에 적겠다.