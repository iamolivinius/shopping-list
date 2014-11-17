import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    authenticateWithGooglePlus: function() {
      this.get('session').authenticate('authenticator:googleplus', {});
    }
  }
});
