---
title: "정규식에서 쓰이는 메타 문자"
date: 2019-12-31T18:49:24+09:00
description: 정규식의 특수 문자 살펴보기(^$.*+?=!:|\/()[]{})
tags:
- regexp
series:
- 정규식
categories:
-
featured_image: feature3/align-text-top.png
---

{{< img src="/images/feature1/flow.png" title="Image4" caption="Image description" alt="image alt" >}}
{{< img src="/images/feature1/web.png" title="Image4" caption="Image description" alt="image alt" >}}

## . 와일드카드

`.`은 정규식에서 와일드카드라고 부른다. `.`을 쓴 부분에서는 어느 문자가 오든 매칭되는 값이라고 본다.

```javascript
let txt = "how it that so hot.";
let regexp = /h.t/g;
console.log(txt.match(regexp)); // ['hat', 'hot']
```

`hat`과 `hot`은 `a`와 `o`가 와일드카드 문자열인 `.`에 의해 허용되었다. 정규식에서 `.`자리에는 <U>단 하나의 어떠한 문자</U>와도 매칭된다.

## \ 에스케이핑

`\`은 정규식에서 에스케이핑(escaping), 즉 탈출문자라고 부른다. 정규식에서는 `^$.*+?=!:|\/()[]{}`등의 특수문자가 특정한 목적을 달성하기 위해 이미 쓰이고 있어서, 이들 특수 문자를 정규식에서 찾고자하는 문자열에 포함시키고 싶을 때, escaping 메타문자를 쓴다.

```javascript
let txt = "how it that so hot.";
let regexp = /t\./g;
console.log(txt.match(regexp)); // ['t.']
```

`.`은 정규식에서 쓰이는 메타문자이기 때문에, `t.`이라는 문자열을 찾고싶으면 `.`메타문자 앞에 `\` escaping 메타문자를 붙여야 한다.

## 조절 문자(Control Characters)

정규식에 enter를 넣고 싶거나, tab을 넣고 싶을 때 사용하는 문자열이다.

- `\t` - tab
- `\v` - vertical tab
- `\n` - newline
- `\r` - carriage return

윈도우에서는 enter키를 `\r\n`으로 나타내고 리눅스나 유닉스 계열은 엔터를 `\n`으로 나타낼 수 있다.

## [ ] 문자 세트(Character Set)

정규식에서 `[]`는 찾고자 하는 문자 세트를 지정할 때 쓴다.

```javascript
let txt = "gray grey gr2y.";
let regexp = /gr[ae]y/g; // a 또는 e 둘중 하나.
console.log(txt.match(regexp)); // ["gray", "grey"]

let regexp2 = /gr[0-9]y/g; // -는 범위
console.log(txt.match(regexp2)); // ["gr2y"]

let regexp3 = /[g][r][e]./g; // .은 와일드카드
console.log(txt.match(regexp3)); // ["grey"]
```

## - 범위 지정하기

문자 세트에 범위는 `-`메타문자로 지정할 수 있다. 범위는 숫자일 필요는 없고 문자도 가능하다.

```javascript
let txt = "Gr2y";
let regexp = /[1-4]/g; // 1~4중 하나의 문자와 매치.
console.log(txt.match(regexp)); // ["2"]

let regexp2 = /[a-z]/g; // a~z중 하나의 문자와 매치.
console.log(txt.match(regexp2)); // ["r"]

let regexp3 = /[a-zA-Z]/g; // 하나의 영문자와 매치.
console.log(txt.match(regexp3)); // ["G", "r", "y"]
```

## ^ 제외 문자 지정

정규식에서 `^`는 제외할 문자열을 나타내는 기호다.

```javascript
let txt = "Grey grey";
let regexp = /[^A-Z]rey/g; // 대문자로 시작하는 문자 제외
console.log(txt.match(regexp)); // ["grey"]
```

## 문자 세트 Shortcut

특정 문자 세트(`[]`)를 지정하는 단축어가 존재한다.

- `\d` - `[0-9]` 숫자와 매칭
- `\w` - `[a-zA-Z0-9]` 영문자와 숫자 매칭
- `\s` - `[\t\r\n]` 공백문자와 매칭
- `\D` - `[^0-9]` 숫자가 아닌 것과 매칭
- `\W` - `[^a-zA-Z0-9_]` 영문자와 숫자가 아닌 문자와 매칭
- `\S` - `[^\t\r\n]` 공백이 아닌 문자와 매칭

## 시작과 끝 지정(Anchoring)

`^`메타문자는 시작 문자를, `$`는 끝 문자를 나타낸다.

```javascript
let txt = "this is this the first time.";
let regexp = /this/g; // this문자열과 매칭
console.log(txt.match(regexp)); // ["this", "this"]
```

```javascript
let txt = "this is this the first time.";
let regexp = /^this/g; // 문자열의 첫 시작만 매칭되는지 확인
console.log(txt.match(regexp)); // ["this"]
```

```javascript
let txt = "this is this the first time.";
let regexp = /time$/g; // time으로 끝나는 문자열
console.log(txt.match(regexp)); // undefined(문자열은 time.으로 끝남)
```

```javascript
let txt = "this is this the first time.";
let regexp = /time.$/g; // time.으로 끝나는 문자열
console.log(txt.match(regexp)); // ["time."]
```