pragma solidity >=0.6.2;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//import "./IExerciceSolution.sol";

contract ExerciceSolution is ERC20 {
    constructor(string memory name_, string memory symbol_) public ERC20(name_, symbol_){}
	
    event check(uint256 value);

    function getToken() external returns (bool)
    {
        _mint(msg.sender, 1);
        return true;
    }

    function buyToken() external payable returns (bool) 
	{   
        //emit check(msg.value);
		_mint(msg.sender, msg.value/1e12);
        //transfer(msg.sender, msg.value/1e15);
        //_mint(msg.sender, 1);
        //_mint(msg.sender, 1);
        return true;
    }

    function isCustomerWhiteListed(address customerAddress) external returns (bool)
    {
        return true;
    }

    function customerTierLevel(address customerAddress) external returns (uint256)
    {
        return 2;
    }
}
