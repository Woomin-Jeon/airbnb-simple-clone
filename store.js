const actions = {
  setLoginModal(bool) {
    this.loginModal = bool;
    return this;
  },
  setSignupModal(bool) {
    this.signupModal = bool;
    return this;
  },
  setRedirect(path) {
    this.redirect = path;
    return this;
  },
  setLoggedIn(bool) {
    this.loggedIn = bool;
    return this;
  },
  setName(userName) {
    this.name = userName;
    return this;
  },
  setPopup(message) {
    this.popup = message;
    return this;
  },
};

const store = {
  loginModal: false,
  signupModal: true,
  redirect: '/',
  loggedIn: false,
  name: '',
  popup: '',
  ...actions,
};

module.exports = store;
