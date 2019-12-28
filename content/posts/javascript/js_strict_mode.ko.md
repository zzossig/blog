---
title: "자바스크립트 strict mode에 대해"
date: 2019-12-23T12:13:19+09:00
description: strict mode 쓰는법과 이유
tags:
- javascript
- programming
series:
- 
categories:
-
featured_image: feature2/angry-eye.png
---

참고: [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode)

### Javascript strict mode 사용하기

Javascript의 strict mode를 사용하려면 자바스크립트 파일 첫줄, 혹은 사용하고 싶은 위치에 `'use strict';`라는 string을 넣어주면 된다.

```javascript
'use strict'; // application-level strict mode
function strict() {  
  'use strict'; // function-level strict mode
}
```

### Strict mode를 사용하는 이유

Strict를 써주는 이유는, 잠재적으로 버그가 존재할 수 있는 코드를 강제적으로 허용하지 않겠다는 선언이다. 자바스크립트는 상당히 유연한 언어인데, strict mode를 사용하면 이 유연성이 많이 사라진다. 규모가 작은 프로그램은 디버깅이 어렵지 않기 때문에 굳이 strict mode를 사용하지 않아도 되지만, 규모가 커질수록 프로그램을 디버깅하는게 어려워지고, 사소한 실수 하나를 잡으려고 하루를 꼬박 샐 수도 있기 때문에, strict mode를 써서 유연성을 제약하는게 유용할 수 있다.

### 예 - 변수 선언

다음 코드는 자바스크립트에서 허용되는 문법이다. var, let, const가 없어도 변수를 선언할 수 있다.

```javascript
myVar = 1;

console.log(window.myVar);
```

다음 코드는 허용되지 않는다

```javascript
'use strict';

myVar = 1; // Reference Error
var undefined = 5; // Type Error, undefined는 예약어임
```

뭐 이런식이다.

### 결론

코드를 더 안전하고 견고하게 짜고싶고, 규모가 큰 프로젝트라면 strict mode를 사용하는게 좋다. 엄격모드와, 느슨한 모드의 차이첨을 모두 암기하고 있을 필요는 없다. 상식선에서, 그리고 쓰다보면 자연스럽게 익히게 될 것으로 보인다.