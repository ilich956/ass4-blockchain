const { expect } = require("chai");
const hre = require("hardhat");

describe("IlyasToken contract", function () {
  let Token;
  let IlyasToken;
  let owner;
  let address_1;               
  let address_2;
  let tokenCap = 100000000;
  let tokenBlockReward = 50;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("IlyasToken");
    [owner, address_1, address_2] = await hre.ethers.getSigners();

    IlyasToken = await Token.deploy(tokenCap, tokenBlockReward);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await IlyasToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await IlyasToken.balanceOf(owner.address);
      expect(await IlyasToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should set the max capped supply to the argument provided during deployment", async function () {
      const cap = await IlyasToken.cap();
      expect(Number(hre.ethers.utils.formatEther(cap))).to.equal(tokenCap);
    });

    it("Should set the blockReward to the argument provided during deployment", async function () {
      const blockReward = await IlyasToken.blockReward();
      expect(Number(hre.ethers.utils.formatEther(blockReward))).to.equal(
        tokenBlockReward
      );
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      // 50 токенов в address_1
      await IlyasToken.transfer(address_1.address, 50);
      const address_1Balance = await IlyasToken.balanceOf(address_1.address);
      expect(address_1Balance).to.equal(50);

      // 50 токенов from address_1 to addr2
      await IlyasToken.connect(address_1).transfer(address_2.address, 50);
      const addr2Balance = await IlyasToken.balanceOf(address_2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await IlyasToken.balanceOf(owner.address);
      // Попытка отправить 1 токен с адреса 1 с 0 токенов владельцу с 1000000 токенами
      await expect(
        IlyasToken.connect(address_1).transfer(owner.address, 1)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      expect(await IlyasToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await IlyasToken.balanceOf(owner.address);

      await IlyasToken.transfer(address_1.address, 100);

      await IlyasToken.transfer(address_2.address, 50);

      // проверка баланса
      const finalOwnerBalance = await IlyasToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

      const address_1Balance = await IlyasToken.balanceOf(address_1.address);
      expect(address_1Balance).to.equal(100);

      const addr2Balance = await IlyasToken.balanceOf(address_2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
});
