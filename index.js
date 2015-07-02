var Addresses = require('./lib/addresses.js');
var Blocks = require('./lib/blocks.js');
var Transactions = require('./lib/transactions.js');

var assert = require('assert');

/* Initialize the biteasyAPI object with a specified network. If no
 * network is provided, default will be set to Bitcoin Mainnet. */
function biteasyAPI(options) {
  if (!(this instanceof biteasyAPI)) return new biteasyAPI(options);
  options = options || {};
  assert(options.network, "Warning: Network was not specified, defaulting to Bitcoin Mainnet.");
  var base = networkCheck(options.network);
  return {
    Addresses: Addresses(options, base),
    Blocks: Blocks(options, base),
    Transactions: Transactions(options, base)
  }
}

/* Returns the address of the specified network. Includes error handling
 * for erroneous networks. Default network is mainnet. */
function networkCheck(network) {
  if (network === 'testnet') return 'https://api.biteasy.com/testnet/v1/';
  return 'https://api.biteasy.com/blockchain/v1/';
}

module.exports = biteasyAPI;
