<a href="https://www.npmjs.com/package/nayan-server"><img alt="npm version" src="https://img.shields.io/npm/v/nayan-bing-api.svg?style=flat-square"></a>
<img alt="version" src="https://img.shields.io/github/package-json/v/MR-NAYAN-404/nayan-bing-api?label=github&style=flat-square">
<a href="https://www.npmjs.com/package/nayan-bing-api"><img src="https://img.shields.io/npm/dm/nayan-bing-api.svg?style=flat-square" alt="npm downloads"></a>

## Instalation :
```bash
> npm i nayan-bing-api
```


```js

const { bing } = require("nayan-bing-api");
const request = require('request')

const key = "Nayan" //dont change key

const cookie = "cooki" //past your bing cookie here

const prompt = "cat" // write a promt

bing(prompt, cookie, key).then(data => {
  console.log(data)
});
```
