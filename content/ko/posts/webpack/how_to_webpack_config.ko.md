---
title: "Webpack 설정파일 들여다 보기"
date: 2019-12-19T11:51:31+09:00
description: Webpack을 실제로 사용해보자.
tags:
- webpack
series:
- webpack
categories:
-
image: images/feature1/webpack-config.png
---

## Webpack, 들어는 봤는데...

사실 리액트 프로젝트를 진행하면서, Webpack을 만질 기회가 많이 없는게 사실입니다. 보통 Create React App(cra)로 프로젝트를 시작하거나, Next.js, Gatsby,js 등등의 프레임웤을 이용해 프로젝트를 만들게 되죠. 이 경우, 보통 Webpack이 프레임워크 내에 기본적으로 설정되어 있기 때문에, Webpack 설정을 크게 고칠 이유가 별로 없습니다. 

저의 경우 Webpack이라고 하면 그냥 막연하게만 느껴졌어요. 그래도 웹팩은 프로젝트의 핵심 부분이고 적어도 컨셉과 개념정도는 알아야겠기에 간단하게나마 웹팩을 사용해 보았습니다. 

## 웹팩 설정 파일

### 파일 출력 부분

```javascript
const path = require('path');

module.exports = {
  entry: {
    'index': './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: ''
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    index: 'index.html',
    port: 9000
  },
  ...
};
```

1. entry: single page application의 경우, 하나의 엔트리 지점이 존재하겠죠. 저의 경우는 src 폴더에 있는 index.js 파일이 프로젝트의 소스가 모이는 지점입니다. 이곳에 다른 파일들을 import 하여 프로젝트를 만들어 나가겠죠.

2. output: 웹팩이 모든 소스파일들을 조립하여 하나의 번들 파일을 만들어낼 때, 파일 이름은 뭘로 할지, 어느 경로에 파일을 만들어 낼지 등을 설정합니다. [name]부분은 entry 부분의 파일 이름이 들어가는 자리입니다. __dirname은 현재 프로젝트의 루트 경로를 node 환경에서 기본적으로 제공하는 변수인 듯 합니다. 저의 경우 output으로 만들어 지는 파일은 root경로/dist/index.bundle.js 가 되겠군요.

3. mode: 웹팩이 번들 파일을 만들어 낼 때, mode가 production이면 minify를 진행합니다. 자바스크립트 파일명에 *.min.js라는 파일명 많이 보셨죠? 이런 파일명을 가진 자바스크립트 파일은 불필요한 공백을 없애서 파일 용량을 최소화 한 것이죠. 웹팩은 최적화된 번들 파일을 만들어 주는 역할도 해줍니다.

4. devServer: 웹팩에서 제공하는 devServer를 이용하면, 빌드를 따로 하지 않더라도 개발하면서 실시간으로 바뀌는 내용들을 브라우저에서 확인할 수 있습니다.

### 모듈 설정 부분

```javascript
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: [
            'file-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
            'style-loader', 'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [ 'stage-0' ]
            }
        }
      }
    ]
  },
  ...
};
```

1. rules 배열 안에 필요한 모듈이 있으면 하나씩 추가해 나가면 됩니다. 공식 홈페이지에 rules 안에 들어갈 내용이 통째로 나와있어서 그냥 복붙하면 될 것 같아요.

2. 저의 경우, 파일 로더, 스타일 로더, 바벨 로더를 사용하고 있는데, 위의 entry point로 지정한 index.js 파일에서 다음과 같이 사용할 수 있게 해줍니다.

    ```javascript
    import "myScss.scss"
    import myImage from "./myImage.png"

    // 또한 babel-loader에 의해 ES6 문법을 사용할 수 있게 된다.
    const myData = { a: 1, b: 2, c: 3}
    const { a, b } = myData;
    ```

3. 물론 해당 로더들을 package.json 파일에 추가해 주어야 합니다. 

    ```shell
    yarn add babel-loader ...
    ```

### 플러그인 부분

```javascript
module.exports = {
  ...
  const TerserPlugin = require('terser-webpack-plugin');

  plugins: [
    new CleanWebpackPlugin('dist'),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
```

1. 모듈이 소스 코드에 영향을 미친다면, 플러그인은 빌드 과정에 대한 것인듯.

2. CleanWebpackPlugin: 빌드시, 이전에 만들어진 dist 폴더에 남아있는 번들 파일들을 삭제해 줍니다.

3. TerserPlugin: javascript를 minify 시켜준다고 합니다. 예를들어 lodash라는 라이브러리를 import 해서 debounce 라는 함수만을 사용한다고 가정해 보겠습니다. debounce를 제외한 다른 함수들은 사용하지 않으므로, Terser Plugin이 lodash의 다른 함수들을 제외시켜 만들어지는 번들의 용량을 많이 줄일 수 있습니다.

## 결론

Webpack을 어느정도 사용은 할 수 있을것 같습니다. 그러나 최적화 측면에서 그냥 남들이 잘 만들어 놓은 기본 설정을 그냥 가지고 와서 쓰고, 필요한게 따로 있으면 하나씩 추가해주는게 정신건강에 이로울 것 같다는 생각이 듭니다. 옵션이나 부가적으로 설정해 주어야 하는게 많으므로, 이 많은 설정값들을 하나하나 자세히 알려면 시간이 많이 걸리겠죠. 정말 관심이 많지 않고서야 이걸 굳이?