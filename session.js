module.exports = session = {
  memory: new Map(),
  sessionName: 'AirBnB_sid',
  sessionLength: 20,

  setSession(res, userId) {
    const randomSession = this._getRandomString();

    res.cookie(this.sessionName, randomSession);
    this.memory.set(randomSession, userId);
  },

  removeSession(req, res) {
    const sid = this._getSidFromCookie(req);

    this.memory.delete(sid);
    res.clearCookie(this.sessionName);
  },

  getIdBySession(req) {
    const sid = this._getSidFromCookie(req);

    if (!sid) {
      return null;
    }

    return this.memory.get(sid);
  },

  _getSidFromCookie(req) {
    const cookieString = req.headers.cookie;

    if (!cookieString) {
      return null;
    }

    const cookies = cookieString.split(/; /).map(v => v.split('='))
    const myCookie = cookies.find(cookie => cookie[0] === this.sessionName);

    const sid = myCookie[1];
    return sid;
  },

  _getRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    let randomString = "";
    for (let i = 0; i < this.sessionLength; i += 1) {
      const randomNumber = Math.floor(Math.random() * 1000) % characters.length;
      randomString += characters[randomNumber];
    }

    return randomString;
  },
}
