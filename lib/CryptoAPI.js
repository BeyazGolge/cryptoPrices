import axios from "axios";
import colors from "colors";

export class CryptoAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
  }

  async getPricesData(coinOption) {
    try {
      if (coinOption !== "") {
        const res = await axios.get(`${this.baseUrl}?symbol=${coinOption}`, {
          headers: {
            "X-CMC_PRO_API_KEY": this.apiKey,
          },
        });
        //let output = `${res.data[0].name} | ${res.data[0].symbol} | ${res.data[0].quote.USD.price}`;
        let price = res.data.data[coinOption].quote.USD.price.toFixed(2);

        let output = `${colors.red(coinOption)} | ${colors.yellow(price)}$`;

        return output;
      } else {
        const res = await axios.get(
          `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`,
          {
            headers: {
              "X-CMC_PRO_API_KEY": this.apiKey,
            },
            qs: {
              start: "1",
              limit: "15",
              sort: "market_cap",
            },
          }
        );
        let output = "";
        res.data.data.forEach((item) => {
          output += `${colors.red(item.symbol)} | ${colors.yellow(
            item.quote.USD.price.toFixed(2)
          )}$ \n`;
        });
        return output;
      }
    } catch (error) {
      handleAPIError(error);
    }
  }
}

function handleAPIError(err) {
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
