import Ember from 'ember';

export function formatPrice(input) {
  return parseFloat(input).toFixed(2);
}

export default Ember.Handlebars.makeBoundHelper(formatPrice);
