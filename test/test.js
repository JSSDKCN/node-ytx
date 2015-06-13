'use strict';
var assert = require('assert');
var ytx = require('../');

describe('node-ytx node module', function () {
  it('must have at least one test', function (done) {
    var config = {
      url: 'sandboxapp.cloopen.com',
      port: 8883,
      version: '2013-12-26',
      appId: 'aaf98f89429833490142a34d81e801c2',
      accountSid: 'aaf98f89429833490142a34d3c6a01c0',
      accountToken: 'ef22b3378a114a2886c893b865226d4d'
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
      assert(error === 0);
      assert(json.statusCode === '000000');
      done();
    });
  });
});
