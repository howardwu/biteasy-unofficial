var request = require('request');

var Blocks = function (options, base) {

  /* Returns JSON of Get information for Block IDs. Includes check
   * that blockIds are provided and ensures that return from Biteasy
   * is valid data for use. */
  function Get(options, callback) {
    if (options && base) {
      var count = 0;
      var result = [];
      options.forEach(function (blockId) {
        var req = base + 'blocks/' + blockId;
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
            if (count === options.length - 1) {
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
  function Latest(callback) {
    if (base) {
      var req = base + 'blocks/';
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

  /* Propagates a provided blockHex. Currently Unsupported by Biteasy. */
  function Propagate(options, callback) {
    callback('error: propagate block to Biteasy. unsupported function.', null);
  }

  /* Returns JSON of Transaction information for provided Block IDs. Includes
   * check that blockIds are provided and ensures that return from Biteasy
   * is valid data for use. */
  function Transactions(options, callback) {
    if (options && base) {
      var count = 0;
      var result = [];
      options.forEach(function (blockId) {
        var req = base + 'blocks/' + blockId;
        request(req, function (error, response, body) {
          if (error) callback(error, null);
          try {
            if (JSON.parse(body).status === 200) {
              var data = JSON.parse(body).data;
              var blockResult = [];
              blockResult.push({
                blockId: blockId,
                txid: null,
                txId: null
              });
              result.push(blockResult);
            }
            else {
              console.log(JSON.parse(body).messages);
            }
            if (count === options.length - 1) {
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

  return {
    Get: Get,
    Latest: Latest,
    Propagate: Propagate,
    Transactions: Transactions
  };
}

module.exports = Blocks;
