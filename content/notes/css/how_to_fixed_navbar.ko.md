---
title: "상단 고정 나비게이션바 만들기"
date: 2020-01-10T22:49:53+09:00
description: Fixed Navigation Bar, Fixed Appbar
draft: true
hideToc: false
enableToc: false
enableTocContent: false
tags:
- css
series:
-
categories:
-
featured_image: feature4/compass.png
---

`console.log(1);`

```
  console.log(1);
  console.log(2);
  console.log(3);
  ```

- adsgiasdjg
  ```
  console.log(1);
  console.log(2);
  console.log(3);
  ```

```html
<div class="navbar__wrapper">
  <nav class="navbar">
    nav
  </nav>
</div>
```

```css
.navbar {
  height: 50px;
  width: inherit;
  max-width: inherit;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
}
.navbar__wrapper {
  width: 100%;
  max-width: 1289px;
}
```
