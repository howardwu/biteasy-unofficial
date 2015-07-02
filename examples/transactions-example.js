var biteasyAPI = require('../index.js');

/** GET **/

biteasyAPI({ network: 'mainnet' }).Transactions.Get([
  "186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836",
  "9375818c85a6712416dac6edd403498180ee9ee0e604bd11ec35beaea384da51"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

biteasyAPI({ network: 'testnet' }).Transactions.Get([
  "940d527cb2f75c2fd3a5edaab29932891f1738d82934ba8f3d9bff4d22ea33f5"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

biteasyAPI({ network: 'mainnet' }).Transactions.Get([
  "0s9049t4094u093jaie0930ej9a309jra903r0a9w3ur09aw3i903ie093ia09uta09"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

/** LATEST **/

biteasyAPI({ network: 'mainnet' }).Transactions.Latest(function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

biteasyAPI({ network: 'testnet' }).Transactions.Latest(function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

/** OUTPUTS **/

biteasyAPI({ network: 'mainnet' }).Transactions.Outputs([
  {
    vout: 1,
    txId: "186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836"
  }
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

biteasyAPI({ network: 'testnet' }).Transactions.Outputs([
  {
    vout: 0,
    txId: "03af5bf0b3fe25db04b684ab41bea8cdd127e57822602b8545beaf06685967c8"
  }
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

// Invalid vout
biteasyAPI({ network: 'mainnet' }).Transactions.Outputs([
  {
    vout: 2,
    txId: "186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836"
  }
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

// Invalid txId
biteasyAPI({ network: 'mainnet' }).Transactions.Outputs([
  {
    vout: 0,
    txId: "0s9049t4094u093jaie0930ej9a309jra903r0a9w3ur09aw3i903ie093ia09uta09"
  }
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

/** PROPAGATE **/

biteasyAPI({ network: 'mainnet' }).Transactions.Propagate({
  hex: ''
}, function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

biteasyAPI({ network: 'testnet' }).Transactions.Propagate({
  hex: ''
}, function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});


/** STATUS **/

biteasyAPI({ network: 'mainnet' }).Transactions.Status([
  "186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836",
  "9375818c85a6712416dac6edd403498180ee9ee0e604bd11ec35beaea384da51"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

biteasyAPI({ network: 'testnet' }).Transactions.Status([
  "0409c167be7f367dbf5ba065b662c971dabfbc431a458af7dfb298f300026b86"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

biteasyAPI({ network: 'mainnet' }).Transactions.Status([
  "0s9049t4094u093jaie0930ej9a309jra903r0a9w3ur09aw3i903ie093ia09uta"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});
