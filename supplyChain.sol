pragma solidity ^0.4.20;

contract supplyChainNode {
    
    uint256[] pendingTransactions;
    mapping(uint256 => int) transactionToActionId;
    uint256 index = 0;
    
    function addPendingTransaction(uint256 transactionID, int action) {
        pendingTransactions.push(transactionID);
        transactionToActionId[transactionID] = action;
    }
        
    function getTopPendingAction() returns (int) {
        return transactionToActionId[pendingTransactions[index]];
    }
    
    function _removeTopPendingAction() private {
        index = index + 1;
    }
    
}


contract cocoBeanFarmer is supplyChainNode {

    int quantity = 0; // total beans this farmer has 
    uint256[] pendingTransactions;  
    SupplyChainTransactions private _globalTransactions;

    constructor(int initial_quantity, address transactionAddress) public {
        quantity = initial_quantity;
        _globalTransactions = SupplyChainTransactions(transactionAddress);
        _globalTransactions.addTransactionCreator(this);
        _globalTransactions.addSupplyChainParty(this, 0);
        _globalTransactions.addNode(this);
    }

    function beanBalance() external view returns (int) {
        return quantity;
    }

    function claimBeans(int num_beans) external {
        quantity = quantity + num_beans;
    }
    
    function createBeanTransaction(string name, string description, uint256 quantity) {
        uint256 transactionID = _globalTransactions.addTransaction(name, description, quantity);
        pendingTransactions.push(transactionID);
    }
    
    function sendBeanTransaction(uint256 transactionID, address recipient) {
        _globalTransactions.addRecipient(transactionID, recipient);
    }
}

contract manufacturer is supplyChainNode {
    int beanCount = 0; // num_beans this manufacturer has 
    SupplyChainTransactions private _globalTransactions;
    
    int beansToCoffeeRatio = 50; // need 50 beans to produce 1 coffee 
    
    constructor(int initialBeanCount, int estimatedBeansToCoffeeRatio, address transactionAddress) {
        beanCount = initialBeanCount;
        beansToCoffeeRatio = estimatedBeansToCoffeeRatio;
        _globalTransactions = SupplyChainTransactions(transactionAddress);
        _globalTransactions.addSupplyChainParty(this, 1);
        _globalTransactions.addNode(this);
    }
    
    function capacity() internal returns (int) {
        return int(beanCount/beansToCoffeeRatio);
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
        beanCount = beanCount - (quantity * beansToCoffeeRatio);
    }
    
    function acceptBeans(uint256 transactionID) public payable returns (bool) { 
        require(transactionToActionId[transactionID] == 0);
        _globalTransactions.acceptTransaction(transactionID);
        address owner = _globalTransactions.getTransactionOwner(transactionID);
        owner.send(1);
        return true;
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
        address recipient;
    }
    
    supplyChainNode[] nodes;
    
    mapping (uint256 => address) public transactionToOwner; 
    mapping (address => uint256) public addressToSupplyChainNode;
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
            currentOwner: msg.sender,
            recipient: msg.sender
        });

        transactionID = transactions.push(transaction) - 1;
    }
    
    function acceptTransaction(uint256 transactionID) {
        Transaction transaction = transactions[transactionID];
        transaction.status.accepted = true;
    }

    function verifyTransaction(uint256 transactionID) {
        int verifierStage = partyToStage[msg.sender];
        Transaction transaction = transactions[transactionID];
        require(verifierStage == partyToStage[transaction.currentOwner] - 1);
        transaction.status.verified = true;
    }

    function addRecipient(uint256 transactionID, address recipient) {
        transactions[transactionID].recipient = recipient;
        nodes[addressToSupplyChainNode[recipient]].addPendingTransaction(transactionID, 0);
    }

    function transferTransactionOwnership(uint256 transactionID) {
        transactions[transactionID].currentOwner = msg.sender;
        transactionToOwner[transactionID] = msg.sender;
    }

    function getTransactionOwner(uint256 transactionID) returns (address) {
        return transactionToOwner[transactionID];
    }

    function addTransactionCreator(address _address) public view {
        authorizedTransactionCreators[_address] = true;
    }

    function addSupplyChainParty(address _address, int stage) public view {
        partyToStage[_address] = stage;
    }

    function isTransactionVerified(uint256 transactionID) returns (bool) {
        return transactions[transactionID].status.verified;
    }

    function isTransactionAccepted(uint256 transactionID) returns (bool) {
        return transactions[transactionID].status.accepted;
    }
    
    function getTransactionName(uint256 transactionID) returns (string) {
        return transactions[transactionID].name;
    }
    
    function addNode(address nodeAddress) {
        supplyChainNode _instance = supplyChainNode(nodeAddress);
        uint256 index = nodes.push(_instance) - 1;
        addressToSupplyChainNode[nodeAddress] = index;
    }

}
