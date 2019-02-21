# `Command Line Interface` #
---

**`/Node-CLI/package.json`**

- ``` json
    "bin": {
    "cli": "./index.js"
    }
   ```
**`cli` 를 터미널에 타이핑시 ->`./index.js`실행** 
**`명령어랑 패키지명은 달라도 된다. `**

- **`ex) express-generator -> express`**

---

**`$ npm i -g `** : **`해당 패키지를 글로벌 커맨드로 사용`**

---

**`/index.js`**
-
```js
#!/usr/bin/env node
console.log('HELLO CLI',process.argv); 
- process.argv
//노드의 설치 경로 ,전역 패키지의 경로 , .. 사용자가 추가 입력한 사항
```

 ```
 $ cli hello command line
 
 HELLO CLI
[
'/usr/local/bin/node',
'/usr/local/bin/cli',
  'hello',
  'my',
  'name'
   ]
```
**`progress.argv - 노드의 설치 경로 ,전역 패키지의 경로 , .. 사용자가 추가 입력한 사항`**