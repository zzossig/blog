---
title: "알고리즘 연습 - Divide and Conquer Pattern"
date: 2020-01-08T18:35:04+09:00
description: 분할 정복, 반씩 줄여나가기
draft: false
enableToc: false
enableTocContent: false
tags:
- algorithm
series:
-
categories:
-
featured_image:
featured_image: feature4/divide.png
---

{{< boxmd >}}

Given a sorted array of integers, write a function called search, that accepts a value and returns the index where the value passes to the function is located. If the value is not found, return -1

```javascript
search([1,2,3,4,5,6], 4); // 3
search([1,2,3,4,5,6], 6); // 5
search([1,2,3,4,5,6], 11); // -1
```

{{< /boxmd >}}

## Solutions

### Naive Solution

```javascript
function search(arr, val) {
  for (let i = b; i < arr.length; i++) {
    if (arr[i] === val) {
      return i;
    }
    return -1;
  }
}
```

- Time Complexity - O(N)

### Refactor

```javascript
function search(array, val) {
  let min = 0;
  let max = array.length - 1;

  while (min <= max) {
    let middle = Math.floor((min + max) / 2);
    let currentElement = array[middle];

    if (array[middle] < val) {
      min = middle + 1;
    } else if (array[middle] > val) {
      max = middle - 1;
    } else {
      return middle;
    }
  }

  return -1;
}
```

- Time Complexity - O(logN)
