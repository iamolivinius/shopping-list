import Ember from 'ember';
import moment from 'moment';

export function formatDate(input) {
  return moment(input).format('LL');
}

export default Ember.Handlebars.makeBoundHelper(formatDate);
