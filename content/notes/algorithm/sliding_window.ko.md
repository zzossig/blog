---
title: "알고리즘 연습 - Sliding Window"
date: 2020-01-08T18:31:31+09:00
description: subset(sub array나 sub string)을 추적할 떄 좋음.
draft: true
enableToc: false
enableTocContent: false
tags:
- algorithm
series:
-
categories:
-
featured_image:
featured_image: feature4/window.png
---

## Problem

{{< boxmd >}}

Write a function called maxSubarraySum which accepts an array of integers and a number called **n**. The function should calculate the maximum sum of **n** consecutive elements in the array.

```javascript
maxSubarraySum([1,2,5,2,8,1,5], 2) // 10
maxSubarraySum([1,2,5,2,8,1,5], 5) // 17
maxSubarraySum([4,2,1,6], 1) // 6
maxSubarraySum([4,2,1,6,2], 4) // 13
maxSubarraySum([], 4) // null
```

{{< /boxmd >}}

## Solutions

### Naive Solution

```javascript
function maxSubarraySum(arr, num) {
  if (num > arr.length) {
    return null;
  }
  var max = -Infinity;
  for (let i = 0; i < arr.length - num + 1; i++) {
    temp = 0;
    for (let j = 0; j < num; j++) {
      temp += arr[i + j];
    }
    if (temp > max) {
      max = temp;
    }
  }
  return max;
}
```

- Time Complexity - O(N<sup>2</sup>)

## Refactor

```javascript
function maxSubarraySum(arr, num) {
  let maxSum = 0;
  let tempSum = 0;
  if (arr.length < num) return null;
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}
```
