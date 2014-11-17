import GoogleAuthenticator from '../services/google-authenticator';

export function initialize(container) {
  container.register('authenticator:googleplus', GoogleAuthenticator);
}

export default {
  name: 'authentication',
  before: 'simple-auth',
  initialize: initialize
};
