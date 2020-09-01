const fs = require('fs');

const useSHA256 = require('./encryption');

module.exports = DB = {
  getUsers() {
    return new Promise(resolve => {
      fs.readFile('./database/user.txt', 'utf8', (err, data) => {
        const users = data.split(/\n/).map(user => JSON.parse(user));

        resolve(users);
      });
    });
  },

  addUser(user) {
    return new Promise(resolve => {
      const encrypedUser = { ...user, pw: useSHA256(user.pw) };
      const data = `\n${JSON.stringify(encrypedUser)}`;
      fs.appendFile('./database/user.txt', data, (err) => {});

      resolve(true);
    });
  },

  findUserById(id) {
    return new Promise(async (resolve) => {
      const users = await this.getUsers();

      resolve(users.find(user => user.id === id));
    });
  }
}

