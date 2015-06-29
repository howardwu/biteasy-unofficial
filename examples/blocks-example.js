var biteasyAPI = require('../index.js');

/** GET **/

biteasyAPI({ network: 'mainnet' }).Blocks.Get({
  blockIds: [
    "00000000000000000216a936ebc1962e319a51bab8d3eae69335ac940284491d",
    "00000000000000001034f207d3ce18f03054ddfb0e4dba712f5b76cb1cda9499"]
}, function (err, resp) {
  console.log(resp);
});

biteasyAPI({ network: 'testnet' }).Blocks.Get({
  blockIds: [
    "00000000005df195c304bc89652377f3ef17ed8c71c636e88adecb0bbf20f873"]
}, function (err, resp) {
  console.log(resp);
});

biteasyAPI({ network: 'mainnet' }).Blocks.Get({
  blockIds: [
    "29384792387042379481703948710983749018374098137409817304987139"]
}, function (err, resp) {
  console.log(resp);
});


/** LATEST **/

biteasyAPI({ network: 'mainnet' }).Blocks.Latest(function (err, resp) {
  console.log(resp);
});

biteasyAPI({ network: 'testnet' }).Blocks.Latest(function (err, resp) {
  console.log(resp);
});

/** PROPOGATE **/

biteasyAPI({ network: 'mainnet' }).Blocks.Propogate({
  blockHex: ''
}, function (err, resp) {
  console.log(resp);
});

biteasyAPI({ network: 'testnet' }).Blocks.Propogate({
  blockHex: ''
}, function (err, resp) {
  console.log(resp);
});

/** TRANSACTIONS **/

biteasyAPI({ network: 'mainnet' }).Blocks.Transactions({
  blockIds: [
    "00000000000000000216a936ebc1962e319a51bab8d3eae69335ac940284491d",
    "00000000000000001034f207d3ce18f03054ddfb0e4dba712f5b76cb1cda9499"]
}, function (err, resp) {
  console.log(resp);
});

biteasyAPI({ network: 'testnet' }).Blocks.Transactions({
  blockIds: [
    "00000000005df195c304bc89652377f3ef17ed8c71c636e88adecb0bbf20f873"]
}, function (err, resp) {
  console.log(resp);
});