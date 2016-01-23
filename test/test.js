'use strict';
var assert = require('assert');
var ytx = require('../');

describe('node-ytx node module', function () {
  it('can send a sms message to the phone', function (done) {
    var fs = require('fs');
    var path = require('path');
    var phone = null;
    var config = null;
    if (fs.existsSync(path.resolve(__dirname, './config.js'))) {
      config = require('./config');
      ytx.init(config.config);
      //Specify a phone number which your can test
      phone = config.phone;
    } else if (process.env.config && process.env.phone) {
      config = {};
      var keys = ['url', 'port', 'version', 'appId', 'accountSid', 'accountToken'];
      for(var i = 0; i < keys.length; i++) {
        var key = keys[i];
        config[key] = process.env[key];
      }
      ytx.init(config);
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
      assert.equal(true, error === false);
      assert.equal(true, json.statusCode === '000000' || json.statusCode === '160038' || json.statusCode === '160040');
      done();
    });
  });
});
