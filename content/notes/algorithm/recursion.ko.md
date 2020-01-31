---
title: "알고리즘 연습 - Recursion"
date: 2020-01-08T18:38:49+09:00
description: 재귀 함수, 재귀 알고리즘
draft: true
enableToc: false
enableTocContent: false
tags:
- algorithm
series:
-
categories:
-
image: images/feature4/recursion.png
---

{{< boxmd >}}
Collect all of the odd values in an array
{{< /boxmd >}}

## Solutions - Helper Method Recursion

```javascript
function collectOddValues(arr) {
  let result = [];

  function helper(helperInput) {
    if (helperInput.length === 0) {
      return null;
    }

    if (helperInput[0] % 2 !== 0) {
      result.push(helperInput[0]);
    }

    helper(helperInput.slice(1));
  }
  helper(arr);

  return result;
}
```

## Solutions - Pure Recursion

```javascript
function collectOddValues(arr) {
  let newArr = [];

  if (arr.length === 0) {
    return newArr;
  }

  if (arr[0] % 2 !== 0) {
    newArr.push(arr[0]);
  }

  newArr = newArr.concat(collectOddValues(arr.slice(1)));
  return newArr;
}
```

