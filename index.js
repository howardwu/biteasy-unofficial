var request = require('request');

/* Returns the address of the specified network.
 * Includes error handling for erroneous networks.
 * Default network is mainnet.
 */
function networkCheck(network) {
  var mainnet = 'https://api.biteasy.com/blockchain/v1/';
  var testnet = 'https://api.biteasy.com/testnet/v1/';
  if (network) {
    if (network === 'testnet') {
      return testnet;
    }
  }
  return mainnet;
}

/* Returns JSON of wallet info. Includes check that an
 * address is provided and ensures that return from Biteasy
 * is valid data for use.
 */
function getWalletInfo(options, callback) {
  if (options.address) {
    var base = networkCheck(options.network);
    var req = base + 'addresses/' + options.address;
    var tx = base + 'transactions?address=' + options.address; 

    request(req, function (error, response, body) {
      if (error) {
        callback(error, null);
      }
      request(tx, function (error, response, txs) {
        try {
          if (JSON.parse(body).status === 200 && JSON.parse(txs).status === 200) {
            var data = JSON.parse(body).data;
            var tx = JSON.parse(txs).data.transactions;
            var result = { 
              result:
                {
                  balance: data.balance,
                  totalReceived: data.total_received,
                  totalSent: data.total_sent,
                  txCount: tx.length,
                  transactions: ["not provided"]
                }
            };
            callback(null, result);
          }
        }
        catch (err) {
          callback(err, null);
        }
      });
    });
  } 
  else {
    callback('error: no address provided', null);
  }
}

/* Returns JSON of unspent outputs. Includes check that an
 * address is provided and ensures that return from Biteasy
 * is valid data for use.
 */
function getUnspentOutputs(options, callback) {
  if (options.address) {
    var base = networkCheck(options.network);
    var req = base + 'addresses/' + options.address + '/unspent-outputs/';
    request(req, function (error, response, body) {
      if (error) {
        callback(error, null);
      }
      try {
        if (JSON.parse(body).status === 200) {
          var data = JSON.parse(body).data.outputs;
          var result = [];
          for (var i = 0; i < data.length; i++) {
            result.push({
              txid: data[i].transaction_hash,
              vout: i,
              address: data[i].to_address,
              scriptPubKey: data[i].script_pub_key,
              amount: data[i].value,
              confirmations: "not provided"
            });
          }
          result = {unspents: result};
          callback(null, result);
        }
      }
      catch (err) {
        callback(err, null);
      }
    });
  } 
  else {
    callback('error: no address provided', null);
  }
}

/* Returns JSON of a transaction. Includes check that a
 * transaction is provided and ensures that return from Biteasy
 * is valid data for use.
 */
function getTransaction(options, callback) {
  if (options.transaction) {
    var base = networkCheck(options.network);
    var req = base + 'transactions/' + options.transaction;

    request(req, function (error, response, body) {
      if (error) {
        callback(error, null);
      }
      try {
        if (JSON.parse(body).status === 200) {
          var data = JSON.parse(body).data;
          var vin = [];
          var vout = [];
          for (var i = 0; i < data.inputs.length; i++) {
            vin.push({
              txid: data.inputs[i].outpoint_hash,
              vout: data.inputs[i].outpoint_index,
              scriptSig: {
                  asm: data.inputs[i].script_sig_string,
                  hex: data.inputs[i].script_sig
              },
              sequence: "not provided"
            });
          }
          for (var i = 0; i < data.outputs.length; i++) {
            vout.push({
              value: data.outputs[i].value,
              index: data.outputs[i].transaction_index,
              spentTxid: "not provided",
              scriptPubKey: {
                asm: data.outputs[i].script_pub_key_string,
                hex: data.outputs[i].script_pub_key,
                reqSigs: "not provided",
                type: "not provided",
                addresses: [data.outputs[i].to_address]
              }
            });
          }
          var result = {
            hex: "not provided",
            txid: data.hash,
            version: data.version,
            locktime: "not provided",
            fee: data.fee,
            vin: vin,
            vout: vout,
            blockhash: data.in_blocks[0].hash,
            blockindex: "not provided",
            blocktime: "not provided",
            confirmations: data.confirmations,
            timeRecieved: new Date(data.created_at).getTime()
          };
          callback(null, result);
        }
      }
      catch (err) {
        callback(err, null);
      }
    });
  } 
  else {
    callback('error: no transaction provided', null);
  }
}

/* Biteasy does not provide an endpoint for pushing 
 * transactions. Returns an error upon call.
 */
function pushTransaction(options, callback) {
  callback('error no push support from biteasy', null);
}

module.exports.getWalletInfo = getWalletInfo;
module.exports.getUnspentOutputs = getUnspentOutputs;
module.exports.getTransaction = getTransaction;
module.exports.pushTransaction = pushTransaction;

// getWalletInfo({'network': '', 'address': '1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw'}, function (err, data) {console.log(err); console.log(data);});
// getUnspentOutputs({'network': '', 'address': '1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq'}, function (err, data) {console.log(err); console.log(data);});
// getTransaction({'network': 'testnet', 'transaction': 'd7c7557e5ca87d439e9ab6eb69a04a9664a0738ff20f6f083c1db2bfd79a8a26'}, function (err, data) {console.log(err); console.log(data);});
// pushTransaction(null, function (err, data) {console.log(err); console.log(data);});
