import DS from 'ember-data';

export default DS.Model.extend({
  productName: DS.attr('string'),
  price: DS.attr('number'),
  createdAt: DS.attr('date', {
    defaultValue: function() {
      return Date.now();
    }
  }),
  buyer: DS.attr('string')
});
