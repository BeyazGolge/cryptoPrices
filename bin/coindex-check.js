import { program } from "commander";
import { key } from "../commands/key.js";
import { check } from "../commands/check.js";

program
  .command("price")
  .description("Check price of coins")
  .option(
    "--coin <type>",
    "Add specific coin types in CSV format 'ex: coindex check price --coin=BTC'",
    ""
  )
  .action((cmd) => check.price(cmd));

program.parse(process.argv);
