import { ethers } from "hardhat";
import { impersonateAccount } from "@nomicfoundation/hardhat-toolbox/network-helpers";

async function main() {
  const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const lp_USDC_DAI = "0xAE461cA67B15dc8dc81CE7615e0320dA1A9aB8D5";

  const TOKEN_HOLDER = "0xf584F8728B874a6a5c7A8d4d387C9aae9172D621";
  await impersonateAccount(TOKEN_HOLDER);

  const impersonateSigner = await ethers.getSigner(TOKEN_HOLDER);
  const USDC_CONTRACT = await ethers.getContractAt(
    "IERC20",
    USDC,
    impersonateSigner
  );
  const DAI_CONTRACT = await ethers.getContractAt(
    "IERC20",
    DAI,
    impersonateSigner
  );

  const ROUTER = await ethers.getContractAt(
    "IUniswapV2Router02",
    ROUTER_ADDRESS,
    impersonateSigner
  );

  const amountADesired = ethers.parseUnits("100", 6);
  const amountBDesired = ethers.parseUnits("100", 18);
  const amountAMin = ethers.parseUnits("50", 6);
  const amountBMin = ethers.parseUnits("50", 18);
  const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

  const USDC_Contract = await ethers.getContractAt(
    "IERC20",
    USDC,
    impersonateSigner
  );
  const DAI_Contract = await ethers.getContractAt(
    "IERC20",
    DAI,
    impersonateSigner
  );
  const LP_USDC_DAI = await ethers.getContractAt(
    "IERC20",
    lp_USDC_DAI,
    impersonateSigner
  );

  await USDC_Contract.approve(ROUTER, amountADesired);
  await DAI_Contract.approve(ROUTER, amountBDesired);

  const usdcBalBefore = await USDC_Contract.balanceOf(
    impersonateSigner.address
  );
  const daiBalBefore = await DAI_Contract.balanceOf(impersonateSigner.address);
  const lpBalBefore = await LP_USDC_DAI.balanceOf(impersonateSigner.address);

  console.log("usdc balance before swap", ethers.formatUnits(usdcBalBefore, 6));
  console.log("dai balance before swap", ethers.formatUnits(daiBalBefore, 18));
  console.log("lp token", ethers.formatUnits(lpBalBefore, 18));

  await ROUTER.addLiquidity(
    USDC,
    DAI,
    amountADesired,
    amountBDesired,
    amountAMin,
    amountBMin,
    impersonateSigner.address,
    deadline
  );

  const usdcBalAfter = await USDC_Contract.balanceOf(impersonateSigner.address);
  const daiBalAfter = await DAI_Contract.balanceOf(impersonateSigner.address);
  const lpBal = await LP_USDC_DAI.balanceOf(impersonateSigner.address);

  console.log("=========================================================");

  console.log("usdc balance after swap", ethers.formatUnits(usdcBalAfter, 6));
  console.log("dai balance after swap", ethers.formatUnits(daiBalAfter, 18));
  console.log("lp token", ethers.formatUnits(lpBal, 18));

  const usdcBal = await USDC_CONTRACT.balanceOf(impersonateSigner.address);
  const daiBal = await DAI_CONTRACT.balanceOf(impersonateSigner.address);
  const lpBal1 = await LP_USDC_DAI.balanceOf(impersonateSigner.address);
  const liquidity = ethers.parseUnits("0.00006", 18);

  console.log("=========================================================");

  // await USDC_Contract.approve(ROUTER, amountADesired);
  // await DAI_Contract.approve(ROUTER, amountBDesired);
  await LP_USDC_DAI.approve(ROUTER, liquidity);

  console.log("amount before removing token", ethers.formatUnits(usdcBal, 6));
  console.log("amount before removing token", ethers.formatUnits(daiBal, 18));
  console.log("lp token", ethers.formatUnits(lpBal1, 18));

  await ROUTER.removeLiquidity(
    USDC,
    DAI,
    liquidity,
    amountAMin,
    amountBMin,
    impersonateSigner.address,
    deadline
  );

  const usdcBalx = await USDC_CONTRACT.balanceOf(impersonateSigner.address);
  const daiBalx = await DAI_CONTRACT.balanceOf(impersonateSigner.address);
  const lpBal2 = await LP_USDC_DAI.balanceOf(impersonateSigner.address);

  console.log("=========================================================");
  console.log("amount after removing token", ethers.formatUnits(usdcBalx, 6));
  console.log("amount after removing token", ethers.formatUnits(daiBalx, 18));
  console.log("lp token", ethers.formatUnits(lpBal2, 18));
}
main().catch((e) => {
  console.log(e);
});
