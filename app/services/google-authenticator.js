import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

export default Base.extend({
  restore: function(properties) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(properties.access_token)) {
        resolve(properties);
      } else {
        reject();
      }
    });
  },

  authenticate: function(options) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      gapi.auth.authorize({
        client_id: '656566889618-ohsvt0qhdogb5cnv765av5lf2u4auu79.apps.googleusercontent.com',
        scope: ['profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'],
        'approvalprompt': 'force',
        immediate: false
      }, function(authResult) {
        if (authResult && !authResult.error) {

          gapi.client.load('plus', 'v1', function() {
            var request = gapi.client.plus.people.get({
              'userId': 'me'
            });
            request.execute(function(resp) {
              resolve({
                access_token: authResult.access_token,
                user_name: resp.name.givenName || resp.displayName
              });
            });
          });
        } else {
          reject((authResult || {}).error);
        }
      });
    });
  },

  invalidate: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      resolve();
    });
  }
});
