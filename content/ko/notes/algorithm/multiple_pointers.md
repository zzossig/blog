---
title: "알고리즘 연습 - Multiple Pointers"
date: 2020-01-08T18:28:59+09:00
description: 유니크한 값 카운트하기, 다중 포인터
draft: true
enableToc: false
enableTocContent: false
tags:
- algorithm
series:
-
categories:
-
image: images/feature4/rubiks-cube.png
---

## Problem 1

{{< boxmd >}}

Write a function called **sumZero**, which accepts a sorted array of integers. The function should find the first pair where the sum is 0. Return an array that includes both values that sum to zero or undefined if a pair does not exist.

example:

```javascript
  sumZero([-3,-2,-1,0,1,2,3]) // [-3, 3]
  sumZero([-2,0,1,3]) // undefined
  sumZero([1,2,3]) // undefined
```

{{< /boxmd >}}

## 1 - Solutions

### Naive Solution

```javascript
function sumZero(arr) {
  for (let i = 0; i < arr; i++) {
    for (let j = i+1; j < arr.length; j++) {
      if (arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]];
      }
    }
  }
}
```

- Time Complexity - O(N<sup>2</sup>)

### Refactor

```javascript
function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
}
```

- Time Complexity - O(N)

## Problem 2

{{< boxmd >}}

Implement a function called countUniqueValues, which accepts a sorted array, and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted.

example:

```javascript
  countUniqueValues([1,1,1,1,1,2]) // 2
  countUniqueValues([1,2,3,4,4,4,7,7,12,12,13]) // 7
  countUniqueValues([]) // 0
  countUniqueValues([-2,-1,-1,0,1]) // 4
```

{{< /boxmd >}}

## 2 - Solutions

```javascript
function countUniqueValues(arr) {
  if (arr.length === 0) return 0;
  var i = 0;
  for (var j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
   return i + 1;
}
```