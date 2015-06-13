#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> 云通讯node实现


## Install

```sh
$ npm install --save node-ytx
```


## Usage

```js

var ytx = require('node-ytx');
var config = {
url: 'sandboxapp.cloopen.com',
     port: 8883,
     version: '2013-12-26',
     appId: 'yourAppId',
     accountSid: 'yourAccountSid',
     accountToken: 'YourAccountToken'
};
ytx.init(config);

//Specify a phone number which your can test
var phone = require('./phone');

ytx.smsTemplate(phone, [' 云通讯测试', "" + Math.round(Math.random() * 1000000) ], 1, function (error, data) {
  var json;
  try {
    json = JSON.parse(String(data));
  } catch(e) {
    console.log(e);
  }
});

```


## License

MIT © [calidion](blog.3gcnbeta.com)


[npm-image]: https://badge.fury.io/js/node-ytx.svg
[npm-url]: https://npmjs.org/package/node-ytx
[travis-image]: https://travis-ci.org/calidion/node-ytx.svg?branch=master
[travis-url]: https://travis-ci.org/calidion/node-ytx
[daviddm-image]: https://david-dm.org/calidion/node-ytx.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/calidion/node-ytx
