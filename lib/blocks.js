var request = require('request');

/* Returns JSON of Get information for Block IDs. Includes check
 * that blockIds are provided and ensures that return from Biteasy
 * is valid data for use. */
function Get(options, callback) {
  if (options.blockIds && options.base) {
    var count = 0;
    var result = [];
    options.blockIds.forEach(function (blockId) {
      var req = options.base + 'blocks/' + blockId;
      request(req, function (error, response, body) {
        if (error) callback(error, null);
        try {
          if (JSON.parse(body).status === 200) {
            var data = JSON.parse(body).data;
            result.push({
              blockHex: null,
              blockId: blockId
            });
          }
          else {
            console.log(JSON.parse(body).messages);
          }
          if (count === options.blockIds.length - 1) {
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
    callback('error: no block IDs provided', null);
  }
}

/* Returns JSON of Latest information for Blocks. Ensures that 
 * return from Biteasy is valid data for use. */
function Latest(options, callback) {
  if (options.base) {
    var req = options.base + 'blocks/';
    request(req, function (error, response, body) {
      if (error) callback(error, null);
      try {
        if (JSON.parse(body).status === 200) {
          var data = JSON.parse(body).data.blocks;
          var result = {
            blockHex: null,
            blockId: data[0].hash
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
    callback('error: no block IDs provided', null);
  }
}

/* Propogates a provided blockHex. Currently Unsupported by Biteasy. */
function Propogate(options, callback) {
  callback('error: propogate block to Biteasy. unsupported function.', null);
}

/* Returns JSON of Transaction information for provided Block IDs. Includes
 * check that blockIds are provided and ensures that return from Biteasy
 * is valid data for use. */
function Transactions(options, callback) {
  if (options.blockIds && options.base) {
    var count = 0;
    var result = [];
    options.blockIds.forEach(function (blockId) {
      var req = options.base + 'blocks/' + blockId;
      request(req, function (error, response, body) {
        if (error) callback(error, null);
        try {
          if (JSON.parse(body).status === 200) {
            var data = JSON.parse(body).data;
            result.push({
              blockId: blockId,
              result: [
                {
                  txid: null,
                  txId: null
                }
              ]
            });
          }
          else {
            console.log(JSON.parse(body).messages);
          }
          if (count === options.blockIds.length - 1) {
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
    callback('error: no block IDs provided', null);
  }
}

module.exports.Get = Get;
module.exports.Latest = Latest;
module.exports.Propogate = Propogate;
module.exports.Transactions = Transactions;
