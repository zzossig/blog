---
title: "자바스크립트 프로토타입"
date: 2019-12-29T02:38:09+09:00
description: 프로토타입에 대해 알아보기
tags:
- javascript
series:
-
categories:
-
image: images/feature3/link.png
---

### 프로토타입 체인

자바스크립트에서는 다른 언어에서 상속이라 부르는 특성을 프로토타입을 이용해 유사하게 구현하고 있다. 프로토타입은 Object와 Object를 연결해 주는 역할을 하고 따라서 프로토타입 체인이라 이름이 붙었다. 객체의 프로토타입 속성은 다음과 같이 설정할 수 있다.

```javascript
var animal = {
  kind: 'hello'
}
var choi = {}

choi.__proto__ = animal;

console.log(animal.kind); // hello
console.log(choi.kind); // hello
```

위의 코드를 실행하면 두 경우 모두 `hello`가 콘솔에 찍히게 된다. choi객체의 경우, 빈 객체로 생성되었지만 choi객체의 프로토타입이 animal이고, animal이 kind 속성을 가지고 있으므로 콘솔에 이 값이 찍히게 된다.

이처럼 객체의 속성을 참조할 때, 해당 객체에 해당 속성이 없으면, 프로토타입 체인을 타고 내려가면서 해당 속성을 찾게 된다. 이것이 프로토타입 체인이다.

### 프로토타입 설정하기

사실 위에서 썻던 __proto__속성은 지원되지 않는 브라우저가 꽤 있는 듯 하다. 그래서 이식성을 고려하여 Object의 create메서드를 쓰는게 더 좋은 방법이다.

```javascript
var animal = {
  kind: 'hello'
}
var choi = Object.create(animal);

console.log(animal.kind); // hello
console.log(choi.kind); // hello
console.log(choi); // {}
```

Object의 create메서드의 기본 컨셉은 파라미터로 받은 객체의 프로토타입을 새로 생성할 객체의 프로토타입으로 설정해주는 것이다.

객체를 create로 생성하면서 속성을 만들고 싶으면 다음과 같이 하면 된다.

```javascript
var animal = {
  kind: 'hello'
}
var choi = Object.create(animal, { how: { value: 'are you' }});

console.log(choi); // {how: "are you"}
console.log(choi.kind); // hello
```

약간 특이한 점은, 속성값을 지정할 때, `{how: { value: 'some value' }}`와 같이 객체를 넘겨야 한다는 점이다. 일반적인 생각으로는 `{how: 'are you'}`가 되여야 할 것 같지만 이는 올바른 문법이 아니고 에러를 발생시킨다.

### 자바스크립트의 상속

자바스크립트에서도 `class`키워드를 지원하고, 이를 통해 객체를 생성할 수 있다. 헛갈리지 말아야 할 점은, 이렇게 객체를 생성했다고 해서, Java나 C++의 언어와 같은 의미의 클래스 상속이 이루어 지는 것은 아니다.

자바스크립트의 모든 상속은 프로토타입을 통해 이루어진다. 자바스크립트의 class는 전통적인 프로그래밍 언어사용자의 편의성을 위해 유사하게 사용할 수 있는 syntax sugar를 제공할 뿐이다.

### 그래서 프로토타입이란?

모든 언어가 그렇듯이, 자바스크립트도 브라우저가 해석하는대로 결과를 화면에 내놓는다. 자바스크립트에서 어떤 특성을 가진 객체(`__proto__`)를 만들었고, 이 객체의 특성은 위에서 살펴본 대로다. 물론 프로토타입의 특성을 전부 살피려면 한나절이나 걸리겠지만... 내가 말하고 싶은 요지는 이거다.

<U>프로토타입은 자바스크립트에서 Object가 가지는 한 속성이다.</U> 이 프로토타입 객체를 브라우저가 해석할 때, 프로토타입 체인 특성을 구현하도록(해석하도록) 만들어졌다.