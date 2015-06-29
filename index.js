var Addresses = require('./lib/addresses.js');
var Blocks = require('./lib/blocks.js');
var Transactions = require('./lib/transactions.js');

var BASE_URL;

/* Initialize the biteasyAPI object with a specified
 * network. If no network is provided, default will be
 * set to Bitcoin Mainnet. */
function biteasyAPI(options) {
  if (!(this instanceof biteasyAPI)) return new biteasyAPI(options);
  options = options || {};
  if (!options.network) console.log("Warning: Network was not specified, defaulting to Bitcoin Mainnet.");
  BASE_URL = networkCheck(options.network);
}

/* Returns the address of the specified network.
 * Includes error handling for erroneous networks.
 * Default network is mainnet. */
function networkCheck(network) {
  var mainnet = 'https://api.biteasy.com/blockchain/v1/';
  var testnet = 'https://api.biteasy.com/testnet/v1/';
  if (network === 'testnet') {
    return testnet;
  }
  return mainnet;
}

/* Get Summary, Transactions, and Unspents information
 * for provided Addresses (in array). */
biteasyAPI.prototype.Addresses = {
  Summary: function (options) {
    options = { addresses: options.addresses, base: BASE_URL };
    Addresses.Summary(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Transactions: function (options) {
    options = { addresses: options.addresses, base: BASE_URL };
    Addresses.Transactions(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Unspents: function (options) {
    options = { addresses: options.addresses, base: BASE_URL };
    Addresses.Unspents(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  }
}

/* Get Block and Transaction information for specified Blocks,
 * get Transactions for specified Blocks, and Propogate to the
 * network a Block by specified blockHex */
biteasyAPI.prototype.Blocks = {
  Get: function (options) {
    options = { blockIds: options.blockIds, base: BASE_URL };
    Blocks.Get(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Latest: function () {
    var options = { base: BASE_URL };
    Blocks.Latest(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Propogate: function (options) {
    options = { blockHex: options.blockHex, base: BASE_URL };
    Blocks.Propogate(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Transactions: function (options) {
    options = { blockIds: options.blockIds, base: BASE_URL };
    Blocks.Transactions(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  }
}

/* Get Transaction, Outputs, and Status information for 
 * a specified Transaction. Get latest Transaction and also 
 * propogate a Transaction. */
biteasyAPI.prototype.Transactions = {
  Get: function (options) {
    options = { txids: options.txids, txIds: options.txIds, base: BASE_URL };
    Transactions.Get(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Latest: function () {
    var options = { base: BASE_URL };
    Transactions.Latest(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Outputs: function (options) {
    options = { outputs: options.outputs, base: BASE_URL };
    Transactions.Outputs(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Propogate: function (options) {
    options = { hex: options.hex, txHex: options.txHex, base: BASE_URL };
    Transactions.Propogate(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Status: function (options) {
    options = { txids: options.txids, txIds: options.txIds, base: BASE_URL };
    Transactions.Status(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  }
}

module.exports = biteasyAPI;
