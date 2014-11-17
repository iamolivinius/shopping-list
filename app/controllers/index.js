import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['createdAt'],
  sortAscending: true,
  alertProductname: false,
  alertPrice: false,

  productName: '',
  price: null,

  total: function () {
    return this.reduce(function (previousValue, item) {
      return previousValue + item.get('price');
    }, 0);
  }.property('this.[]'),

  validProductname: function() {
    if (this.get('productName').length >= 3) {
      this.set('alertProductname', false);
      return true;
    }
    return false;
  }.property('productName'),

  validPrice: function() {
    var input = this.get('price');

    // check if the input is a valid number
    if (isFinite(input) && input !== '' && input > 0) {
      this.set('alertPrice', false);
      return true;
    }

    return false;
  }.property('price'),

  validForm: function() {
    return this.get('validProductname') && this.get('validPrice');
  }.property('validProductname', 'validPrice'),

  actions: {
    saveItem: function() {
      if (!this.get('validProductname')) {
        this.set('alertProductname', true);
        return;
      }

      if (!this.get('validPrice')) {
        this.set('alertPrice', true);
        return;
      }

      var productInfo = this.getProperties('productName', 'price');
      productInfo.price = parseFloat(productInfo.price);
      var item = this.store.createRecord('item', productInfo);
      item.set('buyer', this.get('session.user_name'));
      item.save();

      this.send('clearForm');
    },

    clearForm: function() {
      this.setProperties({
        productName: '',
        price: null
      });
    }
  }
});
