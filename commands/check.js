import { KeyManager } from "../lib/KeyManager.js";
import { CryptoAPI } from "../lib/CryptoAPI.js";

export const check = {
  async price(cmd) {
    try {
      const keyManager = new KeyManager();
      const key = keyManager.getKey();
      const api = new CryptoAPI(key);
      const priceOutputData = await api.getPricesData(cmd.coin);
      console.log(priceOutputData);
    } catch (error) {
      console.error(colors.red(error.message));
    }
  },
};
