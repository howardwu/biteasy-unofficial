# biteasy-unofficial

## Installation

Install as you normally install an npm module:
```
  npm install biteasy-unofficial
```

## Usage

To use the biteasy API, simply require the module.
```
  var biteasyAPI = require(biteasy-unofficial);
```

## Examples

Provided are some sample usages of this module:

### getWalletInfo
```
  biteasyAPI.getWalletInfo({
    'network': '', 
    'address': '1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw'
  }, function (err, data) {
    if (err) {
      console.log(error);
      return;
    }
    console.log(data);
  });

```

### getUnspentOutputs
```
  biteasyAPI.getUnspentOutputs({
    'network': '',
    'address': '1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq'
  }, function (err, data) {
    if (err) {
      console.log(error);
      return;
    }
    console.log(data);
  });
```

### getTransaction
```
  biteasyAPI.getTransaction({
    'network': 'testnet',
    'transaction': 'd7c7557e5ca87d439e9ab6eb69a04a9664a0738ff20f6f083c1db2bfd79a8a26'
  }, function (err, data) {
    if (err) {
        console.log(error);
        return;
      }
      console.log(data);
    });
```

### pushTransaction
```
  biteasyAPI.pushTransaction(null, function (err, data) {
    if (err) {
      console.log(error);
      return;
    }
    console.log(data);
  });
```

## Maintainers
  * Howard Wu (howardwu) - howardwu@berkeley.edu
  * Andrew Malta (andrewmalta13) - andrew.malta@yale.edu
