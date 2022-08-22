import Web3 from "web3";
import fs from "fs";

async function call(contract, i) {
  try {
    let res = await contract.methods.name().call();
    console.log(`got response on ${i} iteration`, res);
  } catch (err) {
    console.warn(`got error on ${i} itreation: ` + err);
  }
}

async function main() {
  let endpoint =
    process.argv.length > 2
      ? process.argv[2]
      : "ws://erigon.eth.svc.cluster.local:8545";
  let poolSize = process.argv.length > 3 ? parseInt(process.argv[3]) : 2;
  let num = process.argv.length > 4 ? parseInt(process.argv[4]) : 5;

  const abi = JSON.parse(fs.readFileSync("abi.json", { encoding: "utf8" }));
  let pool = [];
  for (let i = 0; i < poolSize; ++i) {
    let web3 = new Web3(new Web3.providers.WebsocketProvider(endpoint));
    pool.push(
      new web3.eth.Contract(abi, "0xdAC17F958D2ee523a2206206994597C13D831ec7")
    );
  }

  let proms = [];
  console.log(`Running ${num} call iterations to ${endpoint}`);
  for (let i = 0; i < num; ++i) {
    proms.push(call(pool[i % pool.length], i));
  }
  await Promise.all(proms);

  console.log("Done!");
}

main().then(() => process.exit(0));
