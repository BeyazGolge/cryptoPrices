#!/usr/bin/env

// const program = require("commander");
import { program } from "commander";
import * as fs from "fs";
const pkg = JSON.parse(
  fs.readFileSync(
    "/home/beyazgolge/gitrepos/cryptoPrices.js/package.json",
    "utf8"
  )
);

// import * as pkg from "../package.json";
// const pkg = require("../package.json");

program
  .version(pkg.version)
  .command("key", "Manage API Key -- https://coinmarketcap.com/api/")
  .command("check", "Check coin Prices")
  .parse(process.argv);

console.log("Hello from coindex");
