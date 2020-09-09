const DB = require('../database/util');
const useSHA256 = require('../util/encryption');
const state = require('../store');

const signupValidator = () => {
  const responseError = (res, statement) => {
    state.setSignupModal(true).setPopup(`${statement}`);

    res.redirect('/');
  };

  return async (req, res, next) => {
    const { pwCheck, ...user } = req.body;
    const existingUser = await DB.findUserById(user.id);

    if (!user.pw || !user.name) {
      responseError(res, '모두 입력해주셔야 합니다.');
      return;
    }

    if (existingUser) {
      responseError(res, '이미 존재하는 아이디입니다.');
      return;
    }

    if (user.pw !== pwCheck) {
      responseError(res, '패스워드가 다릅니다.');
      return;
    }

    next();
  };
};

const loginValidator = () => async (req, res, next) => {
  const { id, pw } = req.body;
  const encryptedPassword = useSHA256(pw);
  const user = await DB.findUserById(id);

  if (!user || user.pw !== encryptedPassword) {
    state.setLoginModal(true).setPopup('아이디 혹은 비밀번호가 일치하지 않습니다.');

    res.redirect('/');
    return;
  }

  next();
};

module.exports = { loginValidator, signupValidator };
