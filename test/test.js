'use strict';
var assert = require('assert');
var ytx = require('../');

describe('node-ytx node module', function () {
  it('can send a sms message to the phone', function (done) {
    var fs = require('fs');
    var path = require('path');
    var phone = null;
    if (fs.existsSync(path.resolve(__dirname, './config.js'))) {
      var config = require('./config');
      ytx.init(config.config);
      //Specify a phone number which your can test
      phone = config.phone;
    } else if (process.env.config && process.env.phone) {
      ytx.init(JSON.parse(process.env.config));
      phone = process.env.phone;
    } else {
      assert(false);
    }

    ytx.smsTemplate(phone, [' 云通讯测试', "" + Math.round(Math.random() * 1000000) ], 1, function (error, data) {
      var json;
      try {
        json = JSON.parse(String(data));
      } catch(e) {
        console.log(e);
      }
      assert(error === 0);
      assert(json.statusCode === '000000');
      done();
    });
  });
});
