---
title: "빅오 표기법(Big-O) 이란?"
date: 2019-12-23T11:58:22+09:00
description: 빅오 표기법, 시간복잡도, 공간복잡도
draft: true
tags:
- algorithm
series:
- 
categories:
- algorithm
featured_image: feature2/circled-0.png
---

## 좋은 알고리즘의 기준?

좋은 알고리즘의 조건이 뭐라고 생각하시나요?

- 코드의 가독성
- 성능(실행 시간)
- 메모리 사용량

여러가지 기준이 있겠지만, 보통은 **성능**에 포커스를 맞추죠.

## 좋은 알고리즘의 평가

알고리즘을 평가할 때 참 잘했어요와 같이, greate, good, bad와 같은 식으로 평가하지 않습니다. 어떤 객관적인 기준을 가지고 알고리즘 성능을 평가하죠. 알고리즘 세계에서 그 객관적인 기준이 바로 빅오 표기법 입니다. 빅오 표기법과 관련해서는 어느정도 수학적인 지식도 필요합니다만 간단하게 다음 표와같이 이해하시면 편할 것 같습니다.

| 연산 회수  | big-o | 성능  |
|---|---|---|
| 3  | O(1) | 최상+  |
| 2logn + 1  | O(log n)  | 최상  |
| 3n + 2  | O(n)  | 상  |
| 5nlog n + 1  | O(nlog n)  | 중  |
| 4n<sup>2</sup> + 5n + 1  | O(n<sup>2</sup>)  | 하  |

빅오 표기법의 특징인데, 앞에 붙는 숫자나 상수는 무시합니다. 숫자 n의 값이 커질 때, 나머지 숫자는 무시해도 될 정도가 되기 때문에 big-o 표기법에서는 이런 상수값들을 떼어냅니다. 때문에 n의 값이 충분히 크지 않을때는, 성능이 *하*인 알고리즘에 성능이 *최상*인 알고리즘의 연산보다 빠르게 수행될 수 있습니다.