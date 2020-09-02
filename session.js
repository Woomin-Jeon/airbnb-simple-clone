module.exports = session = {
  memory: [],
  sessionName: 'AirBnB_sid',
  sessionLength: 20,

  setSession(res, userId) {
    const randomSession = this.getRandomString();

    res.cookie(this.sessionName, randomSession);
    this.memory.push({ id: userId, sid: randomSession });
  },

  getIdBySession(req) {
    const cookieString = req.headers.cookie;

    const cookies = cookieString.split(/; /).map(v => v.split('='))
    const myCookie = cookies.find(cookie => cookie[0] === this.sessionName);
    const sid = myCookie[1];

    const userSession = this.memory.find(v => v.sid === sid);

    if (!userSession) {
      return null;
    }

    return userSession.id;
  },

  getRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    let randomString = "";
    for (let i = 0; i < this.sessionLength; i += 1) {
      const randomNumber = Math.floor(Math.random() * 1000) % characters.length;
      randomString += characters[randomNumber];
    }

    return randomString;
  }
}
