var biteasyAPI = require('../index.js');

/** SUMMARY **/

biteasyAPI({ network: 'mainnet' }).Addresses.Summary({
  addresses: [
    "1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq",
    "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"
  ]
}, function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

biteasyAPI({ network: 'testnet' }).Addresses.Summary({
  addresses: ["mjf6CRReqGSyvbgryjE3fbGjptRRfAL7cg"]
}, function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

biteasyAPI({ network: 'mainnet' }).Addresses.Summary({
  addresses: ["abcdefghijklmnopqrstuvxyz1234567890"]
}, function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});


/** TRANSACTIONS **/

biteasyAPI({ network: 'mainnet' }).Addresses.Transactions({
  addresses: [
    "1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq",
    "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"
  ]
}, function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

biteasyAPI({ network: 'testnet' }).Addresses.Transactions({
  addresses: ["mjf6CRReqGSyvbgryjE3fbGjptRRfAL7cg"]
}, function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

biteasyAPI({ network: 'mainnet' }).Addresses.Transactions({
  addresses: ["abcdefghijklmnopqrst"]
}, function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});


/** UNSPENTS **/

biteasyAPI({ network: 'mainnet' }).Addresses.Unspents({
  addresses: [
    "1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq",
    "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"
  ]
}, function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

biteasyAPI({ network: 'testnet' }).Addresses.Unspents({
  addresses: ["mjf6CRReqGSyvbgryjE3fbGjptRRfAL7cg"]
}, function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

biteasyAPI({ network: 'mainnet' }).Addresses.Unspents({
  addresses: ["asdfghjkl"]
}, function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});
