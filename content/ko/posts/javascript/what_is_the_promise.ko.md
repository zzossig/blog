---
title: "자바스크립트 Promise 이해하기"
date: 2019-12-30T09:14:28+09:00
description: 자바스크립트의 비동기 연산.
tags:
- javascript
series:
-
categories:
-
image: images/feature3/promise.png
---

## 비동기란?

동기는 프로그램의 흐름 순서에 따라 코드가 순차적으로 실행되는 것이고, 비동기는 프로그램의 흐름 순서에서 벗어나 내가 원할 때 코드(함수를) 실행시키는 것을 말한다. 

### 비동기 함수의 예

자바스크립트의 native 메서드 중 `setTimeout`과 `setInterval`이 대표적인 비동기 함수다. 이 두 함수는 프로그램의 흐름에서 벗어나, 내가 지정한 시간에 함수를 실행시켜주는 역할 한다. 

```javascript
console.log(1);
setTimeout(function() {
  console.log(2);
}, 2000); // 2초 후에 함수를 실행시킴
console.log(3);
```

위 코드를 실행시키면, 콘솔에 찍히는 값은 순서대로 `1, 3, 2`가 된다.

## 자바스크립트 Promise

Promise는 자바스크립트에서 비동기 함수를 다루는 또 다른 방법을 제공한다. setTimeout이나 setInterval과 다른점이라면, setTimeout과 setInterval은 사용되는 즉시 실행되지만, Promise는 이행, 보류, 거부와 같은 상태값을 제공한다는 것이다.

Promise의 보류 상태가 주는 이점은, Promise는 resolve가 되지 않으면 pending(보류)상태로 남게되는데, 보류 상태의 Promise는 다른 함수의 인자로 넣거나 변수처럼 다룰 수 있다는 점이다.

### Promise 생성 문법

```javascript
var myPromise1 = new Promise(function(resolve, reject) {
  resolve(1);
});
myPromise1.then(); // 이행
var myPromise2 = new Promise(function(resolve, reject) {
  reject(1);
});
myPromise2.then(); // 거부
```

Promise 객체를 만드는 문법은 대략 위와 같다. Promise의 인자로 넘겨진 콜백 함수 안에 정의된 내용에 따라 이행이냐(fulfilled) 거부냐(rejected)가 결정된다. 위의 코드는 콜백함수에 비동기 함수를 실행하고 있지 않기 때문에 사실 Promise를 쓸 이유는 없고 Promise를 만드는 문법을 보여주기 위한 것이다.

### Promise 비동기 콜백

보통 Promise를 쓰는 이유는 비동기적인 함수 호출을 원하는대로 컨트롤 하기 위해서 일 것이다. 위의 예제처럼 콜백 함수 안에 막바지로 `resolve`나 `reject`를 쓰는 일은 없다. 따라서 다음 예제가 가장 간단한 기본 예제가 될 것이다.

```javascript
var myPromise1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('foo');
  }, 2000);
});
myPromise1.then(); // 이행
```

위의 코드는 딱히 실패할 이유가 없으므로 2초후에 이행(fulfilled)된다.

### Promise와 api

가장 현실적으로, 보통 Promise는 api요청을 하고 난 직후, 요청의 결과값으로 받는 경우가 많을 것이다. api요청의 경우, 서버에서 처리하고 데이터를 전달하기 까지 시간이 소요된다. 보통 이런 시간 소요를 고려하여 이를 비동기적으로 처리하고자 일단 api요청을 하면 요청의 결과값을 바로 주는게 아니라 Promise를 리턴한다. 요청하는 쪽에서는 이 Promise를 가지고 의사 결정을 할 수 있다.

- 지금 당장 요청의 결과값을 리턴받기를 바라면 then()을 쓰면 된다. 그러면 서버에서는 요청을 받고 처리하고난 후, 약간의 시간 후에 결과값을 리턴해 준다.
- 결과값을 지금이 아닌 나중에 리턴받고 싶으면, 요청을 한 직후 리턴받은 Promise를 그대로 가지고 있으면 된다. 위의 예제에서는 myPromise1 자체로 pending(보류) 상태이고, 이를 변수처럼 다룰 수 있기 때문에 필요한 곳에서 사용하면 된다.

```javascript
import axios from 'axios';

var apiPromise = axios.get('https://jsonplaceholder.typicode.com/posts');
apiPromise; // // 보류(pending)

apiPromise
  .then(data => console.log(data)); // 이행
  .catch(err => console.log(err)); // 거부
```

axios.get 함수는 위에서 `new Promise(function...)`형태로 만든 Promise 객체를 반환한다. api 요청이 성공했을 때와 실패했을 때의 구현은 axios가 하게 되므로 사용자 입장에서는 `then()`을 사용하여 Promise의 콜백을 수행하고 reject가 되었을 때를 대비하여 `catch()`등을 사용하면 된다.

## async와  await

Promise의 이행을 위해 위에서는 `then()`이라는 메서드를 사용했다. then과 async, await는 기본적으로 Promise의 값을 resolve해주는 역할을 한다. 역할은 같지만, then을 쓰면 불편하거나 거의 불가능한 비동기 처리 로직이 있기 때문에, 이를 위해 async와 await가 탄생했다.

### 콜백 지옥

이미 알고 있겠지만, Promise를 이행하기 위해 then을 사용하면, 불필요하게 중첩된 구문을 마주하게 될 수 있다.

```javascript
import axios from 'axios';

axios
  .get('https://jsonplaceholder.typicode.com/posts')
  .then(data => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(data => {
        axios
          .get('https://jsonplaceholder.typicode.com/todos')
          .then(data => {
            ...
          });
      });
  });
```

### 콜백 지옥의 문제점

사실 나의 경우 콜백이 3번을 초과하여 중첩된 경우는 거의 없었다. 코드 가독성 측면에서도 3번 정도의 콜백이면 납득 할 만 하다. 내가 격은 콜백의 문제점은 단 한 번만 콜백을 하더라도 발생하는데, 바로 콜백 형태로 데이터를 resolve하게되면, 새로운 범위(scope)안에서만 해당 데이터를 쓸 수 있다는 것이다.

```javascript
import axios from 'axios';

axios
  .get('https://jsonplaceholder.typicode.com/posts')
  .then(data => {
    console.log(data); // Array[100]
  });

console.log(data); // undefined
```

사소해 보이지만, 범위가 하나만 더 늘어나도 곤란한 경우가 분명 존재한다.

### async와 await 기본 예시

범위를 새로 만들지 않고 Promise를 이행시키 기 위해 async와 await의 키워드가 등장했다고 생각한다. 기본적으로 async와 await는 항상 붙어다니고, Promise객체에만 쓴다는 점을 명심하자. 엄한 함수에 await를 붙여봐도 별다른 효과가 없을 것이다.

```javascript
async function() {
  const result = await new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve('foo');
    }, 2000);
  });
  console.log(result); // foo
  
  const result2 = await axios.get('https://jsonplaceholder.typicode.com/posts');
  console.log(result2); // Array[100]
}
```

위의 예시처럼 await는 항상 Promise 객체 앞에 붙고, await를 쓰려면 함수 앞에 async 키워드를 붙여야 한다.