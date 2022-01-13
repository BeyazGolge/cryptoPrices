import axios from "axios";
import colors from "colors";

export default class CryptoAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
    this.axiosConfig = {
      headers: {
        "X-CMC_PRO_API_KEY": this.apiKey,
      },
      baseURL: "https://pro-api.coinmarketcap.com/v1/cryptocurrency",
      url: "",
      method: "GET",
      params: undefined,
    };
  }

  async getPricesData(coinOption) {
    try {
      if (coinOption !== "") {
        this.axiosConfig.url = `/quotes/latest?symbol=${coinOption}`;
        console.log(this.axiosConfig);
        const res = await axios(this.axiosConfig);

        let price = res.data.data[coinOption].quote.USD.price.toFixed(2);

        let output = `${colors.red(coinOption)} | ${colors.yellow(price)}$`;

        return output;
      } else {
        this.axiosConfig.url = "/listings/latest";
        this.axiosConfig.params = {
          start: "1",
          limit: "15",
          sort: "market_cap",
        };
        const res = await axios(this.axiosConfig);
        let output = "";
        res.data.data.forEach((item) => {
          output += `${colors.red(item.symbol)} | ${colors.yellow(
            item.quote.USD.price.toFixed(2)
          )}$ \n`;
        });
        return output;
      }
    } catch (error) {
      this.handleAPIError(error);
    }
  }
  handleAPIError(err) {
    if (err.response.status === 401) {
      throw new Error(
        "Your API key is invalid, go to https://coinmarketcap.com/api/"
      );
    } else if (err.response.status === 404) {
      throw new Error("API is not responding");
    } else {
      throw new Error("Something went wrong");
    }
  }
}
