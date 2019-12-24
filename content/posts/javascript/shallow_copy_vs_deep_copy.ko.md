---
title: "깊은 복사 vs 얕은 복사 in javascript"
date: 2019-12-24T09:54:43+09:00
description: 자바스크립트에서 파라미터 없이 slice() 쓰는 이유.
tags:
- programming
series:
-
categories:
-
featured_image: feature2/copy.png
---

기본적으로 자바스크립트에서 깊은 복사, 얕은 복사를 논할 때는 object나 array 같은 reference type을 다룬다는 전제를 깔고 들어간다.
 primitive type에는 string, boolean, number 등이 있고, 항상 메모리 값을 복사하기 때문에 참조관계를 전혀 신경 쓸 필요가 없다. 반면 reference type에 값을 할당할 때, 깊은 복사냐, 얕은 복사냐에 따라 행동이 달라질 수 있기 때문에, 이 내용을 알고 있어야 한다.

## Primitive type

- 깊은 복사

    ```javascript
    var a = 1;
    var b = a;
    b = 2;
    
    console.log(a); // 1
    console.log(b); // 2
    ```

예상한 대로 값이 나온다. string이나 boolean으로 테스트해도 마찬가지 결과가 나온다. 별로 신경쓸게 없고 직관적임.

## Reference type

### 깊은 복사(Object)

- 객체의 깊은 복사를 하는 가장 쉬운 방법은 아래와 같다. 그 외에는 외부 라이브러리를(lodash의 cloneDeep) 사용해야 한다. Native 자바스크립트로 객체를 깊은복사 하면 prototype과 같은 데이터가 손상된다. 따라서 Date, Infinity, RegExps, Maps, Sets... 등등의 객체를 깊은 복사하려고 하면 데이터 손실이 발생한다. Json 형태의 객체라면 온전히 예상대로 깊은 복사가 될 것이다. 
    참고 - [https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript](https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript)

    ```javascript
    var obj = { a: 1 };
    var deepCopiedObj = JSON.parse(JSON.stringify(obj)); // 깊은 복사
    ```

### 얕은 복사(Object)

- 원본과 복사본에서 객체 안의 객체(reference type)와 객체 안의 원시 타입(primitive type)의 값을 변경해 보면, 객체 안의 reference type은 복사본과 원본이 같은 메모리 주소르 바라보고 있음을 알 수 있다.

    ```javascript
    var obj = {
      a: {
        b: 1,
      },
      c: 2,
    };
    var shallowCopiedObj = {...obj}; // 얕은 복사

    shallowCopiedObj.a.b = 5;
    shallowCopiedObj.c = 100;
    console.log(obj.a.b); // 5
    console.log(shallowCopiedObj.a.b); // 5
    console.log(obj.c); // 2
    console.log(shallowCopiedObj.c); // 100
    ```

    ```javascript
    var obj = {
      a: {
        b: 1,
      }
    };
    var shallowCopiedObj = Object.assign({}, obj); // 얕은 복사

    shallowCopiedObj.a.b = 5;
    console.log(obj.a.b); // 5
    console.log(shallowCopiedObj.a.b); // 5
    ```

### 깊은 복사(Array)

- Object와 마찬가지로 Json 형태의 데이터를 지닌 Array만 데이터 손실 없이 깊은 복사가 된다. arr과 deepClonedArray는 서로 독립적으로 값을 가질 수 있다.
    참고 - [https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript](https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript)

    ```javascript
    var arr = [{a: 1},{b: 2}];
    var deepClonedArray = JSON.parse(JSON.stringify(arr)); // 깊은 복사
    ```

### 얕은 복사(Array)

- Object와 마찬가지로 객체 안의 reference type인 object가(아래의 경우 0번 index) 원본과 복사본이 같은 메모리를 바라본다.

    ```javascript
    var arr = [{a: 1},{b: 2}];
    var shallowClonedArray = arr.map((v) => v); // 얕은 복사
    shallowClonedArray[0].a = 100;
    
    console.log(arr); // [{a: 100}, ...]
    console.log(shallowClonedArray); // [{a: 100}, ...]
    ```

    ```javascript
    var arr = [{a: 1},{b: 2}];
    var shallowClonedArray = arr.slice(); // 얕은 복사
    shallowClonedArray[0].a = 100;
    
    console.log(arr); // [{a: 100}, ...]
    console.log(shallowClonedArray); // [{a: 100}, ...]
    ```

    ```javascript
    var arr = [{a: 1},{b: 2}];
    var deepClonedArray = [...arr]; // 얕은 복사
    deepClonedArray[0].a = 100;
    
    console.log(arr); // [{a: 100}, ...]
    console.log(deepClonedArray); // [{a: 100}, ...]
    ```

