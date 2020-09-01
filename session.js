module.exports = session = {
  memory: [],
  sessionName: 'AirBnB_sid',
  sessionLength: 20,

  setSession(res, userId) {
    res.cookie(this.sessionName, this.getRandomString());
    this.memory.push({ id: userId, sid: this.getRandomString() });
  },

  getIdBySession(req) {
    const cookieString = req.headers.cookie;

    if (!cookieString) {
      return -1;
    }

    const cookies = cookieString.split(/; /).map(v => v.split('='))
    const myCookie = cookies.find(cookie => cookie[0] === this.sessionName);
    const sid = myCookie[1];

    return this.memory.find(v => v.sid === sid).id;
  }

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
