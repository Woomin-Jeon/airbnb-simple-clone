module.exports = session = {
  memory: [],
  sessionName: 'AirBnB_sid',
  sessionLength: 20,

  setSession(res, userId) {
    const randomSession = this._getRandomString();

    res.cookie(this.sessionName, randomSession);
    this.memory.push({ id: userId, sid: randomSession });
  },

  removeSession(req, res) {
    const sid = this._getSidFromCookie(req);
    const targetSidIndex = this.memory.findIndex(v => v.sid === sid);

    this.memory.splice(targetSidIndex, 1);
    res.clearCookie(this.sessionName);
  },

  getIdBySession(req) {
    const sid = this._getSidFromCookie(req);

    if (!sid) {
      return null;
    }

    const userSession = this.memory.find(v => v.sid === sid);

    if (!userSession) {
      return null;
    }

    return userSession.id;
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
