const Str = require('@supercharge/strings');
const { func } = require('assert-plus');
// const BigNumber = require('bignumber.js');

var TDErc20 = artifacts.require("ERC20TD.sol");
var evaluator = artifacts.require("Evaluator.sol");
var ExerciceSolution = artifacts.require("ExerciceSolution.sol");


module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
		await hardcodeContractAddress(deployer, network, accounts)
		await testDeployment(deployer, network, accounts);
		
		
    });
};

async function hardcodeContractAddress(deployer, network, accounts) {
	TDToken = await TDErc20.at("0xbf23538e0c8AB87f517E2d296cb0E71D3d3AFE8F")
	Evaluator = await evaluator.at("0xcff8985FF63cDce92036A2747605FB7ead26423e")
}

async function testDeployment(depioyer, network, accounts) { 
	
	// Ex5
	solution = await ExerciceSolution.new("ZC1ga", "ZC1ga")
	await Evaluator.submitExercice(solution.address)
	
	await Evaluator.ex5_testDenyListing();

	getBalance = await TDToken.balanceOf(accounts[0]);
	console.log("Ex5 Balance " + getBalance.toString());  

}


