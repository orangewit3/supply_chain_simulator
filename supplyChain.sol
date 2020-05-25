pragma solidity ^0.4.20;


contract cocoBeanFarmer {
    
    int quantity = 0; // total beans this farmer has 
    
    constructor(int initial_quantity) public {
        quantity = initial_quantity;
    }
    
    function balance() external view returns (int) {
        return quantity;
    }
    
    function claimBeans(int num_beans) external {
        quantity = quantity + num_beans;
    }
    
    function sendBeans(address _to, int num_beans) external {
        require(quantity > num_beans);
        quantity = quantity - num_beans;
    }
}

contract manufacturer {
    int bean_count = 0; // num_beans this manufacturer has 
    
    int beansToCoffeeRatio = 50; // need 50 beans to produce 1 coffee 
    
    constructor(int initial_bean_count, int estimated_beans_to_coffee_ratio) {
        bean_count = initial_bean_count;
        beansToCoffeeRatio = estimated_beans_to_coffee_ratio;
    }
    
    function capacity() internal returns (int) {
        return int(bean_count/beansToCoffeeRatio);
    }
    
    function getTotalcapacity() external view returns (int) {
        return capacity();
    }
    
    function requestBeans(address _to, int quantity) external view returns (bool) {
        return false;
    }
    
    function produce(int quantity) external view returns (bool) {
        int cap = capacity();
        require(cap > quantity);
        bean_count = bean_count - (quantity * beansToCoffeeRatio);
    }
    
    
}

contract SupplyChainTransactions {
    
    struct Status {
        bool accepted; // the requesting party is in compliance with transaction attributes
        bool verified; // the verifiable party has verified the product
        bool premature; // the responsibly party has declared the existence of the product
    }
    
    struct Transaction {
        string name;
        string description;
        uint256 quantity;
        Status status;
        address currentOwner;
    }
    
    mapping (uint256 => address) public transactionToOwner; 
    mapping (address => bool) private authorizedTransactionCreators;
    mapping (address => int) private partyToStage;
    
    
    Transaction[] transactions;

    function addTransaction(string name, string description, uint256 quantity) external returns (uint256 transactionID) {
        Status memory status = Status({
            accepted: false,
            verified: false,
            premature: true
        });
        
        require(authorizedTransactionCreators[msg.sender]);
        
        Transaction memory transaction = Transaction({
            name: name,
            description: description,
            quantity: quantity,
            status: status,
            currentOwner: msg.sender
        });
        
        transactionID = transactions.push(transaction) - 1;
    }
    
    function verifyTransaction(uint256 transactionID) {
        int verifierStage = partyToStage[msg.sender];
        Transaction transaction = transactions[transactionID];
        require(verifierStage == partyToStage[transaction.currentOwner] - 1);
        transaction.status.verified = true;
    }
    
    function addTransactionCreator(address _address) public view {
        authorizedTransactionCreators[_address] = true;
    }
    
    function addSupplyChainParty(address _address, int stage) public view {
        partyToStage[_address] = stage;
    }
    
}
