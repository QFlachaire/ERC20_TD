const Str = require('@supercharge/strings');
const { func } = require('assert-plus');
// const BigNumber = require('bignumber.js');

var TDErc20 = artifacts.require("ERC20TD.sol");
var evaluator = artifacts.require("Evaluator.sol");
var ExerciceSolution = artifacts.require("ExerciceSolution.sol");


module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
		await hardcodeContractAddress(deployer, network, accounts)
        //await deployTDToken(deployer, network, accounts); 
        //await deployEvaluator(deployer, network, accounts); 
        //await setPermissionsAndRandomValues(deployer, network, accounts);
		//await deployRecap(deployer, network, accounts);  
		await testDeployment(deployer, network, accounts);
		
		
    });
};

async function deployTDToken(deployer, network, accounts) {
	TDToken = await TDErc20.new("TD-ERC20-101","TD-ERC20-101",web3.utils.toBN("20000000000000000000000000000"))
}

async function deployEvaluator(deployer, network, accounts) {
	Evaluator = await evaluator.new(TDToken.address)
}

async function setPermissionsAndRandomValues(deployer, network, accounts) {
	await TDToken.setTeacher(Evaluator.address, true)
	randomSupplies = []
	randomTickers = []
	for (i = 0; i < 20; i++)
		{
		randomSupplies.push(Math.floor(Math.random()*1000000000))
		randomTickers.push(Str.random(5))
		// randomTickers.push(web3.utils.utf8ToBytes(Str.random(5)))
		// randomTickers.push(Str.random(5))
		}

	console.log(randomTickers)
	console.log(randomSupplies)
	// console.log(web3.utils)
	// console.log(type(Str.random(5)0)
	await Evaluator.setRandomTickersAndSupply(randomSupplies, randomTickers);
}

async function deployRecap(deployer, network, accounts) {
	console.log("TDToken " + TDToken.address)
	console.log("Evaluator " + Evaluator.address)
}

async function hardcodeContractAddress(deployer, network, accounts) {
	TDToken = await TDErc20.at("0xbf23538e0c8AB87f517E2d296cb0E71D3d3AFE8F")
	Evaluator = await evaluator.at("0xcff8985FF63cDce92036A2747605FB7ead26423e")
}

async function testDeployment(depioyer, network, accounts) { 
	i = 0;

	getBalance = await TDToken.balanceOf(accounts[i]);
	console.log("Init Balance " + getBalance.toString());

	// Ex1
	await Evaluator.ex1_getTickerAndSupply({from: accounts[i]});
	getBalance = await TDToken.balanceOf(accounts[i]);
	console.log("Ex1 Balance " + getBalance.toString());

	// Ex2
	assignedTicker = await Evaluator.assignedTicker(accounts[i]);
	console.log(assignedTicker)
	assignedSupply = new web3.utils.BN(await Evaluator.assignedSupply(accounts[i]));
	console.log(assignedSupply.toString())
	
	myERC20 = await TDErc20.new(assignedTicker, assignedTicker, assignedSupply.toString(), {from: accounts[i]})
	
	await Evaluator.submitExercice(myERC20.address, {from: accounts[i]})
	await Evaluator.ex2_testErc20TickerAndSupply({from: accounts[i]});

	getBalance = await TDToken.balanceOf(accounts[i]);
	console.log("Ex2 Balance " + getBalance.toString());

	// Ex3
	i = 0;
	solution = await ExerciceSolution.new(assignedTicker, assignedTicker)
	await Evaluator.submitExercice(solution.address, {from: accounts[i]})
	
	await Evaluator.ex3_testGetToken({from: accounts[i]});
	
	getBalance = await TDToken.balanceOf(accounts[i]);
	console.log("Ex3 Balance " + getBalance.toString());
	
	// Ex4
	// Comment before RingBy
	// await Evaluator.sendTransaction({from: accounts[0], value: web3.utils.toWei('1', 'ether')})
	
	await Evaluator.ex4_testBuyToken({from: accounts[i]});
	
	getBalance = await TDToken.balanceOf(accounts[i]);
	console.log("Ex4 Balance " + getBalance.toString());

	// Ex5
	await Evaluator.ex5_testDenyListing({from: accounts[i]});

	getBalance = await TDToken.balanceOf(accounts[i]);
	console.log("Ex4 Balance " + getBalance.toString());

}
//2.4.40


