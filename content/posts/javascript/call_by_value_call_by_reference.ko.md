---
title: "Call by value 와 Call by reference"
date: 2019-12-23T12:13:42+09:00
description: 값에 의한 호출 vs 참조에 의한 호출
tags:
-
series:
-
categories:
-
libraries:
- mermaid
featured_image: feature2/phone.png
---

## 이야기는 메모리로부터...

다음과 같이 자바스크립트에서 변수를 생성하면, 이 변수는 컴퓨터의 어디에 저장될까요?

```javascript
var a = 1;
```

바로 메모리에 저장되겠죠. 메모리는 cpu가 연산을 처리하면서 데이터를 임시적으로 저장하는 공간입니다. 윈도우나 macOS도 부팅을 하고 나면, 메모리에서 해당 OS가 돌게되죠. 메모리는 임시 저장소 이지만, 하드디스크에 데이터를 읽는 것 보다 약 10~12배 정도 빠릅니다. 참고: [Numbers everyone should know](http://localhost:1313/ko/notes/numbers_everyone_should_know/)

## 변수의 두 종류

변수를 두가지 종류로 나누면 다음과 같이 나눌 수 있습니다

- 원시 타입(Primitive type)
- 참조 타입(Reference type)

원시 타입에는 `string`, `boolean`, `int`, `float` 등이 있겠죠. 참조 타입에는 `object`나 `array`가 있겠습니다.

### 원시 타입

사실 원시 타입으로 Object나 Array를 표현 할 수 있습니다. 언어를 만들 때, 그렇게 설계하면 되겠죠. 그런데 Javascript 언어 설계자는(그외 다른 언어도 마찬가지) 왜 object나 array를 참조 타입으로 만들었을까요?

아마, 메모리를 아끼려고 그랬을 거에요. 한번 생각해보세요. 원시 타입의 경우, 원시 타입으로 만들어진 변수를 사용할 때 마다, 그 변수의 복사본이 메모리 어딘가에 복사되겠죠.

```javascript
var a = 1;
function myFunc(a) {
  console.log(a);
}
myFunc(a);
```

위의 코드에서 `myFunc(a)`함수를 호출할 때, 전역 변수 a와, 함수 안의 변수 a는 메모리에 저장되어 있는 위치도 다르고, 코드 내에서도 서로 독립적인 값입니다.

### 참조 타입

Object나 Array의 경우, 그 안에 다양한 값들을 넣을 수 있죠. 그 값안에 또다른 Object나 Array를 넣는다면, 무한대로 중복해서 값을 넣을 수도 있겠죠.

```javascript
var obj = {
  a: {
    b: {
      ...
    }
  }
}
```

이 Object나 Array라는 녀석들은 덩치가 커질 가능성이 농후한데, 매번 Object나 Array를 메모리에 복사해서 사용하려면, 메모리가 감당이 안되겠죠? 따라서 참조 타입일 때, 필요한 경우 값을 메모리의 다른 주소에 복사하는 방법 대신, <U>그 메모리의 주소를 참조하여 값을 꺼내오는 방식으로 메모리 사용량을 줄일 수 있게 됩니다.</U>

### 간단한 예

**Call by value**

```javascript
var obj = {
  text: "this is text"
}
function myFunc(obj) {
  obj = {
    text: "another text"
  }
}
myFunc(obj);
console.log(obj); // this is text
```

**Call by reference**

```javascript
var obj = {
  text: "this is text"
}
function myFunc(obj) {
  obj.text: "another text";
}
myFunc(obj);
console.log(obj); // another text
```
