---
title: "빅오 표기법(Big-O) 이란?"
date: 2019-12-23T11:58:22+09:00
description: 빅오 표기법, 시간복잡도, 공간복잡도
tags:
- algorithm
series:
- 
categories:
- algorithm
featured_image: feature2/circled-0.png
---

## 좋은 알고리즘의 기준?

좋은 알고리즘의 조건은 뭘까?

- 코드의 가독성
- 성능(실행 시간)
- 메모리 사용량

여러가지 기준이 있겠지만, 보통은 **성능**에 포커스를 맞추는 듯 하다. 메모리 용량이 1byte가 아쉬웠던 시절은 오래전에 지났기 때문에, 메모리를 많이 쓰더라도, 빠른게 최고다.

## 좋은 알고리즘의 평가

알고리즘을 평가할 때 참 잘했어요와 같이, greate, good, bad와 같은 식으로 평가하지 않는다. 어떤 객관적인 기준을 가지고 알고리즘 성능을 평가한다. 알고리즘 세계에서 그 객관적인 기준이 바로 빅오 표기법 이다. 어떤 알고리즘을 빅오 표기법으로 표현하기 위해서는 어느정도 수학적인 지식도 필요하지만 간단하게 다음 표와같이 이해하시면 편할 것이다.

| 연산 회수  | big-o | 성능  |
|---|---|---|
| 3  | O(1) | 최상+  |
| 2logn + 1  | O(log n)  | 최상  |
| 3n + 2  | O(n)  | 상  |
| 5nlog n + 1  | O(nlog n)  | 중  |
| 4n<sup>2</sup> + 5n + 1  | O(n<sup>2</sup>)  | 하  |

빅오 표기법의 특징인데, 앞에 붙는 숫자나 상수는 무시한다. 전체적인 경향성이 중요하다. 숫자 n의 값이 커질 때, 나머지 숫자는 무시해도 될 정도가 되기 때문에 big-o 표기법에서는 이런 상수값들을 떼어낸다. 때문에 n의 값이 충분히 크지 않을때는, 성능이 *하*인 알고리즘이 *최상*인 알고리즘보다 빠르게 수행될 수 있다.

## 시간 복잡도 vs 공간 복잡도

위에서 알고리즘을 평가하는 기준 중에, 알고리즘이 수행되는 시간이 중요하다고 했다. 따라서 보통 빅오 표기법으로 나타낸 식은 다른 말이 없다면 시간 복잡도 이해해되 될 것 같다.

- 시간 복잡도: 알고리즘이 수행되는 시간
- 공간 복잡도: 알고리즘을 수행하기 위해 사용하는 메모리 양

## 자바스크립트 기본 Big-O

### Object

| action  | big-o  |
|---|---|
| 삽입(Insersion) | O(1)  |
| 삭제(Removal) | O(1)  |
| 접근(Access) | O(1)  |
| 검색(Searching)  | O(N)  |

```javascript
var obj = {};
obj.a = 1; // 삽입
obj.b = 2;
del obj.a; // 삭제
console.log(obj.b) // 접근
obj.hasOwnProperty('b') // true, 검색
```

### Array

| action  | big-o  |
|---|---|
| 삽입(Insersion - push) | O(1)  |
| 삭제(Removal - pop) | O(1)  |
| 삽입(Insersion - unshift) | O(N)  |
| 삭제(Removal - shift) | O(N)  |
| 접근(Access) | O(1)  |
| 검색(Searching)  | O(N)  |

| action  | big-o  |
|---|---|
| concat | O(N)  |
| slice | O(N)  |
| splice | O(N)  |
| sort | O(N * log N)  |
| forEach | O(N)  |
| map  | O(N)  |
| filter  | O(N)  |
| reduce  | O(N)  |

```javascript
var arr = [];
arr.push(1); // 삽입
arr.push(2);
arr.pop(); // 삭제
arr.unshift(3); // 삽입
arr.shift(); // 삭제
console.log(arr[0]); // 접근
arr.indexOf(1); // 검색
```