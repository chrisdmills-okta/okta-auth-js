const OktaAuth = require('@okta/okta-auth-js').OktaAuth;
// const uniqueId = require('./uniqueId');

const sampleConfig = require('../../config').webServer;

module.exports = function getAuthClient(req, options = {}) {
  const storageProvider = {
    getItem: function(key) {
      let val;
      try {
        val = JSON.parse(req.session[key]);
      } catch (err) {
        console.log(`Failed to parse stored value for ${key}, value: ${req.session[key]}`);
        val = null;
      }
      return val;
    },
    setItem: function(key, val) {
      req.session[key] = JSON.stringify(val);
    },
    removeItem: function(key) {
      delete req.session[key];
    }
  };

  let authClient;
  try {
    authClient = new OktaAuth({ 
      ...sampleConfig.oidc, 
      storageManager: {
        token: {
          storageProvider
        },
        transaction: {
          storageProvider
        }
      },
      ...options
    });
  } catch(e) {
    console.error('Caught exception in OktaAuth constructor: ', e);
  }
  return authClient;
};