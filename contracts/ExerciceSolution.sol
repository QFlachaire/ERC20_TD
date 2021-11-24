pragma solidity >=0.6.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//import "./IExerciceSolution.sol";

contract ExerciceSolution is ERC20 {
    constructor(string memory name_, string memory symbol_) public ERC20(name_, symbol_){}

    mapping(address => uint8) public ListAllowed;


    function getToken() external returns (bool)
    {   
        if (ListAllowed[msg.sender] != 0) {
            _mint(msg.sender, 1);
            return true;
        }
        return false;
    }

    function buyToken() external payable returns (bool) 
	{ 
		_mint(msg.sender, msg.value/1e12);
        return true;
    }

    function addToList(address _address) public {
        ListAllowed[_address] = 1;
    }

    function isCustomerWhiteListed(address customerAddress) external returns (bool)
    {
        return ListAllowed[customerAddress] != 0;
    }

    function customerTierLevel(address customerAddress) external returns (uint256)
    {
        return 2;
    }
}

