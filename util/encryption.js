const sha256 = require('crypto-js/sha256');

module.exports = (str) => {
  const hashDigest = sha256(str);

  return hashDigest.words.join('');
};
