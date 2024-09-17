import { ethers } from "hardhat";
import { impersonateAccount } from "@nomicfoundation/hardhat-toolbox/network-helpers";

async function main() {
  const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const USDC_AD = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const DAI_AD = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const TOKEN_HOLDER = "0xf584F8728B874a6a5c7A8d4d387C9aae9172D621";

  await impersonateAccount(TOKEN_HOLDER);
  const impersonateSigner = await ethers.getSigner(TOKEN_HOLDER);


  const amountADesired = ethers.parseUnits("100", 6);
  const amountBDesired = ethers.parseUnits("100", 18);
  const amountAMin = ethers.parseUnits("50", 6);
  const amountBMin = ethers.parseUnits("50", 18);
  const deadline = Math.floor(Date.now() / 1000) + 60 * 10;


  const USDC_CONTRACT = await ethers.getContractAt(
    "IERC20",
    USDC_AD,
    impersonateSigner
  );
  const DAI_CONTRACT = await ethers.getContractAt(
    "IERC20",
    DAI_AD,
    impersonateSigner
  );

  const ROUTER = await ethers.getContractAt(
    "IUniswapV2Router02",
    ROUTER_ADDRESS,
    impersonateSigner
  );



  await USDC_CONTRACT.approve(ROUTER, amountADesired);
  await DAI_CONTRACT.approve(ROUTER, amountBDesired);


  const usdcBalBefore = await USDC_CONTRACT.balanceOf(impersonateSigner.address);
  const daiBalBefore = await DAI_CONTRACT.balanceOf(impersonateSigner.address);

  console.log("USDC balance before adding to the pool", ethers.formatUnits(usdcBalBefore, 6));
  console.log("Dai balance before adding to the pool", ethers.formatUnits(daiBalBefore, 18));


  await ROUTER.addLiquidity(
    USDC_AD,
    DAI_AD,
    amountADesired,
    amountBDesired,
    amountAMin,
    amountBMin,
    impersonateSigner.address,
    deadline
  );

  const usdcBalAfter = await USDC_CONTRACT.balanceOf(impersonateSigner.address);
  const daiBalAfter = await DAI_CONTRACT.balanceOf(impersonateSigner.address);


  console.log("=========================================================");
  console.log("USDC balance after adding to the pool", ethers.formatUnits(usdcBalAfter, 6));
  console.log("Dai balance after adding to the pool", ethers.formatUnits(daiBalAfter, 18));


}
main().catch((e) => {
  console.log(e);
});
