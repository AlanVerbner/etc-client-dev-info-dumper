#!/usr/bin/env node

const repl = require("repl");
const Web3 = require("web3");
const lib = require("./lib");
const ArgumentParser = require('argparse').ArgumentParser;
const chalk = require("chalk")

const defaultProvider = "http://localhost:8545"

var parser = new ArgumentParser({
  version: '0.0.1',
  addHelp: true,
  description: 'ETC-Client dumper'
});

parser.addArgument(
  ['-p', '--provider'], {
    help: 'Web3JS http provider'
  }
);

var args = parser.parseArgs();

const web3 = new Web3(new Web3.providers.HttpProvider(args.provider || defaultProvider));
const dumper = lib.create(web3);

console.log(`
  ${chalk.green("----------------------------------")}
  ${chalk.green("--- ETC-Client Dev Info Dumper ---")}
  ${chalk.green("----------------------------------")}

  ${chalk.green("Provider         : " + web3.currentProvider.host)}
  ${chalk.green("Last Block #     : " + web3.eth.blockNumber)}
  ${chalk.green("Last Block       : " + web3.eth.getBlock(web3.eth.blockNumber).hash)}
  ${chalk.green("Mining?          : " + web3.eth.mining)}
  ${chalk.green("Peer Count       : " + web3.net.peerCount)}
  ${chalk.green("Web3 api version : " + web3.version.api)}
`)

var replServer = repl.start({
  prompt: "> ",
  ignoreUndefined: true
});

replServer.context.web3 = web3;
replServer.context.dumper = dumper;