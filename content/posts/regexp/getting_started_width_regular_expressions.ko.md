---
title: "정규 표현식 기초 살펴보기"
date: 2019-12-31T17:31:41+09:00
description: 정규식이 쓰이는 메서드(match, exec, search ...)와 플래그(flags)
tags:
- regexp
series:
- 정규식
categories:
-
featured_image: feature3/variable.png
---

## 정규식 생성 방법

- 생성자 패턴으로 생성하기.

    ```javascript
    var regexp = new RegExp("hello");
    ```

- 리터럴 형식으로 생성하기.

    ```javascript
    var regexp = /hello/;
    ```

## 정규 표현식 객체의 내장 메서드

### test메서드

패턴을 찾으면 `true` 혹은 `false`를 반환한다.

```javascript
let txt = "this is text";
let regexp = /is/;
console.log(regexp.test(txt)); // true
```

### exec메서드

패턴을 찾으면 찾은 위치의 인덱스와 함께 텍스트 정보를 반환한다.

```javascript
let txt = "programming always starts with a hello world!";
let regexp = /hello/;
console.log(regexp.exec(txt)); // [{0: "hello", index: 33, input: "progr ..."}]
```

## 문자열 객체의 내장 메서드

### match메서드

자바스크립트의 문자열에는 정규식을 쓸 수 있게 해주는 메서드가 여럿 존재한다. match의 경우 위에서 살펴본 exec메서드와 같은 결과를 반환한다. 자신의 상황에 따라 알맞은 메서드를 골라 쓰면 된다.

```javascript
let txt = "programming always starts with a hello world!";
let regexp = /hello/;
console.log(txt.match(regexp)); // ["hello", index: 33, input: "progr ..."]
```

### search메서드

문자열의 search 메서드 파라미터로 정규식을 넘기면 문자열에서 해당 정규식과 매칭되는 포지션의 인덱스를 반환한다.

```javascript
let txt = "programming always starts with a hello world!";
let regexp = /hello/;
console.log(txt.search(regexp)); // 33
```

### replace메서드

문자열의 replace메서드 파라미터로 정규식을 넘기면 정규식과 매칭되는 곳의 문자열을 바꾼 후, 새로운 문자열을 반환한다.

```javascript
let txt = "programming always starts with a hello world!";
let regexp = /hello/;
console.log(txt.replace(regexp, "hi")); // ... hi world!
```

### split메서드

문자열의 split메서드의 파라미터로 정규식을 넘기면 해당 정규식과 매칭되는 문자를 구분자로 문자열을 잘라 배열을 반환한다.

```javascript
let txt = "programming always starts with a hello world!";
let regexp = /\s/; // 공백문자 정규식
console.log(txt.split(regexp)); // ["programming", "always", "starts", ...]
```

## 정규 표현식의 플래그(Flags)

정규 표현식의 플래그는 문자열에서 패턴을 찾을 때, 문자열을 전역적으로 찾을 것인지, 대소문자 구분할 것인지 등을 설정하는 옵션의 개념이다. 

### 플래그 설정하기

다음과 같이 설정할 수 있다.

- 생성자 패턴

    ```javascript
    var regexp = new Regexp("hello", "g"); // g가 flag임
    ```

- 리터럴 형식

    ```javascript
    var regexp = /hello/g; // g가 flag임
    ```

### 플래그 종류

- g - 문자열 전체(global)에 걸쳐 매칭되는 패턴을 찾게 해주는 플래그
- i - 문자열의 대소문자 관계 없이(case insensitive) 패턴을 찾게 해주는 플래그
- m - 다중 라인(multi-line)에 걸쳐 패턴을 찾게 해주는 플래그

### 플래그 사용해보기

```javascript
let txt = "programming always starts with a hello world!";
let regexp = /s/g; // s문자열을 글로벌로 찾아라는말
console.log(txt.match(regexp)); // ['s', 's', 's']
```

참고로 g플래그를 붙여 match메서드를 쓰면 결과로 매칭되는 s를 찾아 배열로 반환하지만, g플래그를 안쓰면 위에서 본대로 찾은 위치(index)와 쓰인 문자열이 배열 형식으로 리턴된다.