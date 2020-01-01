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

## . 메타문자

`.`은 정규식에서 와일드카드라고 부른다. `.`을 쓴 부분에서는 어느 문자가 오든 매칭되는 값이라고 본다.

```javascript
let txt = "how it that so hot.";
let regexp = /h.t/g;
console.log(txt.match(regexp)); // ['hat', 'hot']
```

`hat`과 `hot`은 `a`와 `o`가 와일드카드 문자열인 `.`에 의해 허용되었다. 정규식에서 `.`자리에는 <U>단 하나의 어떠한 문자</U>와도 매칭된다.

## \ 메타문자

`\`은 정규식에서 에스케이핑(escaping), 즉 탈출문자라고 부른다. 정규식에서는 `^$.*+?=!:|\/()[]{}`등의 특수문자가 특정한 목적을 달성하기 위해 이미 쓰이고 있어서, 이들 특수 문자를 정규식에서 찾고자하는 문자열에 포함시키고 싶을 때, escaping 메타문자를 쓴다.

```javascript
let txt = "how it that so hot.";
let regexp = /t\./g;
console.log(txt.match(regexp)); // ['t.']
```

`.`은 정규식에서 쓰이는 메타문자이기 때문에, `t.`이라는 문자열을 찾고싶으면 `.`메타문자 앞에 `\` escaping 메타문자를 붙여야 한다.

## 조절 문자(Control Characters)

정규식에 enter를 넣고 싶거나, tab을 넣고 싶을 때 사용하는 문자열이다

- `\t` - tab
- `\v` - vertical tab
- `\n` - newline
- `\r` - carriage return

윈도우에서는 enter키를 `\r\n`으로 나타내고 리눅스나 유닉스 계열은 엔터를 `\n`으로 나타낼 수 있다.

## [] 메타문자

