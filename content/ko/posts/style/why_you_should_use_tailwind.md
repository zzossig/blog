---
title: "TailwindCSS를 쓰는 이유"
date: 2020-10-21T09:13:42+09:00
description: TailwindCSS는 왜쓰는 것일까?
draft: false
hideToc: false
enableToc: false
enableTocContent: false
tocPosition: outer
tags:
- style
series:
-
categories:
- 란?
# image: images/feature5/brick-wall.png
---

1. TailwindCSS의 모토중 하나는 스타일을 커스터마이징하기 쉽게 한다 이다. 기존의 부트스트랩 같은 CSS프레임워크는 이미 만들어져 나온 스타일 클래스를 가져다 썼지만 TailwindCSS에서는 내가 직접 스타일을 입혀줘야 한다.
2. 그래서 TailwindCSS는 inline로 스타일을 주는 것과 굉장히 유사한 형태를 띈다.
    ```TailwindCSS.html
    <div class="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl">
      <div class="flex-shrink-0">
        <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
      </div>
      <div class="ml-6 pt-1">
        <h4 class="text-xl text-gray-900 leading-tight">ChitChat</h4>
        <p class="text-base text-gray-600 leading-normal">You have a new message!</p>
      </div>
    </div>
    ```
    ```Inline-CSS.html
    <div class="max-width: 500px; margin-left: auto; margin-right: auto;...">
      
    </div>
    ```
3. Inline으로 스타일을 줄 때와 비교해서 TailwindCSS는
    - 스타일에 제약을 가한다. 틀을 제공한다는 말이다. 예를들어 폰트의 색상을 `#424242`처럼 하드코딩하는게 아니라, `text-gray-900` 처럼 쓸 수 있게 해줘서 일관된 style을 프로젝트 전체적으로 유지하기 쉽게 해준다. 그리고 폰트 색상을 `#424242`였지 로 기억하는 것 보다 `gray-900`의 문자로 기억하는 편이 더 쉽다.
    - Inline으로는 `:hover, :focus` 등의 Pseudo-classes를 쓸 수 없다.
    - Inline으로는 화면을 반응형으로 만들 수 없다.
4. 기존의 방식처럼, CSS 파일에서 스타일을 바꾸게 되면 프로젝트 전체에 어떤 영향을 줄 지 추적하는게 힘들다.(CSS는 전역적(global)으로 적용되니까.) 그러나 TailwindCSS는 지역적(local)이다. Tag의 class에서 스타일을 조합하기 때문이다(`<div class="text-xl ...">`). 그래서 스타일을 변경시 다른쪽 스타일이 고장날까봐 걱정하지 않아도 된다.
5. 가장 중요한 것은, 스타일 관련 파일의 용량이 고정된다는 것이다. 보통 프로젝트가 커질수록 수많은 컴포넌트를 만들게 되고, 수많은 중복된 CSS 클래스를 만들게 되는데, 그런 비효율을 겪지 않아도 된다.
6. TailwindCSS를 쓰면 당신은 브라우저 별 스타일을 신경쓰지 않아도 된다. TailwindCSS(가 쓰는 PostCSS)가 다 알아서 적용해준다.
    ```Traditional.css
    .reveal a {
      -webkit-transition: color .15s ease;
      -moz-transition: color .15s ease;
      transition: color .15s ease;
    }
    ```
    ```TailwindCSS.css
    .reveal a {
      transition: color .15s ease;
    }
    ```
7. TailwindCSS는 PurgeCSS를 사용하고 있다. PurgeCSS는 나의 프로젝트에서 사용하지 않는 스타일들을 제거해준다. 불필요한 CSS 클래스가 제거된다는 말이다. 아직 제대로 사용해보지 않아 얼마나 용량을 save할 수 있을지 확인해 봐야겠다.