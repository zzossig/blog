---
title: "Docker란?"
date: 2019-12-20T14:56:31+09:00
description: Docker는 뭐고 왜 쓰는가
tags:
- docker
series:
- docker
categories:
- 란?
image: images/feature1/docker.png
---

## Docker를 이야기 하기 전에

### 🤔좋은 프로그램이란 뭘까?

여러분은 좋은 프로그램이란 뭐라고 생각하시나요? 가장 기본적으로, 해당 프로그램이 목적에 맞는 역할을 잘 수행 한다면 좋은 프로그램이라 할 수 있겠죠. 그러나, 이러한 관점은 프로그램을 사용하는 사람의 입장에 국한되어 있습니다.

세상에 버그 없는 프로그램은 없다고 말하곤 하죠. 프로그램을 만들고 유지, 보수하는 개발자의 입장에선 프로그램이 목적에 맞게 역할을 수행하는 것은 당연한 것이고, 그 프로그램을 **잘** 관리하는게 중요해 보입니다. 한번 생각해보세요. 프로그래밍과 관련된 일 중에서, 새로 시작하는 프로젝트와, 이미 진행된 프로젝트를 유지, 보수하는 비율이 어느정도 될까요? 아마 프로젝트를 유지, 보수하는데 훨~~씬 더 많은 시간과 노력이 들지 않을까요? 뭐 당연한 소리죠.

### 🐋유지, 보수를 잘하려면?

좋은 프로그램란 유지, 보수를 잘 할 수 있는 프로그램이 라는건 어느정도 명백해 보입니다. 그렇다면 어떻게? 라는 질문을 할 수 있겠죠. 어떤 프로그램이 유지, 보수 하기 좋을까요? 

사실 이 주제에 대한 좋은 책도 많이 있고, 사람마다 자신만의 <u>*철학*</u>이 있기 마련이죠. 이 포스트는 이 주제에 대한게 아니기 때문에, 일일이 저의 철학을 나열하지는 않겠습니다. 도커와 관련된 딱 하나만, <u>*모듈*</u>이라는 개념만 살펴보죠.

## 모듈?

### 🐋모듈의 개념

프로그래밍 세계에서 모듈이이라는 단어가 딱 떨어지는 뭐다 라고 말하기엔 좀 애매한 추상적인 성질이 있는것 같습니다. 저는 모듈이란, 모듈을 조립해서 프로그램을 만드는것 이라고 이해하고 있습니다. 

이해하기 쉽게 비유를 들어보죠. 컴퓨터를 조립하려면 부품이 있어야겠죠? 대충 CPU, 램, SSD, 그래픽카드, 마더보드, 주변기기로 모니터, 마우스 등등이 있겠죠. 이런 컴퓨터 부품을 조립하면 컴퓨터를 사용할 수 있게 되죠? 여기서 컴퓨터가 프로그램 이라면, 컴퓨터 부품은 모듈이라고 볼 수 있겠군요.

### 🐋모듈과 유지, 보수의 관계

어떤 프로그램이 여러 모듈을 조립해서 만든 것이라면 그 프로그램을 유지, 보수하는게 쉬워집니다. (물론 프로그램을 처음에 모듈화 하고 구조 잡아가는건 어렵겠죠.)

1. 필요 없는 모듈이 있다면, 쉽게 제거할 수 있다.
2. 필요한 모듈이 있다면, 쉽게 추가 할 수 있다.
3. 문제가 있는 부분은, 해당 부분만 테스트 해보면 된다.
4. 프로그램의 덩치가 커질수록, 모듈화가 빛을 발한다. (왜냐하면, 코드가 스파케티처럼 엉켜있지 않기 떄문에.)

## 서비스

### 🐋프로그램을 조립하면?

모듈을 조립하면 프로그램이 된다고 했습니다. 그럼 프로그램을 조립하면? 서비스가 되겠죠. 뭐 굵직하게 네이버 검색서비스, 카카오톡 메시징 서비스 등등 모든 서비스가 프로그램을 조립해서 만들었겠죠?

### 🐋서비스의 구성?

서비스를 만들기 위해서는 여러가지 프로그램을 사용해야 됩니다. 데이터베이스를 쓰고자 한다면 DB를 돌리는 서버(프로그램)이 있어야 겠죠? 웹페이지를 세상에 공개하려면, 웹 페이지를 serve 하는 서버(프로그램)도 있어야겠죠? 서비스의 규모가 커지면 돌려야하는 프로그램이 엄청 많아질 겁니다. Stackshare라는 사이트에서 [Reddit](https://stackshare.io/reddit/reddit)이 어떤 프로그램을 조립한 서비스인지 살펴보세요. 하나의 서비스를 만들기 위해 많은 프로그램을 사용하고 있는 걸 볼 수 있습니다.

이 모든 프로그램을 내 윈도우 컴퓨터에 깔고, 그걸 어떻게 잘 조립해서 서비스를 제공한다고 생각 해보세요. 물론 이게 불가능 한 건 아닙니다. 문제는, 이렇게 서비스를 만들면 위에서 저희가 살펴봤던 모듈화의 장점을 전혀 누릴 수가 없게 됩니다.

## 도커 등장

서론이 너무 길었습니다. 도커가 왜 필요한가? 에 대한 저의 대답은, 가장 간단히 말해서 프로그램 돌리는걸 **모듈화** 해서, 서비스의 유지, 보수를 쉽게하고 시간낭비를 줄여서, 돈이 많이드는 인적 자원에 대한 낭비를 줄이겠다 라는게 제 생각입니다.

### 🐋모듈화 해야하나?

모듈화의 장점은, 프로그램의 덩치가 작을 때는 잘 느껴지지 않아요. 우리가 토이 프로젝트로 뭐 블로그같은걸 만든다거나 할때는 굳이 모듈화니 뭐니 필요없습니다. 그냥 대충만드셔도 되고, 도커도 필요없고 테스트 코드니 뭐니, 남들이랑 협업해서 일을 진행할 일도 없을것이기 때문에, 나만 이해 할 수 있는 선에서 프로그램을 짜도 문제 없다고 생각합니다. 다만, 규모가 큰 프로그램을 다룰 일이 있다면, 작은 규모의 토이 프로젝트에서도 모듈화하는 습관을 가지고 연습하는게 현명한 선택이 될 수도 있을 것 같아요.

### 🐋프로그램 모듈화의 장점?

그리고 프로그램 돌리는걸 모듈화 할 경우, 부수적으로 따라오는 이득이 많이 있습니다. 프로그램이 돌다가 갑가지 죽는경우가 발생할 수 있겠죠? 도커로 여러개의 프로그램을 돌리면 됩니다. 프로그램이 죽으면 살아있는놈을 대신 쓰면 되겠죠. 특정 시간대에만 사람이 몰리는 서비스라면? 도커로 해당 프로그램을 트래픽에 따라 동적으로 늘리면 됩니다. 도커는 독립적인 환경에서 실행되고, 도커가 다른도커와 커넥션이 있으려면, 도커 실행시 이를 명시해 주어야 하기 때문에, 프로그램이 스파게티 코드처럼 엉킬 일도 없고, 프로그램마다 의존 관계를 확실히 할 수 있어 유지, 보수도 쉬워집니다. 또 도커는 리눅스뿐만 아니라 윈도우에서도 돌아가기 때문에, 원하는 서비스를 다른 os로 쉽게 이식 할 수도 있습니다.