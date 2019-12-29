---
title: "자바스크립트 프로토타입(prototype) 패턴"
date: 2019-12-29T13:21:09+09:00
description: 자바스크립트에서 객체를 생성하는 native한 방법
tags:
- javascript
series:
-
categories:
-
featured_image: feature3/prototype.png
---

## 프로토타입 패턴?

### 생성자(constructor) 패턴

이전에 생성자 패턴으로 객체를 생성하는 방법을 살펴봤다. 생성자 패턴은 객체지향 패러다임에서 쓰이는 `new`키워드를 사용하여 객체를 생성하는 방법이다. 참고: [자바스크립트 생성자(constructor) 패턴](/posts/javascript/what_is_the_constructor_oo_pattern/)

### 프로토타입(prototype) 패턴

반면, 프로토타입 패턴으로 객체를 생성하는 방법은, 자바스크립트의 가장 자연스러운 객체 생성 패턴이다. `new`를 사용하여 객체지향 패턴을 흉내낼 수는 있지만, 실제로 자바스크립트의 상속이나 오브젝트간의 연결은 프로토타입으로 구현된다. 자바스크립트 고유의 native한 방법으로 객체를 생성할 수 있다는 점과 이 패턴을 사용한 코드가 많이 있기 때문에 꼭 알고 있어야 한다.

## 프로토타입 패턴으로 객체 생성하기

### init 이용하기

init메서드는 객체의 `__proto__`속성에 있는 속성의 하나이다. 물론 예약어이고, 이름에서 명시하듯 객체를 초기화(initialization)하는 용도로 쓰면 된다.

```javascript
var Person = {
  init: function(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  },
  fullname: function() {
    return this.firstname + ' ' + this.lastname;
  }
}

var choi = Object.create(Person); // new를 쓰지 않은, native한 방식
choi.init('choi', 'zzossig'); // 따로 초기화를 해준다
console.log(choi.fullname());
```

위의 예제는 객체를 생성하고 초기화 하기 위해 두번의 단계를 거친다. 이를 한단계로 줄이고 싶으면 다음과 같이 객체의 생성과 동시에 초기화 해주어야 한다.

```javascript
var Person = {
  init: function(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  },
  fullname: function() {
    return this.firstname + ' ' + this.lastname;
  }
}

var choi = Object.create(Person, { // 객체 생성과 동시에 초기화
  firstname: {
    value: 'choi'
  },
  lastname: {
    value: 'zzossig'
  }
});
console.log(choi.fullname());
```

### 팩토리 패턴 이용

다음 예제와 같이 특정 객체를 생산하기 위한 팩토리함수를 정의해서 객체를 찍어내는 방법도 있다.

```javascript
var Person = {
  fullname: function() {
    return this.firstname + ' ' + this.lastname;
  }
}

function PersonFactory(firstname, lastname) {
  var person = Object.create(Person);
  person.firstname = firstname;
  person.lastname = lastname;
  return person;
}

var choi = PersonFactory('choi', 'zzossig');
console.log(choi.fullname());
```

## 상속

프로토타입 패턴에서 객체의 상속은, 객체를 생성할 때, 프로토타입을 지정할 수 있다.

```javascript
var Person = {
  fullname: function() {
    return this.firstname + ' ' + this.lastname;
  }
}
var Student = Object.create(Person, {  // Person프로토타입 상속
  init: {
    value: function(honor, firstname, lastname) {
      this.honor = honor;
      this.firstname = firstname;
      this.lastname = lastname;
    }
  },
  studentname: {
    value: function() {
      return this.honor + ' ' + this.firstname + ' ' + this.lastname;
    }
  }
});
var choi = Object.create(Student); // Student프로토타입 상속
choi.init("Mr.", "choi", "zzossig"); // 객체 초기화
console.log(choi.fullname()); // choi zzossig
console.log(choi.studentname()); // Mr. choi zzossig
```

위의 예제에서 프로토타입 체인에 따라, 체인의 최하단인 choi가 체인의 최상단인 Person의 프로토타입을 상속하게된다.