# biteasy-unofficial

A Biteasy adapter built to standardize the output of requests to follow the union of the bitcoind and common-blockchain convention. Aliases are introduced in the return of functions to account for differences in convention between the two standards. It is our hope that the Bitcoin community will come to an agreement on proper style and convention for requests on addresses, transactions, and blocks.

## Installation

Install as you normally install an npm module:
```
  npm install biteasy-unofficial
```

## Usage

To use the Biteasy API, simply require the module.
```
  var biteasyAPI = require('biteasy-unofficial');
```
For Mainnet, use ```biteasyAPI({ network: 'mainnet' })``` when calling a function. For Testnet, use ```biteasyAPI({network: 'testnet'})``` when calling a function. By default, if no parameter is provided, Mainnet will be used.

### Addresses

#### biteasyAPI({ network: 'mainnet' }).Addresses.Summary
Summary returns a JSON of information regarding provided Bitcoin addresses.
```
  biteasyAPI({ network: 'mainnet' }).Addresses.Summary({
    addresses: ["1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq", "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"]
  }, function (err, resp) {
    console.log(resp);
  });
```

#### biteasyAPI({ network: 'mainnet' }).Addresses.Transactions
Transactions returns a JSON with a list of transactions associated with the provided Bitcoin addresses.
```
  biteasyAPI({ network: 'mainnet' }).Addresses.Transactions({
    addresses: ["1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq", "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"]
  }, function (err, resp) {
    console.log(resp);
  });

```

#### biteasyAPI({ network: 'mainnet' }).Addresses.Unspents
Unspents returns a JSON with a list of unspent outputs for the provided Bitcoin addresses.

```
  biteasyAPI({ network: 'mainnet' }).Addresses.Unspents({
    addresses: ["1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq", "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"]
  }, function (err, resp) {
    console.log(resp);
  });
```

### Blocks

#### biteasyAPI({ network: 'mainnet' }).Blocks.Get
Get returns a JSON of information for the provided block IDs.
```
  biteasyAPI({ network: 'mainnet' }).Blocks.Get({
    blockIds: [
      "00000000000000000216a936ebc1962e319a51bab8d3eae69335ac940284491d", 
      "00000000000000001034f207d3ce18f03054ddfb0e4dba712f5b76cb1cda9499"]
  }, function (err, resp) {
    console.log(resp);
  });
```

#### biteasyAPI({ network: 'mainnet' }).Blocks.Latest
Latest returns a JSON of the latest blocks to hit Biteasy's endpoint.
```
  biteasyAPI({ network: 'mainnet' }).Blocks.Latest(function (err, resp) {
    console.log(resp);
  });
```

#### biteasyAPI({ network: 'mainnet' }).Blocks.Propogate
Propogate is unsupported with Biteasy as of now. Any call to Propogate will return an error.
```
  biteasyAPI({ network: 'mainnet' }).Blocks.Propogate({
    blockHex: ''
  }, function (err, resp) {
    console.log(resp);
  });
```

#### biteasyAPI({ network: 'mainnet' }).Blocks.Transactions
Transactions returns a JSON of transactions for the provided block IDs.
```
  biteasyAPI({ network: 'mainnet' }).Blocks.Transactions({
    blockIds: [
      "00000000000000000216a936ebc1962e319a51bab8d3eae69335ac940284491d",
      "00000000000000001034f207d3ce18f03054ddfb0e4dba712f5b76cb1cda9499"]
  }, function (err, resp) {
    console.log(resp);
  });
```

### Transactions

#### biteasyAPI({ network: 'mainnet' }).Transactions.Get
Get returns a JSON with transaction data for provided transaction IDs.
```
  biteasyAPI({ network: 'mainnet' }).Transactions.Get({
    txIds: [
      "186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836",
      "9375818c85a6712416dac6edd403498180ee9ee0e604bd11ec35beaea384da51"]
  }, function (err, resp) {
    console.log(resp);
  });
```

#### biteasyAPI({ network: 'mainnet' }).Transactions.Latest
Latest returns a JSON of the latest transactions to hit Biteasy's endpoint (mostly unconfirmed).
```
  biteasyAPI({ network: 'mainnet' }).Transactions.Latest(function (err, resp) {
    console.log(resp);
  });
```

#### biteasyAPI({ network: 'mainnet' }).Transactions.Outputs
Outputs returns a JSON of output information for provided transaction IDs.
```
  biteasyAPI({ network: 'mainnet' }).Transactions.Outputs({
    outputs: [
      {
        vout: 0,
        txId: "186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836"
      }
    ]
  }, function (err, resp) {
    console.log(resp);
  });
```

#### biteasyAPI({ network: 'mainnet' }).Transactions.Propogate
Propogate is unsupported with Biteasy as of now. Any call to Propogate will return an error.
```
  biteasyAPI({ network: 'mainnet' }).Transactions.Propogate({
    hex: ''
  }, function (err, resp) {
    console.log(resp);
  });
```

#### biteasyAPI({ network: 'mainnet' }).Transactions.Status
Transactions returns a JSON of transactions for the provided transaction IDs.
```
  biteasyAPI({ network: 'mainnet' }).Transactions.Status({
    txIds: [
      "186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836",
      "9375818c85a6712416dac6edd403498180ee9ee0e604bd11ec35beaea384da51"]
  }, function (err, resp) {
    console.log(resp);
  });
```

## Convention

Standard convention is described fully in the ```types.json``` file.

## Maintainers
  * Howard Wu (howardwu) - howardwu@berkeley.edu
  * Andrew Malta (andrewmalta13) - andrew.malta@yale.edu
