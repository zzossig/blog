---
title: "휴고 테마 커스터마이징 하기"
date: 2019-12-13T09:24:21+09:00
description: 휴고에서 테마 커스터마이징 하기 추천 방법
tags:
- hugo
series:
- hugo
categories:
-
image: images/feature1/design.png
---

## layouts 폴더

휴고로 사이트를 만들고 테마를 막 적용 하신 상태라면, 자신의 루트 디렉토리에 있는 layouts라는 폴더는 빈 폴더일 겁니다. 테마의 layouts 폴더에는 여러 파일들이 있을겁니다. 이 폴더에 있는 파일들이 화면에 렌더링됩니다. 테마를 커스터마이징 하려면 내가 어떤 부분을 수정하고 싶은지 알아야 겠죠? 그래서 휴고의 기본 폴더 구조는 알고 있어야 layouts 폴더의 어느 부분을 고쳐야 할 지 찾을 수 있을겁니다. 굵직한 메인 파일만 말씀드리자면,

1. layouts/index.html => 홈 페이지
2. layouts/_default/baseof.html => 기본이되는 템플릿 페이지인데 커스터마이징 할 때 건드실 일은 없을것 같아요.
3. layouts/_default/list.html => 리스트 페이지
4. layouts/_default/taxonomy.html => tags, series, categoreis 리스트 페이지
5. layouts/_default/single.html => 포스팅 글이 있는 뷰페이지
6. layouts/partials => 이 partials 폴더에 있는 파일들을 위에 안급한 파일에 import하고 짜깁기하여 화면이 구성됩니다. 사실 커스터마이징을 위해 이 폴더가 제일 중요합니다.

## Overriding이 핵심

위에 언급한 layouts 폴더는 themes/zzo 폴더에도 있고, 루트 폴더에도 있을겁니다. 루트 폴더에 있는 layouts는 아마도 빈 폴더일거구요. 이 루트 폴더의 layouts에 Zzo 테마에 있는 파일 경로와 똑같은 경로로 파일을 만들어 주면, 휴고는 루트폴더에 있는 파일을 바라보게 됩니다. 이것을 휴고에서 lookup order라고 하더군요.

예를들어보죠. 사이드바에 있는 bio 컴포넌트를 컴포넌트를 커스터마이징 하려면, themes/zzo/partials/sidebar/site-bio.html 파일의 내용을 복사해서 root/partials/sidebar/site-bio.html 파일을 만들어 붙여넣기 하고, 해당 파일을 원하는 대로 수정하면 됩니다.

## Overriding 하는 이유

theme폴더에 있는 파일을 그냥 수정하면 안되냐구요? 물론 됩니다. 근데 이 폴더를 건드시게 되면, 나중에 테마 제작자가 해당 테마의 버그를 수정하거나 새로운 기능을 추가 했을 때, 내 사이트에 적용된 테마를 업데이트 하는게 어려워집니다. 그래서 웬만하면 root/layouts 폴더에 파일을 만들어 오버라이딩 하는게 좋습니다.

## 스타일링

커스터마이징의 이유는 스타일을 좀 변경하고 싶기 때문 일 겁니다. 사실 휴고 테마마다 커스터마이징 방식이 다 달라서 어떻게 커스터마이징 해야 할지는 해당 테마의 레포에서 README.md 파일을 읽어보셔야 합니다.

Zzo 테마에서 제공하는 커스터마이징을 간단하게 말씀드릴게요. 

1. 우선 root/config/_default/params.toml 파일에 있는 설정값들을 변경해서 커스터마이징 할 수 있습니다. 설정 파라미터 이름 자체가 의미를 담고 있어서 대략 뭐하는 설정값인지 짐작이 가실거라 생각합니다.

2. 커스텀 css 파일을 넣으려면 README.me의 [custom_css](https://github.com/zzossig/hugo-theme-zzo/blob/master/README.ko.md#custom-css) 부분을 참고해주세요

3. 커스텀 폰트를 사용하려면, root/layouts/head/custom-head.html 파일을 만드시고 그곳에 원하는 구글 폰트를 불러오면 됩니다.