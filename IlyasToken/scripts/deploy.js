const hre = require("hardhat");

async function main() {
  const IlyasToken = await hre.ethers.getContractFactory("IlyasToken");
  const ilyasToken = await IlyasToken.deploy(100000000, 50);

  await ilyasToken.deployed();

  console.log("Ilyas Token deployed to: ", ilyasToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
