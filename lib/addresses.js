var request = require('request');

var Addresses = function (options, base) {
  /* Returns JSON of Summary information for Addresses. Includes check
   * that addresses are provided and ensures that return from Biteasy
   * is valid data for use. */
  function Summary(options, callback) {
    if (options.addresses) {
      var count = 0;
      var globalResult = [];
      options.addresses.forEach(function (address) {
        var req = base + 'addresses/' + address;
        var tx = base + 'transactions?address=' + address + '&per_page=MAX'; 
        request(req, function (error, response, body) {
          if (error) callback(error, null);
          request(tx, function (error, response, txs) {
            if (error) callback(error, null);
            try {
              if (JSON.parse(body).status === 200 && JSON.parse(txs).status === 200) {
                var data = JSON.parse(body).data;
                var tx = JSON.parse(txs).data.transactions;
                globalResult.push({
                  address: address,
                  balance: data.balance,
                  totalReceived: data.total_received,
                  totalSent: data.total_sent,
                  txCount: tx.length,
                });
              }
              else {
                console.log(JSON.parse(body).messages);
              }
              if (count === options.addresses.length - 1) {
                callback(null, globalResult);
              }
              count += 1;
            }
            catch (err) {
              callback(err, null);
            }
          });
        });
      });
    }
    else {
      callback('error: no address provided', null);
    }
  }

  /* Returns JSON of Transaction information for Addresses. Includes check
   * that addresses are provided and ensures that return from Biteasy
   * is valid data for use. */
  function Transactions(options, callback) {
     if (options.addresses) {
      var count = 0;
      var globalResult = [];
      options.addresses.forEach(function (address) {
        var tx = base + 'transactions?address=' + address + '&per_page=MAX';
        request(tx, function (error, response, txs) {
          if (error) callback(error, null);
          try {
            if (JSON.parse(txs).status === 200) {
              var transactions = JSON.parse(txs).data.transactions;
              var addressResult = [];
              transactions.forEach(function (transaction) {
                addressResult.push({
                  blockHeight: transaction.in_blocks[0].height,
                  blockId: transaction.in_blocks[0].hash,
                  hex: null,
                  txHex: null,
                  txid: transaction.hash,
                  txId: transaction.hash
                });
              });
              globalResult.push({
                address: address,
                result: addressResult
              });
            }
            else {
              console.log(JSON.parse(txs).messages);
            }
            if (count === options.addresses.length - 1) {
              callback(null, globalResult);
            }
            count += 1;
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

  /* Returns JSON of Unspents information for Addresses. Includes check
   * that addresses are provided and ensures that return from Biteasy
   * is valid data for use. */
  function Unspents(options, callback) {
    if (options.addresses) {
      var count = 0;
      var globalResult = [];
      options.addresses.forEach(function (address) {
        var req = base + 'addresses/' + address + '/unspent-outputs/';
        request(req, function (error, response, body) {
          if (error) callback(error, null);
          try {
            if (JSON.parse(body).status === 200) {
              var unspents = JSON.parse(body).data.outputs;
              var result = [];
              unspents.forEach(function (unspent) {
                result.push({
                  address: address,
                  confirmations: null,
                  txid: unspent.transaction_hash,
                  txId: unspent.transaction_hash,
                  value: unspent.value,
                  amount: unspent.value,
                  vout: unspent.transaction_index,
                  scriptPubKey: unspent.script_pub_key,
                });
              });
              globalResult.push({
                address: address,
                result: result
              });
            }
            else {
              console.log(JSON.parse(txs).messages);
            }
            if (count === options.addresses.length - 1) {
              callback(null, globalResult);
            }
            count += 1;
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

  return {
    Summary: Summary,
    Transactions: Transactions,
    Unspents: Unspents
  };
}
  
module.exports = Addresses;
