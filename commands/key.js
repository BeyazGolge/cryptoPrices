// const colors = require("colors");
// const inquirer = require("inquirer");
// const KeyManager = require("../lib/KeyManager").default;

import colors from "colors";
import inquirer from "inquirer";
import { KeyManager } from "../lib/KeyManager.js";
import { isRequired } from "../utils/validation.js";

export const key = {
  async set() {
    const keyManager = new KeyManager();
    const input = await inquirer.prompt([
      {
        type: "input",
        name: "key",
        message: colors.green("Enter API Key ") + "https://nomics.com",
        validate: isRequired,
      },
    ]);

    const key = keyManager.setKey(input.key);
    if (key) {
      console.log(colors.blue("API Key Set"));
    }
  },
  show() {
    try {
      const keyManager = new KeyManager();
      const key = keyManager.getKey();
      console.log("Current API Key : ", colors.yellow(key));
      return key;
    } catch (error) {
      console.error(colors.red(error.message));
    }
  },
  remove() {
    try {
      const keyManager = new KeyManager();
      keyManager.deleteKey();
      console.log(colors.blue("Key removed"));
      return;
    } catch (error) {}
  },
};

// module.exports = key;
