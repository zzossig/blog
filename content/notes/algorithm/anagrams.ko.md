---
title: "알고리즘 연습 - anagram"
date: 2019-12-29T19:54:17+09:00
description: 두 문자열의 문자와 빈도수 비교, Frequency Counter
draft: true
enableToc: false
enableTocContent: false
tags:
- algorithm
series:
-
categories:
-
featured_image: feature3/flow-chart.png
---

{{< boxmd >}}
Given two strings, write a function to determine if the second string is an anagram of the first. An anagram is a word, phrase, or name formed by rearranging the letters of another, such as cinema, formed from iceman.

example:

```javascript
  validAnagram('', '') // true
  validAnagram('aaz', 'zza') // false
  validAnagram('anagram', 'nagaram') // true
  validAnagram('rat', 'car') // false
  validAnagram('awesome', 'awesom') // false
  validAnagram('qwerty', 'qeywrt') // true
  validAnagram('texttwisttime', 'timetwisttext') // true
```

{{< /boxmd >}}

## Solutions

```javascript
function validAnagram(first, second) {
  if (first.length !== second.length) {
    return false;
  }

  const lookup = {};

  for (let i = 0; i < first.length; i++) {
    let letter = first[i];
    lookup[letter] ? lookup[letter] += 1 : lookup[letter] = 1;
  }
  
  for (let i = 0; i < second.length; i ++) {
    let letter = second[i];
    if (!lookup[letter]) {
      return false;
    } else {
      lookup[letter] -= 1;
    }
  }

  return true;
}
```