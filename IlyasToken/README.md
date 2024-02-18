# IlyasToken (IST) ERC-20 Token

## Overview:

The "IlyasToken" (IST) is an ERC-20 compliant token deployed on the Ethereum blockchain. It inherits functionalities from three OpenZeppelin contracts: ERC20, ERC20Capped, and ERC20Burnable. Let's break down its functionalities:

- **ERC20 Compliance:** The token adheres to the ERC-20 standard, which ensures compatibility with various decentralized applications (DApps), exchanges, and wallets that support this standard.

- **Capped Supply:** The token uses the ERC20Capped extension, which imposes a maximum supply limit. This prevents the total token supply from exceeding a predefined cap. The cap is set during contract deployment.

- **Burnable Tokens:** The token incorporates the ERC20Burnable extension, allowing token holders to destroy (burn) their tokens permanently. This feature can be useful for various purposes such as reducing the token supply or implementing deflationary mechanisms.

- **Miner Rewards:** The contract includes a mechanism to reward miners for validating transactions on the Ethereum blockchain. This is implemented in the _mintMinerReward() function, which mints new tokens and assigns them to the address of the miner (coinbase) of the current block.

- **Owner Functionality:** Certain functions are restricted to the contract owner, identified during deployment. These functions include adjusting the block reward and initiating contract destruction.

- **Token Deployment:** The token is deployed with the name "IlyasToken" and the symbol "IST". The initial supply of tokens is minted to the contract owner upon deployment.

## Contract Details:

- **Deployed Contract Address:** [0x87131F24E1E6eF32F5A5936497135a4428B3A786](https://goerli.etherscan.io/address/0x87131F24E1E6eF32F5A5936497135a4428B3A786)


