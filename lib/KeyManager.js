// const Configstore = require("configstore");
import Configstore from "configstore";
import * as fs from "fs";
// import pkg from "/home/beyazgolge/gitrepos/cryptoPrices.js/package.json";
const pkg = JSON.parse(
  fs.readFileSync(
    "/home/beyazgolge/gitrepos/cryptoPrices.js/package.json",
    "utf8"
  )
);

export class KeyManager {
  constructor() {
    this.conf = new Configstore(pkg.name);
  }

  setKey(key) {
    this.conf.set("apiKey", key);
    return key;
  }

  getKey() {
    const key = this.conf.get("apiKey");
    if (!key) {
      throw new Error("no API Key Found -- Get a Key at https://nomics.com");
    }

    return key;
  }

  deleteKey() {
    const key = this.conf.get("apiKey");
    if (!key) {
      throw new Error("no API Key Found -- Get a Key at https://nomics.com");
    }

    this.conf.delete("apiKey");

    return;
  }
}

// module.exports = KeyManager;
