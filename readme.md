# ETC-Client dev info dumper

This REPL allows to query and dump ETC info and generate entities defined in [Scala ETC-Client](https://github.com/input-output-hk/etc-client). 

Also, [web3.js](https://github.com/ethereum/web3.js/) API is exposed under `web3` object.

_Note: This might not generate code that compiles. The purpose of this tool is to save time when creating entities while testing, not to create a Js to Scala converter_

## Requisies

- NodeJs 4.x +

## How to install
1. git clone https://github.com/AlanVerbner/etc-client-dev-info-dumper.git && etc-client-dev-info-dumper
2. `yarn install` (or `npm install`)

## Usage

```
usage: index.js [-h] [-v] [-p PROVIDER]

Optional arguments:
  -h, --help                        Show this help message and exit.
  -v, --version                     Show program's version number and exit.
  -p PROVIDER, --provider PROVIDER  Web3JS http provider
```

## API

Object `dumper` is exposed within the REPL. The following functions can be executed:

- blockHeader: Dumps PV62 block header information
  - Paramters: `String|Number` - The block number or hash. Or the string "earliest", "latest" or "pending"
  - Dumps: `io.iohk.ethereum.network.p2p.messages.PV62.BlockHeader`
  - [Ref](https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethgetblock)
  - Example: `dumper.blockHeader(0)`

  
  ```scala
  BlockHeader(
    parentHash = ByteString(Hex.decode("0000000000000000000000000000000000000000000000000000000000000000")),
    ommersHash = ByteString(Hex.decode("1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347")),
    beneficiary = ByteString(Hex.decode("0000000000000000000000000000000000000000")),
    stateRoot = ByteString(Hex.decode("d7f8974fb5ac78d9ac099b9ad5018bedc2ce0a72dad1827a1709da30580f0544")),
    transactionsRoot = ByteString(Hex.decode("56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421")),
    receiptsRoot = ByteString(Hex.decode("56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421")),
    logsBloom = ByteString(Hex.decode("00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")),
    difficulty = BigInt("17179869184"),
    number = 0,
    gasLimit = 5000,
    gasUsed = 0,
    unixTimestamp = 0,
    extraData = ByteString(Hex.decode("11bbe8db4e347b4e8c937c1c8370e4b5ed33adb3db69cbdb7a38e1e50b1b82fa")),
    mixHash = ByteString(Hex.decode("0000000000000000000000000000000000000000000000000000000000000000")),
    nonce = ByteString(Hex.decode("0000000000000042"))
  )
  ```

- blockBody: Dumps PV62 block body
  - Paramters: `String|Number` - The block number or hash. Or the string "earliest", "latest" or "pending"
  - Dumps: `io.iohk.ethereum.network.p2p.messages.PV62.BlockBody`
  - [Ref](https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethgetblock)
  - Example: `dumper.blockBody(123123)`
  

  ```scala
  BlockBody(
    transactionList = Seq[Transaction](
      Transaction(
        nonce = 49,
        gasPrice = BigInt("50000000000"),
        gasLimit = 21000,
        receivingAddress = ByteString(Hex.decode("4c74b6f32c9680acb5fe0e72b7aa95c612540a04")),
        value = BigInt("8000000000000000000"),
        payload = 0x,
        pointSign = 0x1c.toByte,
        signatureRandom = ByteString(Hex.decode("8a91f5f8febc73ea8373c12fbe870c7d020b867214bad8ceae92e4357c635730")),
        signature = ByteString(Hex.decode("375c507963d234e21a3572c26dce82f672a0e8b7619abfb6e8cee847c8499334"))
      ),
      Transaction(
        nonce = 3,
        gasPrice = BigInt("50000000000"),
        gasLimit = 21000,
        receivingAddress = ByteString(Hex.decode("c47aaa860008be6f65b58c6c6e02a84e666efe31")),
        value = BigInt("5418105439999990000"),
        payload = 0x,
        pointSign = 0x1b.toByte,
        signatureRandom = ByteString(Hex.decode("10fa696780e5f8afd5b2cf44e34d9513c1d64648267ac5970c5ae80f411e121")),
        signature = ByteString(Hex.decode("18b691fcff2c625c2ad46b6611b99400609c38bbab2b865ae8a32357088d4f85"))
      )  
    ),
    uncleNodesList = Seq[BlockHeader](
      BlockHeader(
        parentHash = ByteString(Hex.decode("ffcada6eabb12ca9464f07a12c4a9dd584748531ba0841288e063823675b5965")),
        ommersHash = ByteString(Hex.decode("1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347")),
        beneficiary = ByteString(Hex.decode("d0ee3f53ee0fcf3f9fbccdd17bd1b6441ddc2074")),
        stateRoot = ByteString(Hex.decode("7f1fe1164ce8ce659f9c62a7ea06e1ed4f3c32bc59862d2bbd46701db9a2d1a5")),
        transactionsRoot = ByteString(Hex.decode("56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421")),
        receiptsRoot = ByteString(Hex.decode("56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421")),
        logsBloom = ByteString(Hex.decode("00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")),
        difficulty = BigInt("4512067428847"),
        number = 123121,
        gasLimit = 3141592,
        gasUsed = 0,
        unixTimestamp = 1440206379,
        extraData = ByteString(Hex.decode("")),
        mixHash = ByteString(Hex.decode("c68a0e7484d36d648571435c94a09819c1f8266a59ed98c131cef957b04be607")),
        nonce = ByteString(Hex.decode("26d8ec19db5ec2bb"))
      )  
    )
  )
  ```

- transaction: Dumps a transaction
  - Paramters: `String` - The transaction hash.
  - Dumps: `io.iohk.ethereum.network.p2p.messages.CommonMessages.Transaction`
  - [Ref](https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethgettransaction)
  - Example: `dumper.transaction("0xd29c8303a9c3f5287640014d0f67289c5393b612e1dea305c826e18427af9f9d")`


  ```scala
  Transaction(
    nonce = 49,
    gasPrice = BigInt("50000000000"),
    gasLimit = 21000,
    receivingAddress = ByteString(Hex.decode("4c74b6f32c9680acb5fe0e72b7aa95c612540a04")),
    value = BigInt("8000000000000000000"),
    payload = 0x,
    pointSign = 0x1c.toByte,
    signatureRandom = ByteString(Hex.decode("8a91f5f8febc73ea8373c12fbe870c7d020b867214bad8ceae92e4357c635730")),
    signature = ByteString(Hex.decode("375c507963d234e21a3572c26dce82f672a0e8b7619abfb6e8cee847c8499334"))
  )
  ```

- receipt: Dumps PV63 receipt
  - Paramters: `String` - The transaction hash.
  - Dumps: `io.iohk.ethereum.network.p2p.messages.PV63.Receipt`
  - [Ref](https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethgettransactionreceipt)
  - Example: `dumper.receipt("0xd29c8303a9c3f5287640014d0f67289c5393b612e1dea305c826e18427af9f9d")`


  ```scala
  Receipt(
    postTransactionStateHash = ByteString(Hex.decode("b76aff3f5ffe31fe41c41bcd01b4144d76cba8fc9dceac350382104b6fab2048")),
    cumulativeGasUsed = 21000,    
    logsBloomFilter = ByteString(Hex.decode("00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")),
    logs = Seq[TransactionLog]()
  )
  ```



