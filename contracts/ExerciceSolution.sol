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
        if (ListAllowed[msg.sender] != 0) {
            _mint(msg.sender, ListAllowed[msg.sender]*msg.value/1e12);
            return true;
        }
        return false;
    }

    function addToList(address _address, uint8 _level) public {
        require(_level == 1 || _level == 2 || _level == 3 || _level == 0);
        ListAllowed[_address] = _level;
    }

    function isCustomerWhiteListed(address _customerAddress) external returns (bool)
    {
        return ListAllowed[_customerAddress] != 0;
    }

    function customerTierLevel(address _customerAddress) external returns (uint256)
    {
        return ListAllowed[_customerAddress];
    }
}

