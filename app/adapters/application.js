import DS from 'ember-data';

export default DS.FirebaseAdapter.extend({
  firebase: new Firebase('https://shoppinglists19.firebaseio.com')
});
