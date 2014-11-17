import Ember from 'ember';

export function formatDate(input) {
  return moment(input).format('LL');
};

export default Ember.Handlebars.makeBoundHelper(formatDate);
