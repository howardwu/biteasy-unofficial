var request = require('request');

/* Returns JSON of a transaction. Includes check that a
 * transaction is provided and ensures that return from Biteasy
 * is valid data for use.
 */
function Get(options, callback) {
  if ((options.txids || options.txIds) && options.base) {
    var transactions;
    if (options.txids) transactions = options.txids;
    else transactions = options.txIds;
    var count = 0;
    var result = [];
    transactions.forEach(function (transaction) {
      var req = options.base + 'transactions/' + transaction;
      request(req, function (error, response, body) {
        if (error) callback(error, null);
        try {
          if (JSON.parse(body).status === 200) {
            var data = JSON.parse(body).data;
            var id = null;
            if (data.in_blocks[0]) id = data.in_blocks[0].hash;
            var input = [];
            var output = [];
            data.inputs.forEach(function (inp) {
              input.push({
                txid: inp.outpoint_hash,
                txId: inp.outpoint_hash,
                vout: null, 
                scriptSig: {
                  asm: inp.script_sig_string,
                  hex: inp.script_sig
                },
                sequence: null 
              });
            });
            data.outputs.forEach(function (out) {
              output.push({
                value: out.value,
                index: out.transaction_index,
                spentTxid: null,
                scriptPubKey:
                {
                  asm: out.script_sig_string,
                  hex: out.script_sig,
                  reqSigs: null,
                  type: null,
                  addresses: [
                    out.to_address
                  ]
                }
              });
            });
            result.push({
              txHex: null,
              hex : null,
              txid: data.hash,
              txId: data.hash,
              version: data.version,
              locktime: null,
              fee: data.fee,
              vin: input,
              vout: output,
              blockhash: id,
              blockindex: null,
              blocktime: null,
              confirmations: data.confirmation,
              timeReceived: data.created_at, 
            });
            if (count === transactions.length - 1) {
              callback(null, JSON.stringify(result));
            } else {
              count += 1;
            }
          }
          else {
            callback(JSON.parse(body).messages, null);
          }
        }
        catch (err) {
          callback(err, null);
        }
      });
    });
  }
  else {
    callback('error: no txids and/or base provided', null);
  }
}

/* Returns JSON of Latest information for Transactions. Ensures that 
 * return from Biteasy is valid data for use. */
function Latest(options, callback) {
  if (options.base) {
    var req = options.base + 'transactions/';
    request(req, function (error, response, body) {
      if (error) callback(error, null);
      try {
        if (JSON.parse(body).status === 200) {
          var data = JSON.parse(body).data.transactions;
          var result = [];
          for (var i = 0; i < data.length; i++) {
            var input = [];
            var output = [];
            data[i].inputs.forEach(function (inp) {
              input.push({
                txid: inp.outpoint_hash,
                txId: inp.outpoint_hash,
                vout: inp.outpoint_index, 
                scriptSig: 
                  {
                    asm: inp.script_sig_string,
                    hex: inp.script_sig
                  },
                sequence: null
              });
            });
            data[i].outputs.forEach(function (out) {
              output.push({
                value: out.value,
                index: out.transaction_index,
                spentTxid: null,
                scriptPubKey:
                {
                  asm: out.script_sig_string,
                  hex: out.script_sig,
                  reqSigs: null,
                  type: null,
                  addresses: [
                    out.to_address
                  ]
                }
              });
            });
            result.push({
              hex: null,
              txHex: null,
              txid: data[i].hash,
              txId: data[i].hash,
              version: data[i].version,
              locktime: null,
              fee: data[i].fee,
              vin: input,
              vout: output,
              blockhash: null,
              blockindex: null,
              blocktime: null,
              confirmations: data[i].confirmations,
              timeReceived: data[i].created_at, 
            });
          }
          callback(null, JSON.stringify(result));
        }
        else {
          callback(JSON.parse(body).messages, null);
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

/* Returns JSON of Output information for provided Transaction IDs. Includes
 * check that txids or txIds and vout are provided and ensures that return
 * from Biteasy is valid data for use. */
function Outputs(options, callback) {
  if (options.outputs && options.base) {
    var count = 0;
    var result = [];
    var base = options.base;
    var length = options.outputs.length;
    options.outputs.forEach(function (options) {
      if ((options.txid || options.txId) && options.vout >= 0) {
        var transaction;
        if (options.txid) transaction = options.txid;
        else transaction = options.txId;
        var req = base + 'transactions/' + transaction;
        request(req, function (error, response, body) {
          if (error) callback(error, null);
          try {
            if (JSON.parse(body).status === 200) {
              var data = JSON.parse(body).data;
              result.push({
                scriptPubKey: null,
                txid: transaction,
                txId: transaction,
                value: data.outputs_value,
                vout: options.vout
              });
              if (count === length - 1) {
                callback(null, JSON.stringify(result));
              } else {
                count += 1;
              }
            }
            else {
              callback(JSON.parse(body).messages, null);
            }
          }
          catch (err) {
            callback(err, null);
          }
        });
      }
      else {
        callback('error: an options parameter is missing', null);
      }
    });
  }
  else {
    callback('error: no outputs or base provided', null);
  }
}


/* Propogates a provided Transaction Hex. Currently Unsupported by Biteasy. */
function Propogate(options, callback) {
  callback('error: propogate transaction to Biteasy. unsupported function.', null);
}

/* Returns JSON of Status information for provided Transaction IDs. Includes
 * check that txids or txIds are provided and ensures that return from Biteasy
 * is valid data for use. */
function Status(options, callback) {
  if ((options.txids || options.txIds) && options.base) {
    var transactions;
    if (options.txids) transactions = options.txids;
    else transactions = options.txIds;
    var count = 0;
    var result = [];
    transactions.forEach(function (transaction) {
      var req = options.base + 'transactions/' + transaction;
      request(req, function (error, response, body) {
        if (error) callback(error, null);
        try {
          if (JSON.parse(body).status === 200) {
            var data = JSON.parse(body).data;
            var id = null;
            if (data.in_blocks[0]) id = data.in_blocks[0].hash;
            result.push({
              blockId: id,
              txid: transaction,
              txId: transaction
            });
            if (count === transactions.length - 1) {
              callback(null, JSON.stringify(result));
            } else {
              count += 1;
            }
          }
          else {
            callback(JSON.parse(body).messages, null);
          }
        }
        catch (err) {
          callback(err, null);
        }
      });
    });
  }
  else {
    callback('error: no txids and/or base provided', null);
  }
}

module.exports.Get = Get;
module.exports.Latest = Latest;
module.exports.Outputs = Outputs;
module.exports.Propogate = Propogate;
module.exports.Status = Status;
