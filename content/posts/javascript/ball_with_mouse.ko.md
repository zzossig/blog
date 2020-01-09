---
title: "자바스크립트 Canvas로 공튀기기"
date: 2020-01-09T11:13:32+09:00
description: canvas로 공튀기는 게임 만들기, canvas가 뭔지 알아보기
draft: false
hideToc: false
enableToc: true
enableTocContent: false
tags:
- canvas
series:
-
categories:
-
featured_image: feature4/Flipboard.png
---

## canvas?

canvas가 HTML5에서 도입되었다는 것은 익히 알고 있었지만, canvas가 뭐에 쓰는 건지 몰라 답답하던 차에 알아보게 되었다.

canvas는 그 이름에서 암시하듯, 브라우저 화면에 canvas가 차지하는 영역을 자바스크립트를 통해 그림을 그릴 수 있게 해 준다.

## canvas 문맥 만들기

그림을 그리기 위한 첫번째 단추로, 우선 도화지(canvas)를 준비해보자. canvas는 HTML5에서만 동작하기 때문에, 이에 맞게 HTML 파일을 만들어야 한다.

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
	<meta content="utf-8" http-equiv="encoding">
</head>

<body>
<canvas id="gameCanvas" width="400" height="300"></canvas>

<script>
var canvas, canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
}

</script>

</body>
</html>
```

- 위의 코드는 HTML5의 기본 태그와 정보를 넣었고
- canvas태그를 통해 그림을 그릴 영역을 지정했으며
- script를 통해 해당 canvas 태그에 그림 그릴 준비를 마쳤다.

## canvas로 동그라미 그리기

위의 기본 세팅을 했으면 실제로 동그라미를 한번 그려보자. 위의 자바스크립트에서 `window.onload`함수 안의 내용을 계속 이어서 작성해보자.

{{< highlight javascript "linenostart=17" >}}
...
canvasContext.fillStyle = '#123456';
canvasContext.fillRect(0,0, canvas.width, canvas.height);

canvasContext.fillStyle = 'white';
canvasContext.beginPath();
canvasContext.arc(100,100, 10, 0,Math.PI*2, true);
canvasContext.fill();
{{< / highlight >}}

위의 코드를 추가해 실행해 보면 canvasContext를 통해 그림을 그릴 수 있음을 볼 수 있다. `18~19`번 줄은 canvas의 배경색을 칠하는 코드고 `20~23`줄은 canvas에 동그라미를 그려준다.

{{< img src="/images/javascript/draw-ball.png" title="canvas 동그라미 그리기" caption="정적인 도형 생성" alt="canvas 동그라미" width="250px" height="250px">}}

## 반복해서 그리기

자바스크립트로 그림을 그릴 수 있으니, 반복해서 그리는 것도 가능하다. `for`나 `while`문을 이용하던가, 아니면 `setInterval`함수를 사용하면 된다.

```javascript
var ballX = 75;

var canvas, canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
}

function updateAll() {
	ballX += 5;

	canvasContext.fillStyle = '#123456';
	canvasContext.fillRect(0,0, canvas.width, canvas.height);

	canvasContext.fillStyle = 'white';
	canvasContext.beginPath();
	canvasContext.arc(ballX,100, 10, 0,Math.PI*2, true);
	canvasContext.fill();
}
```

이제 동그라미가 캔버스 안에서 움직이는 모습을 볼 수 있다.

## 경계에서 반대로 튕기기

공을 반복해서 그리면, 공이 움직이는 것을 확인할 수 있다. 만약 경계 설정을 해주지 않으면, 공이 사라지게 될 것이다. 다음과 같이 경계를 설정해주자.

```javascript
var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 7;

var canvas, canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
}

function updateAll() {
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if(ballX < 0) {
		ballSpeedX *= -1;
	}
	if(ballX > canvas.width) {
		ballSpeedX *= -1;
	}
	if(ballY < 0) {
		ballSpeedY *= -1;
	}
	if(ballY > canvas.height) {
		ballSpeedY *= -1;
	}

	canvasContext.fillStyle = '#123456';
	canvasContext.fillRect(0,0, canvas.width, canvas.height);

	canvasContext.fillStyle = 'white';
	canvasContext.beginPath();
	canvasContext.arc(ballX,ballY, 10, 0,Math.PI*2, true);
	canvasContext.fill();
}

```

## 코드 리팩토링

이제 함수를 관심사 별로 분리시키고 깔끔하게 정리하여 다음과 같은 코드로 작성할 수 있다.

```javascript
var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 7;

var canvas, canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if(ballX < 0) {
		ballSpeedX *= -1;
	}
	if(ballX > canvas.width) {
		ballSpeedX *= -1;
	}
	if(ballY < 0) {
		ballSpeedY *= -1;
	}
	if(ballY > canvas.height) {
		ballSpeedY *= -1;
	}
}

function drawAll() {
	colorRect(0,0, canvas.width,canvas.height, 'black'); // clear screen

	colorCircle(ballX,ballY, 10, 'white'); // draw ball
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, 10, 0,Math.PI*2, true);
	canvasContext.fill();
}
```