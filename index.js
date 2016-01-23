
/**
 * Yuntongxun APIS
 *
 * Currently implemented SMS part.
 *
 */

'use strict';
var
  accountSid,
  accountToken,
  appId,
  serverHost,
  serverPort,
  softVersion,
  batch;

var crypto = require("crypto");

var templates = {};

var YTX = {
  init: function(config) {
    this.initServer(config.url, config.port, config.version);
    this.initApp(config.appId);
    this.initAccount(config.accountSid, config.accountToken);
  },
  initTemplate: function(captcha, reset) {
    templates.captcha = captcha;
    templates.reset = reset;
  },
  initServer: function (host, port, version) {
    var moment = require("moment");
    batch = moment(new Date()).format('YYYYMMDDHHmmss');
    serverHost = host;
    serverPort = port;
    softVersion = version;
  },
  initAccount: function (sid, token) {
    accountSid = sid;
    accountToken = token;
  },

  initApp: function (id) {
    appId = id;
  },

  post: function (options, data, next) {
    var https = require('https');
    var req = https.request(options, function (res) {

      res.on('data', function (data) {
        try {
          //var json = JSON.parse(data);
          next(false, data);
        } catch(e) {
          next(true, e);
        }
      });
    });
    req.write(JSON.stringify(data));
    req.end();

    req.on('error', function (e) {
      console.error(e);
      next(e, null);
    });
  },

  getOptions: function(isTemplate) {
    var sig = crypto.createHash('md5').update(accountSid + accountToken + batch).digest('hex').toUpperCase();
    var auth = new Buffer(accountSid + ":" + batch);
    auth = auth.toString("base64");
    var type = isTemplate ? 'TemplateSMS' : 'Messages';
    return {
      host: serverHost,
      port: serverPort,
      method: 'POST',
      path: "/" + softVersion + "/Accounts/" + accountSid + "/SMS/" + type +
      "?sig=" + sig,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: auth
      },
      rejectUnauthorized: false,
      requestCert: true,
      agent: false,
      secureProtocol: 'TLSv1_method'
    };
  },

  smsMessages: function(phone, body, next) {
    var data = {
      'to': phone,
      'body': body,
      appId: appId
    };
    var options = YTX.getOptions();
    YTX.post(options, data, function (err, data) {
      next(err, data);
    });
  },

  sms: function(phone, body, next) {
    //YTX.smsMessages(phone, body, next);
    YTX.smsCaptcha(phone, body, next);
  },

  smsCaptcha: function(phone, captcha, next) {
    YTX.smsTemplate(phone, [captcha, '30'], templates.captcha, next);
  },

  smsReset: function(phone, password, next) {
    YTX.smsTemplate(phone, [password, '30'], templates.reset, next);
  },

  /**
   *  Sms Function to Sending Messages to Phone with TemplateId
   *
   *  @param {string}    phone   -Actual phone number
   *  @param {array}     arrs     -Array of sms
   *  @param {number}    tempId  -Template Id
   *  @param {function}  next    -Callback function
   */

  smsTemplate: function (phone, arrs, tempId, next) {
    var data = {
      to: phone,
      templateId: tempId,
      appId: appId,
      datas: arrs
    };
    var options = YTX.getOptions(true);
    YTX.post(options, data, function (err, data) {
      next(err, data);
    });
  }
};

module.exports = YTX;
