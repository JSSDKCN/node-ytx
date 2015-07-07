'use strict';
var assert = require('assert');
var ytx = require('../');

describe('node-ytx node module', function () {
  it('can send a sms message to the phone', function (done) {
    var config = require('./config');
    ytx.init(config.config);


    //Specify a phone number which your can test
    var phone = config.phone;

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
