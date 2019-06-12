import auth0 from 'auth0-js';
import EventEmitter from 'events';
import authConfig from '../../auth_config.json';
import $realtime from '@/classes/socketclient';

// 'loggedIn' is used in other parts of application. So, Don't forget to change there also
const localStorageKey = 'loggedIn';
const tokenExpiryKey = 'tokenExpiry';
const tokenKey = 'token';
const loginEvent = 'loginEvent';

const webAuth = new auth0.WebAuth({
  domain: authConfig.domain,
  redirectUri: window.location.origin + process.env.BASE_URL + "callback",
  clientID: authConfig.clientId,
  responseType: 'id_token',
  scope: 'openid profile email'
});

let AuthInstance;

class AuthService extends EventEmitter {
  static instance() {
    if (!AuthInstance) {
      AuthInstance = new AuthService();
    }
    return AuthInstance;
  }
  idToken = null;
  profile = null;
  tokenExpiry = null;

  // Starts the user login flow
  login(customState) {
    webAuth.authorize({
      appState: customState
    });
  }

  // Handles the callback request from Auth0
  handleAuthentication() {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if (err) {
          alert(err.error + '. Detailed error can be found in console.');
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult.idToken);
        }
      });
    });
  }

  async isSetAdmin() {
    return $realtime.$api.post('admin/isSetAdmin')
      .then(({error, data}) => {
        if(error) return Promise.reject(error);
        return Promise.resolve(data);
      })
  }

  localLogin(authResult) {
    this.profile = authResult.payload;

    // Convert the JWT expiry time from seconds to milliseconds
    this.tokenExpiry = new Date(this.profile.loginTime + this.profile.expireCycle * 60 * 1000);
    localStorage.setItem(tokenExpiryKey, this.tokenExpiry);
    localStorage.setItem(localStorageKey, 'true');
    localStorage.setItem('userInfo', JSON.stringify(this.profile));

    this.emit(loginEvent, {
      loggedIn: true,
      profile: this.profile
    });
  }

  jwt(callback = (data) => data) {
    var token = localStorage.getItem(tokenKey);
    return ODCClient.apiPost('authenticate', { data: { token } })
      .then(res => callback(res));
  }

  authenticate(email, password) {
    return $realtime.$api.post('users/login', { data: { email, password } })
      .then(authResult => {
        return authResult;
      })
  }

  rememberMe() {
    return Promise.resolve(true);
  }

  renewTokens() {
    // reject can be used as parameter in promise for using reject
    return new Promise((resolve) => {
      if (localStorage.getItem(localStorageKey) !== "true") {
        // return reject("Not logged in");
      }

      webAuth.checkSession({}, (err, authResult) => {
        if (err) {
          // reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult);
        }
      });
    });
  }

  logOut() {
    localStorage.removeItem(localStorageKey);
    localStorage.removeItem(tokenExpiryKey);
    localStorage.removeItem('userInfo');

    this.idToken = null;
    this.tokenExpiry = null;
    this.profile = null;

    // ODCClient.apiPost("/logout");
    // webAuth.logout({
    //   returnTo: window.location.origin + process.env.BASE_URL
    // });

    this.emit(loginEvent, { loggedIn: false });
  }

  isAuthenticated() {
    return (
      new Date(Date.now()) < new Date(localStorage.getItem(tokenExpiryKey))
      // && localStorage.getItem(localStorageKey) === 'true'
    );
  }

  isSellerAuthenticated() {
    if (this.isAuthenticated()) {
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo.role == 'seller') return true;
    }
    return false;
  }

  isAdminAuthenticated() {
    if (this.isAuthenticated()) {
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo.role == 'admin' || userInfo.role == 'super') return true;
    }
    return false;
  }

  isDriverAuthenticated() {
    if (this.isAuthenticated()) {
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo.role == 'driver') return true;
    }
    return false;
  }
}

export default AuthService.instance();
