var biteasyAPI = require('../index.js');

/** GET **/

biteasyAPI({ network: 'mainnet' }).Blocks.Get([
  "00000000000000000216a936ebc1962e319a51bab8d3eae69335ac940284491d",
  "00000000000000001034f207d3ce18f03054ddfb0e4dba712f5b76cb1cda9499"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

biteasyAPI({ network: 'testnet' }).Blocks.Get([
  "00000000005df195c304bc89652377f3ef17ed8c71c636e88adecb0bbf20f873"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

// Invalid Example
biteasyAPI({ network: 'mainnet' }).Blocks.Get([
  "29384792387042379481703948710983749018374098137409817304987139"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

/** LATEST **/

biteasyAPI({ network: 'mainnet' }).Blocks.Latest(function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

biteasyAPI({ network: 'testnet' }).Blocks.Latest(function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

/** PROPAGATE **/

// Unsupported Function
biteasyAPI({ network: 'mainnet' }).Blocks.Propagate({
  blockHex: ''
}, function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

// Unsupported Function
biteasyAPI({ network: 'testnet' }).Blocks.Propagate({
  blockHex: ''
}, function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

/** TRANSACTIONS **/

// Unsupported Function
biteasyAPI({ network: 'mainnet' }).Blocks.Transactions([
  "00000000000000000216a936ebc1962e319a51bab8d3eae69335ac940284491d",
  "00000000000000001034f207d3ce18f03054ddfb0e4dba712f5b76cb1cda9499"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

// Unsupported Function
biteasyAPI({ network: 'testnet' }).Blocks.Transactions([
  "00000000000d8087a4cea66ad90d890ed05c9059a0323d20463d0635aff6056f"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp.length);
});
