<div align="center">

# ๐ง

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

## ๐ง Pengterest is ...
- ๋ณธ ํ๋ก์ ํธ๋ Pinterest์ ๋ ์ด์์์ clone ํ์ฌ ์งํํ ๊ฐ์ธ ํ๋ก์ ํธ์๋๋ค.
- Pinterest์ ๋ ์ด์์ clone์ ์ง์คํ์์ผ๋ฉฐ ๊ธฐ๋ฅ ๊ตฌํ์ ๊ฐ์ํํ์ฌ ์ฃผ์ ๊ธฐ๋ฅ๋ง ๊ตฌํํ์ต๋๋ค.
- ๊ทธ ์ธ ๊ธฐ์ ์ ์ธ ๋ถ๋ถ ํน์ ๊ธฐ๋กํ๊ณ  ์ถ์ ๋ถ๋ถ์ [Pengterest Wiki](https://github.com/1998YUKI0331/Pengterest/wiki)์ ์ ๋ฆฌํ์ต๋๋ค.

<br/>

## ๐ง Feature & Preview
|๋ก๊ทธ์ธ ํ์ด์ง|๋ฉ์ธ ํ์ด์ง|
|:--:|:--:|
|![image](https://user-images.githubusercontent.com/67870795/154268463-3116b7a3-c313-4f47-8840-91a9fa1a8f40.png)|![image](https://user-images.githubusercontent.com/67870795/154271169-449b7f9e-4799-438c-96f2-bfc775fb5217.png)|

|๊ฒ์์ฐฝ ํด๋ฆญ|Pin ์์ธ ๋ณด๊ธฐ|
|:--:|:--:|
|![image](https://user-images.githubusercontent.com/67870795/154268837-ddeb5191-47cd-46d5-b480-50d3d51876d0.png)|![image](https://user-images.githubusercontent.com/67870795/154797050-80b43255-b9ea-4855-a692-7379ec6e2ad6.png)|

|๋ง์ด ํ์ด์ง (์ ์ฅ/์์ฑ Pin)|Pin ์ถ๊ฐ ํ์ด์ง|
|:--:|:--:|
|![image](https://user-images.githubusercontent.com/67870795/154269789-38b4af4a-13f6-4be0-9f15-304d4c7a8f1a.png)|![image](https://user-images.githubusercontent.com/67870795/154269985-4d8292d3-8d3a-4087-bcce-191edd925289.png)|


<br/>

## ๐ง How to run
1. MongoDB์ ์ฌ์ฉ์๋ฅผ ์์ฑํด์ค๋๋ค.
```bash
use yuki
db.createUser({user: "yuki", pwd: "1234", roles:["readWrite", "userAdmin"]})
mongo yuki -u yuki -p 1234
```
2. ํ๋ก์ ํธ๋ฅผ clone ํ ๋ค, ํ์ ๋ชจ๋์ install ํด์ฃผ๊ณ  ์คํ์์ผ์ค๋๋ค.
```bash
git clone https://github.com/1998YUKI0331/Pengterest.git
npm install
npm run dev      #localhost:3000
```
3. bash๋ฅผ ํ๋ ๋ ์คํ์ํค๊ณ  server ํด๋๋ก ์ด๋ํ ๋ค ์คํ์์ผ์ค๋๋ค.
```bash
cd server
node index.js    #localhost:8080
```
<br/>
