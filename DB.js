const fs = require('fs');

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
      const data = `\n${JSON.stringify(user)}`;
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

