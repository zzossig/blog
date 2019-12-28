---
title: "자바스크립트 생성자(constructor) 패턴"
date: 2019-12-29T03:54:31+09:00
description: 자바스크립트 객체를 만드는 방법 - 생성자
tags:
- javascript
series:
-
categories:
-
featured_image: feature3/construction.png
---

## 자바스크립트에서 생성자(constructor)의 의미

자바스크립트에서의 생성자는 <U>다른 객체지향 언어의 문법을 흉내</U>낼 뿐이다. 자바스크립트에서 상속은 프로토타입을 통해서만 이루어진다.

## 자바스크립트 new 키워드

### 예제 1

```javascript
'use strict';

function Person(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
}
var dude = Person('choi', 'zzossig');
```

위 코드는 에러를 발생시킨다. Person 함수의 this는 strict모드에서 undefined가 되기 때문이다.

### 예제 2

```javascript
'use strict';

function Person(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
}
var dude = new Person('choi', 'zzossig');
console.log(dude); // Person {firstname: "choi", lastname: "zzossig"}
```

Person함수를 호출할 때, 앞에 new 키워드만 갖다 붙였다. 이렇게 하면 Person함수의 this키워드의 문맥은 undefined나 Window가 아닌 Person함수 자신이 된다. 만약 객체지향 문법을 흉내낸 new키워드가 없었다면 다음과 같은 코드를 작성할 수 있다.

```javascript
'use strict';

function Person(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
}
var dude = {};
Person.call(dude, "choi", "zzossig");
console.log(dude); // Person {firstname: "choi", lastname: "zzossig"}
```

## 함수 프로토타입

new로 생성하는 객체에 메서드를 다음과 같이 추가할 수 있다.

```javascript
'use strict';

function Person(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.fullname = function() {
    return this.firstname + ' ' + this.lastname;
  }
}
var dude = new Person('choi', 'zzossig');
console.log(dude.fullname()); // choi zzossig
```

함수의 프로토타입은 객체의 프로토타입과 성질은 같고, 이름은 다르다.

모든 자바스크립트 Object는 `__proto__`객체를 지니고 있고, 이것이 그 객체의 프로토타입이 된다. 만약 생성자 함수에 함수를 정의하게 되면, 그 함수는 `prototype`이라는 이름의 객체 안에 들어가게 된다.

|  dude 	|  Person 	|  Object 	|
|---	|---	|---	|
|  choi 	|  firstname 	|  constructor 	|
|  zzossig 	|  lastname 	|  `__proto__` 	|
|  `__proto__` 	|  `prototype` 	|   	|

이 표에서 Person의 prototype객체는 특정 Object를 가리키게 된다. 이 Object가 Person 함수에서 정의한 메서드들을 모아두는 Object이다. dude객체는 Person 함수로 만들어진 객체이므로, Person의 프로토타입이 가리키는 특정 Object를 dude또한 가리키게 된다.

이렇듯, Person함수로 만들어진 객체는 모두 같은 프로토타입 객체를 공유하게 된다.

함수의 프로토타입은 다음과 같이 함수 외부에서 정의할 수 있다.

```javascript
Person.prototype.fullname = function() {
  return this.firstname + ' ' + this.lastname;
}
```

### 내부 vs 외부 정의

위에서 본 것 처럼, 프로토타입 함수를 내부와 외부에서 모두 정의할 수 있다. 차이점은, 외부에서 정의한 프로토타입 함수는 객체지향에 프로그래밍에 빗대어 이야기하면, 항상 public한 값에만 접근할 수 있다는 것이다.

```javascript
Person.prototype.fullname = function() {
  return this.firstname + ' ' + this.lastname; // firstname과 lastname은 소위 public
}
```

반면, 내부에서 정의한 프로토타입 함수의 경우, 객체지향에서 이야기하는 private한 상태를 흉내낼 수 있다.

```javascript
function Person(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.fullname = function() {
    return firstname + ' ' + lastname;
  }
}

var dude = new Person('choi', 'zzossig');
dude.firstname = "hello";
console.log(dude.fullname()); // choi zzossig
```

위의 예제에서 fullname 프로토타입 함수 안의 this를 삭제했다. 코드를 돌려보면, firstname의 값을 10번째 줄에서 변경하였음에도, firstname값이 변경되지 않았음을 알 수 있다. 

이것은 자바스크립트의 함수가 지니는 클로저(closure) 특성을 이용한 것인데, 함수의 인자로 넘겨받은 firstname과 lastname은 함수의 클로저 범위로 설정되고, 함수 안의 함수에서 이 클로저 범위의 값을 참조하여 항상 넘겨받은 파라미터값을 참조하게 되는 것이다.

이를 통해 자바스크립트에서 객체지향의 private을 흉내낼 수 있음을 알 수 있다.

## 상속

프로토타입을 상속하고 싶으면, `Object.create()`함수를 이용하면 된다.

```javascript
function Person(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
}

Person.prototype.fullname = function() {
  return this.firstname + ' ' + this.lastname;
}

function Proname(honor, firstname, lastname) {
  Person.call(this, firstname, lastname);
  this.honor = honor;  
}

Proname.prototype = Object.create(Person.prototype); // 프로토타입 상속
Proname.prototype.proname = function() {
  return this.honor + ' ' + this.firstname + ' ' + this.lastname;
}

var proname = new Proname('Mr.', "choi", "zzossig");
console.log(proname.proname()); // Mr. choi zzossig
console.log(proname.fullname()); // choi zzossig
```

위의 예시에서 15번째 줄에서 상속이 일어난다. 만약 저 라인을 주석처리하고 코드를 돌려보면 fullname이 정의되지 않았다는 에러메시지가 뜬다. fullname함수는 Person생성자 메서드고, 이 메서드를 Proname에서 사용할 수 없다는 뜻인데, 이는 서로 다른 프로토타입을 지니기 때문에 발생하는 에러다.