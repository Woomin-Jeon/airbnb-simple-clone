const session = {
  memory: new Map(),
  sessionName: 'AirBnB_sid',
  sessionLength: 20,
  expireSeconds: 90_000,

  setSession(res, userId) {
    const randomSessionId = this.getRandomString();

    res.cookie(this.sessionName, randomSessionId);
    this.memory.set(randomSessionId, userId);

    setTimeout((sid) => {
      this.expireSession(sid);
    }, this.expireSeconds, randomSessionId);
  },

  removeSession(req, res) {
    const sid = this.getSidFromCookie(req);

    this.memory.delete(sid);
    res.clearCookie(this.sessionName);
  },

  getIdBySession(req) {
    const sid = this.getSidFromCookie(req);

    if (!sid) {
      return null;
    }

    return this.memory.get(sid);
  },

  expireSession(sid) {
    this.memory.delete(sid);
  },

  getSidFromCookie(req) {
    const cookieString = req.headers.cookie;

    if (!cookieString) {
      return null;
    }

    const cookies = cookieString.split(/; /).map((v) => v.split('='));
    const myCookie = cookies.find((cookie) => cookie[0] === this.sessionName);

    const sid = myCookie[1];
    return sid;
  },

  getRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let randomString = '';
    for (let i = 0; i < this.sessionLength; i += 1) {
      const randomNumber = Math.floor(Math.random() * 1000) % characters.length;
      randomString += characters[randomNumber];
    }

    return randomString;
  },
};

module.exports = (req, res, next) => {
  req.session = session;
  res.session = session;
  next();
};
