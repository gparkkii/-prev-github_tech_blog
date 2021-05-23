---
title: 'Webpack으로 React.js 개발환경 build하기 - 1. 프로젝트 시작하기'
date: 2021-5-23 16:21:13
category: 'react'
draft: false
---

## ✍🏻 Why Webpack?

### 👉 I love CRA

보통 리액트 애플리케이션을 만들 때 CRA (create-react-app)라는 잘 만들어진 리액트 boilerplate를 정석처럼 쓰곤합니다.

저도 직접 리액트 개발환경을 build하며 수많은 에러를 겪고 유지보수에 힘을 쏟는 대신 CRA로 많은 사이드 프로젝트들을 진행해왔습니다.

> #### 💡 Create-React-App 이란?
>
> CRA는 페이스북에서 만든 공식적인 React 웹 개발용 Boilerplate입니다. webpack과 babel등을 이용하여 file loader, build tools, es6 문법 지원, eslint, jest(테스트) 등 개발에 필요한 유용한 기능들을 npx create-react-app 이라는 명령어 한 줄로 다 제공하기 때문에 따로 리액트 개발환경을 구축하거나 설계할 필요가 없어 많은 개발자들이 애용하고 있습니다.

### 👉 CRA를 놔두고 웹팩을 사용하는 이유

개발해야하는 서비스의 규모가 커지거나 컴포넌트들의 양이 많아질수록 리액트 개발환경에 추가적인 설정을 해야되는 경우가 생깁니다. 이 때 리액트의 구조나 webpack, babel에 대한 이해도가 떨어지면 따로 설정을 추가할 때 많은 에러들과 맞닥뜨리며 멘붕상태를 겪게 됩니다.

CRA에서 'eject'라는 기능을 통해 따로 웹팩 설정을 할 수 있도록 도와주지만 'eject'를 수행하고 나면 다시 예전상태로 되돌릴 수 없고 모든 설정을 직접 유지보수하게 되면서 CRA의 장점인 one Build Dependency를 잃어버리게 됩니다.

또 CRA만을 고집하다보니 애플리케이션 개발은 쉽게 할지언정 리액트의 구조나 설정파일에 대한 이해도가 부족하다고 느껴졌습니다.

때문에 이번엔 애정하는 react application을 직접 webpack으로 build 해보기로 했습니다.

---

## 🤔 How? 어떻게 구현할까?

리액트를 처음 배울 당시 정말 얕게 webpack으로 리액트 개발환경을 구축해본 경험이 있었습니다.

개발환경 구축은 정말 작은 에러 하나에도 잘 어그러지기 때문에 긴장의 끈을 놓치지않고 에러없이 버그없이 개발해보자는 마음으로 웹팩 설정을 시작해보았습니다.

자세한 코드는 [**🔗react_webpack_template 깃허브**](https://github.com/gparkkii/react_webpack_template) 에서 확인 가능합니다.

#### ✅ react_webpack_template build 순서

1️⃣ npm init으로 프로젝트 생성
2️⃣ 기본 라이브러리 설치
3️⃣ webpack config 설정
4️⃣ 기타 자주 사용하는 설정 및 라이브러리 추가하기 (eslint, prettier, react-router-dom ...)

---

### 📝 1. 프로젝트 생성

우선 node 패키지 매니저를 통해 패키지 파일을 생성합니다.

```javascript
$ npm init
```

npm init을 터미널에 입력하면 아래의 항목을 입력받는 창이 뜨는데, 입력하지 않아도 실행에 문제는 없지만 저는 꼼꼼히 적어주도록 하겠습니다.

```javascript
name: 프로젝트 이름 (기본설정 : 현재 폴더명)
version: 현재 버전 (기본설정 : 1.0.0)
description: 프로젝트 설명
entry point: 프로그램 실행 파일 (기본설정 : index.js)
test command: 테스트를 하기 위한 명령어
git repository: git저장소
keywords: 프로젝트 키워드
author: 프로젝트 제작자
license: license (기본 설정 : ISC)
```

![](https://images.velog.io/images/gparkkii/post/586ed9e3-9689-4258-b70a-def18bd32384/code.png)

#### 🔎 dependencies

- 프로젝트 생성 후 `$ npm install ___`로 라이브러리를 설치하면 `dependencies`에 버전과 함께 설치됩니다.

#### 🔎 devDependencies

- 개발할 때에만 쓰이는 라이브러리는 `$ npm install -D ___` 명령어로 다운받아 `devDependencies`에 보관해줍니다.
- `devDependencies`에 보관된 라이브러리는 개발모드 (development mode)일 때만 사용되므로 트랜스파일러, 컴파일러 등의 라이브러리들을 보관해주는 것이 좋습니다.

#### 🔎 scripts

- `$ npm run ___`로 실행하게 될 스크립트를 작성해줍니다.
- 웹팩을 통해 실행될 스크립트들을 적어주면됩니다.

#### 🔎 package-lock.json

- `package-lock.json` 파일은 npm으로 라이브러리를 설치시 자동으로 생성됩니다.
- 의존성에 대한 정보를 가지고 있어 삭제하면 안되는 파일로 깃허브에 같이 커밋해야 합니다.

---

### 📝 2. 라이브러리 설치하기

#### \*️⃣ React Libraries

먼저 리액트에 필요한 라이브러리들을 다운받습니다.

```javascript
$ npm install --save react react-dom
```

- `react` ,`react-dom` : 리액트를 사용하기 위해 필수적으로 다운받아야하는 라이브러리입니다. `react-dom`은 리액트의 DOM및 render의 진입점 역할을 합니다.

#### \*️⃣ Babel Libraries

#### 🔎 바벨(Babel)이란?

바벨은 자바스크립트 트랜스파일러로 최신 자바스크립트 문법을 구형 브라우저에서도 돌 수 있도록 코드 자체를 변환시켜줍니다.

바벨 설정을 위한 라이브러리들을 다운받습니다.

```javascript
$ npm install --save @babel/core @babel/preset-env @babel/preset-react babel-loader
```

- `@babel/core` : Babel의 핵심 의존성 라이브러리입니다.
- `@babel/preset-env` :  ES 버전을 지정하지 않아도 바벨이 자동으로 탐지해 컴파일 해줍니다.
- `@babel/preset-react` : 바벨을 리액트에서 사용 가능하게합니다. JSX로 작성된 코드를 createElement 함수를 이용한 코드로 변환시켜주는 preset입니다.
- `babel-loader` : babel과 webpack을 사용해 자바스크립트 파일을 컴파일 하는것으로 웹팩에서 바벨을 로드할 때 이 로더를 사용합니다.

#### \*️⃣ Webpack Libraries

#### 🔎 웹팩(Webpack)이란?

웹팩이란 최신 프론트엔드 프레임워크에서 가장 많이 사용되는 모듈 번들러(Module Bundler)입니다. 웹 애플리케이션을 구성하는 자원(HTML, CSS, Javscript, Images 등)을 모듈로 번들링해서 하나의 결과물로 나타냅니다.

![](https://images.velog.io/images/gparkkii/post/6decc309-3cd0-44a1-87c2-5e88f4ebcc4e/webpack.png)

웹팩 설정을 위한 라이브러리들을 다운받습니다.

```javascript
$ npm install --save webpack webpack-cli webpack-dev-server html-webpack-plugin @pmmmwh/react-refresh-webpack-plugin webpack-bundle-analyzer
```

- `webpack` : 웹팩 모듈 번들러 라이브러리
- `webpack-cli` : Webpack v4.0.1 이상에서 필요한 커맨드라인 인터페이스입니다.
- `webpack-dev-server` : 애플리케이션 개발 서버를 제송해줍니다.
- `webpack-bundle-analyzer` : 번들의 구성사항을 한번에 볼 수 있는 도구입니다. 어떤 구성이 bundle 크기를 얼마나 차지하는지 한 눈에 확인할 수 있기 때문에 이를 통해 Webpack 설정을 수정하거나 라이브러리 교체등을 고려해볼 수 있습니다.
- `html-webpack-plugin` : 번들링된 파일을 참조하는 HTML을 빌드 과정에서 함께 생성합니다.
- `MiniCssExtractPlugin`: CSS파일을 청킹하여 옵션으로 지정한 디렉토리에 생성합니다.
- `clean-webpack-plugin` : 번들링을 할 때마다 이전 번들링 결과를 제거
- `ManifestPlugin`: 빌드된 번들링 결과물에 대한 정보를 manifest.json파일로 저장하여 관리합니다. 번들링할 때마다 번들 파일의 이름이 바뀌는 경우 참조에 문제가 생길 수 있는데 이를 해결합니다.
- `@pmmmwh/react-refresh-webpack-plugin` : 코드를 수정할 경우 새로고침 하지않고, 수정된 사항을 빠르게
  교체해주는 라이브러리입니다.

---

> 참고

- https://egg-programmer.tistory.com/259?category=915627
- https://p-iknow.netlify.app/front-end/react-webpack-config
