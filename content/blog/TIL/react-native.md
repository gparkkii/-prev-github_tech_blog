---
title: '[TIL-1] React-Native란 무엇인가?'
date: 2021-5-27 13:21:13
category: 'TIL'
draft: false
---

# All about React Native

---

## React Native란?

> 💡 React-Native는 자바스크립트로 iOS와 Android를 동시에 개발하고 빌드할 수 있는 네이티브 모바일 애플리케이션 프레임워크입니다.

---

## RN Pros & Cons

### 장점

- **높은 재사용성** : 작성된 코드 대부분 플랫폼 간의 공유가 가능해서 iOS, Android를 동시에 개발 할 수 있다.
- **Fast Refresh** : 변경된 코드를 저장하기만 해도 자동으로 변경된 내용이 화면에 적용된다. 이 기능으로 `수정 > 컴파일 > 새로고침` 등의 작업을 생략하고 불필요한 작업시간을 줄일 수 있다.
- **성능 저하 문제점 해결** : 작성된 코드에 따라 각 플랫폼에 알맞은 네이티브 엘리먼트로 전환되기 때문에 큰 성능 저하 없이 개발이 가능하다.
- **쉬운 접근성** : 모바일에 대한 개발 지식이 없어도 자바스크립트만 알고 있으면 쉽게 시작할 수 있다.

### 단점

- **신기능 업데이트 이슈** : `RN(React Native)`이 네이티브 코드로 전환된다는 장점은 있으나 각 애플리케이션 개발에 있어 새로운 기능이 나올 시 리액트 네이티브가 이를 지원하기까지 기다려야된다는 단점이 있다.
- **유지보수 및 디버깅 한계** : 디버깅과 유지보수가 쉬운 `React`와 달리 `React Native`는 디버깅이 어려워 개발 단계에서 문제가 생겼을 때 문제의 원인을 찾기까지 많은 시간이 소요된다.
- **잦은 업데이트** : 한두달 사이에도 업데이트가 자주 이뤄지기 때문에 버그를 수정하고 기능을 추가하는데는 긍정적이지만 너무 잦은 업데이트가 개발에 방해가 되기도한다.

---

## 리액트 네이티브의 동작방식

### Bridge

리액트 네이티브가 네이티브 코드로 변환되는 과정에는 `Bridge`가 필요하다.

리액트 네이티브에는 자바스크립트 코드를 이용해서 네이티브 계층과 통신할 수 있도록 연결해주는 역할의 `브릿지(bridge)`가 있다.

<br/>
<div align="center">
    <img src="https://user-images.githubusercontent.com/71811780/119750649-b8573800-bed4-11eb-9c24-acc9c413dd19.png" alt="bridge">
</div>
<br/>

- `JavaScript Thread` : 자바스크립트의 코드가 실행되는 장소 *(보통 리액트 코드로 구성되어있다.)
- `Native` : 네이티브 계층 코드
  - `Main Thread` : `UI`를 담당하는 메인 스레드
  - `Shadow Thread` : 백그라운드 스레드로 레이아웃을 계산하는데 사용된다.
  - `Native Module` : 각 모듈의 자체 스레드

<br/>

다음 그림과 같이 `Bridge`가 자바스크립트 스레드에서 정보를 받아 네이티브로 전달하게 된다. 이렇게 `RN`이 기기와 통신하는 모든 자바스크립트의 기능을 분리된 스레드로 처리하면서 성능 향상을 가져온다.

### Virtual DOM

> 💡 Virtual DOM이란? 데이터가 업데이트 될 경우 자동으로 화면을 다시 그리는 가상의 DOM이다.

<div align="center">
    <img src="https://user-images.githubusercontent.com/71811780/119751398-11739b80-bed6-11eb-9800-d3e65f7d6024.png" alt="bridge">
</div>
<br/>

#### Virtual DOM Process

1. 데이터의 변화를 감지한다.
2. 변화된 데이터를 이용하여 가상 DOM을 그린다.
3. 가상 DOM과 실제 DOM의 차이를 파악한다.
4. 차이점이 있는 부분만 선별하여 실제 DOM에 적용한다.

**실제 DOM**은 화면에 나타나는, 즉 우리가 볼 수 있는 DOM이고
**가상 DOM**은 비교를 위해서만 존재하고 화면에 실제하지 않는 DOM이라고 생각하면 된다.

### JSX

> 💡 JSX란? 자바스크립트 확장 문법으로 XML과 유사하며 높은 가독성으로 리액트에서 많이 사용된다.

#### JavaScript vs JSX

- **JavaScript**

```javascript

'use strict';

function formatName(user) {
    return user.firstName + ' ' + user.lastName;
};

const user = {
    firstName: 'Ji Yeon',
    lastName: 'Park'
};

const element = /*#___PURE___*/ React.createElement(
    'h1',
    null,
    'Hello, ',
    formatName(user),
    '!'
)
```

- **JSX**

```jsx

function formatName(user) {
    return user.firstName + ' ' + user.lastName;
};

const user = {
    firstName: 'Ji Yeon',
    lastName: 'Park'
};

const element = <h1>Hello, {formatName(user)}!</h1>
```

두가지 예를 보면 JSX 코드의 뛰어난 가독성을 한 눈에 알아볼 수 있다.

또한 JSX는 바벨이 코드를 변환하는 과정에서 에러 부분을 감지하고 알려주기 때문에 에러 관리하기에도 더 편리하다.

---
