<div align="center">

# 🐧

<img src="https://img.shields.io/badge/Typescript-v4.3.2-blue?logo=typescript"/>
<img src="https://img.shields.io/badge/React-v17.0.2-skyblue?logo=React"/>
<img src="https://img.shields.io/badge/eslint-^7.11.0-blueviolet?logo=eslint">
<img src="https://img.shields.io/badge/webpack-^5.51.1-skyblue?logo=webpack">
<img src="https://img.shields.io/badge/emotion-^11.6.0-hotpink?logo=emotion"><br/>
<img src="https://img.shields.io/badge/firebase-^9.6.6-yellow?logo=firebase">
<img src="https://img.shields.io/badge/node.js-v14.18.1-green?logo=Node.js"/>
<img src="https://img.shields.io/badge/express-^4.17.2-lightgray?logo=express">
<img src="https://img.shields.io/badge/mongodb-v5.0.3-brightgreen?logo=mongodb"/>

</div><br/>

## 🐧 Pengterest is ...
- 본 프로젝트는 Pinterest의 레이아웃을 clone 하여 진행한 개인 프로젝트입니다.
- Pinterest의 레이아웃 clone에 집중하였으며 기능 구현은 간소화하여 주요 기능만 구현했습니다.
- 그 외 기술적인 부분 혹은 기록하고 싶은 부분은 [Pengterest Wiki](https://github.com/1998YUKI0331/Pengterest/wiki)에 정리했습니다.

<br/>

## 🐧 Feature & Preview
|로그인 페이지|메인 페이지|
|:--:|:--:|
|![image](https://user-images.githubusercontent.com/67870795/154268463-3116b7a3-c313-4f47-8840-91a9fa1a8f40.png)|![image](https://user-images.githubusercontent.com/67870795/154271169-449b7f9e-4799-438c-96f2-bfc775fb5217.png)|

|검색창 클릭|Pin 상세 보기|
|:--:|:--:|
|![image](https://user-images.githubusercontent.com/67870795/154268837-ddeb5191-47cd-46d5-b480-50d3d51876d0.png)|![image](https://user-images.githubusercontent.com/67870795/154797050-80b43255-b9ea-4855-a692-7379ec6e2ad6.png)|

|마이 페이지 (저장/생성 Pin)|Pin 추가 페이지|
|:--:|:--:|
|![image](https://user-images.githubusercontent.com/67870795/154269789-38b4af4a-13f6-4be0-9f15-304d4c7a8f1a.png)|![image](https://user-images.githubusercontent.com/67870795/154269985-4d8292d3-8d3a-4087-bcce-191edd925289.png)|


<br/>

## 🐧 How to run
1. MongoDB에 사용자를 생성해줍니다.
```bash
use yuki
db.createUser({user: "yuki", pwd: "1234", roles:["readWrite", "userAdmin"]})
mongo yuki -u yuki -p 1234
```
2. 프로젝트를 clone 한 뒤, 필요 모듈을 install 해주고 실행시켜줍니다.
```bash
git clone https://github.com/1998YUKI0331/Pengterest.git
npm install
npm run dev      #localhost:3000
```
3. bash를 하나 더 실행시키고 server 폴더로 이동한 뒤 실행시켜줍니다.
```bash
cd server
node index.js    #localhost:8080
```
<br/>
