const sha256 = require('crypto-js/sha256');

module.exports = useSHA256 = (str) => {
  const hashDigest = sha256(str);
  
  return hashDigest.words.join('');
}
