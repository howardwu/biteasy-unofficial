var request = require('request');

var Transactions = function (options, base) {
  /* Returns JSON of a transaction. Includes check that a
   * transaction is provided and ensures that return from Biteasy
   * is valid data for use. */
  function Get(options, callback) {
    if (options && base) {
      var transactions = options;
      var count = 0;
      var result = [];
      transactions.forEach(function (transaction) {
        var req = base + 'transactions/' + transaction;
        request(req, function (error, response, body) {
          if (error) callback(error, null);
          try {
            if (JSON.parse(body).status === 200) {
              var data = JSON.parse(body).data;
              var id = null;
              if (data.in_blocks[0]) id = data.in_blocks[0].hash;
              var input = [];
              var output = [];
              var time = new Date(data.created_at);
              time = time.getTime();
              data.inputs.forEach(function (inp) {
                input.push({
                  txid: inp.outpoint_hash,
                  txId: inp.outpoint_hash,
                  vout: inp.outpoint_index,
                  addresses: [
                    inp.from_address
                  ],
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
                  n: out.transaction_index,
                  spentTxid: null,
                  scriptPubKey:
                  {
                    asm: out.script_pub_key_string,
                    hex: out.script_pub_key,
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
                timeReceived: time, 
              });
            }
            else {
              console.log(JSON.parse(body).messages);
            }
            if (count === transactions.length - 1) {
              callback(null, result);
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
      callback('error: no txids and/or base provided', null);
    }
  }

  /* Returns JSON of Latest information for Transactions. Ensures that 
   * return from Biteasy is valid data for use. */
  function Latest(callback) {
    if (base) {
      var req = base + 'transactions/';
      request(req, function (error, response, body) {
        if (error) callback(error, null);
        try {
          if (JSON.parse(body).status === 200) {
            var data = JSON.parse(body).data.transactions;
            var input = [];
            var output = [];
            var time = new Date(data[0].created_at);
            time = time.getTime();
            data[0].inputs.forEach(function (inp) {
              input.push({
                txid: inp.outpoint_hash,
                txId: inp.outpoint_hash,
                vout: inp.outpoint_index,
                addresses: [
                  inp.from_address
                ],
                scriptSig: 
                  {
                    asm: inp.script_sig_string,
                    hex: inp.script_sig
                  },
                sequence: null
              });
            });
            data[0].outputs.forEach(function (out) {
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
            var result = {
              hex: null,
              txHex: null,
              txid: data[0].hash,
              txId: data[0].hash,
              version: data[0].version,
              locktime: null,
              fee: data[0].fee,
              vin: input,
              vout: output,
              blockhash: null,
              blockindex: null,
              blocktime: null,
              confirmations: data[0].confirmations,
              timeReceived: time, 
            };
            callback(null, result);
          }
          else {
            console.log(JSON.parse(body).messages);
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
  var base2 = base;
  function Outputs(options, callback) {
    var base = base2;
    if (options && base) {
      var count = 0;
      var result = [];
      var base = base;
      var length = options.length;
      options.forEach(function (opt) {
        if ((opt.txid || opt.txId) && opt.vout >= 0) {
          var transaction;
          if (opt.txid) transaction = opt.txid;
          else transaction = opt.txId;
          var req = base + 'transactions/' + transaction;
          request(req, function (error, response, body) {
            if (error) callback(error, null);
            try {
              if (JSON.parse(body).status === 200) {
                var data = JSON.parse(body).data.outputs;
                if (data.length > opt.vout) {
                  data.forEach(function (output) {
                    if (opt.vout === output.transaction_index) {
                      result.push({
                        scriptPubKey: output.script_pub_key,
                        txid: transaction,
                        txId: transaction,
                        value: output.value,
                        vout: output.transaction_index
                      });
                    }
                  });
                } else {
                  callback('error: vout incorrect', null);
                }
              }
              else {
                console.log(JSON.parse(body).messages);
              }
              if (count === length - 1) {
                result.sort(function(a, b) {
                  return a.vout > b.vout;
                });
                callback(null, result);
              }
              count += 1;
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


  /* Propagates a provided Transaction Hex. Currently Unsupported by Biteasy. */
  function Propagate(options, callback) {
    callback('error: propagate transaction to Biteasy. unsupported function.', null);
  }

  /* Returns JSON of Status information for provided Transaction IDs. Includes
   * check that txids or txIds are provided and ensures that return from Biteasy
   * is valid data for use. */
  function Status(options, callback) {
    if (options && base) {
      var transactions = options;
      var count = 0;
      var result = [];
      transactions.forEach(function (transaction) {
        var req = base + 'transactions/' + transaction;
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
            }
            else {
              console.log(JSON.parse(body).messages);
            }
            if (count === transactions.length - 1) {
              callback(null, result);
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
      callback('error: no txids and/or base provided', null);
    }
  }

  return {
    Get: Get,
    Latest: Latest,
    Outputs: Outputs,
    Propagate: Propagate,
    Status: Status
  };
}

module.exports = Transactions;
