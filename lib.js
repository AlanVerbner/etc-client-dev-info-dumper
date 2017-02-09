'use strict';

const chalk = require('chalk');

const asByteString = function (value) {
  const valueAsString = `${value}`.replace("0x", "");
  if (!valueAsString) return "ByteString.empty"
  else return `ByteString(Hex.decode(\"${valueAsString}\"))`
}

const asBigInt = function (value) {
  return `BigInt("${value}")`
}

const asAddress = function (address) {
  return `Address(${asByteString(address)})`
}

const transactionAsString = function (tx) {
  return `SignedTransaction(
  tx = Transaction(
    nonce = ${asBigInt(tx.nonce)},
    gasPrice = ${asBigInt(tx.gasPrice.toString())},
    gasLimit = ${asBigInt(tx.gas)},
    receivingAddress = ${asAddress(tx.to)},
    value = ${asBigInt(tx.value.toString())},
    payload = ${asByteString(tx.input)}
  ),
  pointSign = ${tx.v}.toByte,
  signatureRandom = ${asByteString(tx.r)},
  signature = ${asByteString(tx.s)}
)`
}

const headerAsString = function (block) {
  return `BlockHeader(
  parentHash = ${asByteString(block.parentHash)},
  ommersHash = ${asByteString(block.sha3Uncles)},
  beneficiary = ${asByteString(block.miner)},
  stateRoot = ${asByteString(block.stateRoot)},
  transactionsRoot = ${asByteString(block.transactionsRoot)},
  receiptsRoot = ${asByteString(block.receiptsRoot)},
  logsBloom = ${asByteString(block.logsBloom)},
  difficulty = ${asBigInt(block.difficulty)},
  number = ${block.number},
  gasLimit = ${block.gasLimit},
  gasUsed = ${block.gasUsed},
  unixTimestamp = ${block.timestamp},
  extraData = ${asByteString(block.extraData)},
  mixHash = ${asByteString(block.mixHash)},
  nonce = ${asByteString(block.nonce)}
)`
}

const bodyAsString = function (web3, block) {
  return `BlockBody(
  transactionList = Seq[Transaction](
    ${block.transactions.map(txId => transactionAsString(web3.eth.getTransaction(txId)))}  
  ),
  uncleNodesList = Seq[BlockHeader](
    ${block.uncles.map((uncleId, index) => headerAsString(web3.eth.getUncle(block.hash, index)))}  
  )
)`
}

const receiptAsString = function (tx) {
  return `Receipt(
  postTransactionStateHash = ${asByteString(receipt.root)},
  cumulativeGasUsed = ${receipt.cumulativeGasUsed},    
  logsBloomFilter = ${asByteString(receipt.logsBloom)},
  logs = Seq[TransactionLog]()
)`
}

const blockHeader = (web3) => (blockId) => {
  var block = web3.eth.getBlock(blockId)
  if (block) console.log(headerAsString(block));
  else console.error(chalk.red("Block not found"));
}

const blockBody = (web3) => (blockId) => {
  var block = web3.eth.getBlock(blockId)

  if (block) console.log(bodyAsString(web3, block));
  else console.error(chalk.red("Block not found"));
}

const transaction = (web3) => (txId) => {
  var tx = web3.eth.getTransaction(txId)

  if (tx) console.log(transactionAsString(tx))
  else console.error(chalk.red("Transaction not found"));
}

const receipt = (web3) => (txId) => {
  var receipt = web3.eth.getTransactionReceipt(txId)

  if (receipt) console.log(receiptAsString(receipt))
  else console.error(chalk.red("Receipt not found"));
}

module.exports = {
  create: web3 => {
    return {
      blockHeader: blockHeader(web3),
      blockBody: blockBody(web3),
      transaction: transaction(web3),
      receipt: receipt(web3),
    }
  }
}