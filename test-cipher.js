var CryptoJS = require("crypto-js");
var randomstring = require('randomstring');

var data = [{id: 1}, {id: 2}]
let key = randomstring.generate(12);

// Encrypt
var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), key);

// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), key);
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

console.log(decryptedData);
