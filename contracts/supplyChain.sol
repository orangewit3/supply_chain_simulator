pragma solidity ^0.4.26;

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

contract freightForwarder {
    /*
       manages the movement of transactions between two nodes in the supply chain network
       main methods: can refund if any transaction has failed, specifics on payments defined by config contract [** to be constructed]
    */
    
    /*
        constants
    */
    int maxValuePerShip = 10;
    
    /*
        this should be retrieved by the config API / contract
    */
    int riskDistribution = 0;
    
    /*
        datastructures
    */
    struct Trip {
        string name;
        int status;
        int transactionID;
        address sender; 
        address receiver;
    }
    

    constructor(int maxValuePerShip) {
        maxValuePerShip = maxValuePerShip;
    }
    
    Trip[] trips;
    
    /*
        external functions
        Simlar to an API, other contracts (99% transaction contract) will update and take information from this contract
    */
    
    function addTrip(string name, int transactionID, address sender, address receiver) public view returns (uint256) {
        /*
            update array of trips or any other datastructres;
        */
        return 0;
    }
    
    function checkTripStatus(int tripID) public view returns (string) {
        /*
            use datastructure to lookup trip status quickly
        */
        return 'N/A';
    }
    
    function updateTripStatus(int tripID, int status) public view returns (bool) {
        /*
            use datastructures to update the state of tripID denoting that the ship has failed to deliver the products
            status = ENUM {0: in_progress, 1: failed}
            someone updates with status = 1 failed, call internal method to make necessary actions or updates
        */
        return false;
        
    }
    
    /*
        internal functions --> the communication of this contract with the supply chain transactions contract
        similar to updating the global state of transactions and sending information to the network of nodes
        Sending payments, updating information, sending [events]
    */
    
    function refundTripValue(int tripID) internal view returns(bool) {
        /*
        tripID has failed
        send transactionID value equally accross the sender and the receiver
        this involves actually sending the ether
        this method should be **payable**
        */
        return false;
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

    function claimBeans(int num_beans) {
        quantity = quantity + num_beans;
    }
    
    function () external payable {}
    
    function etherBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    function createBeanTransaction(string name, string description, uint256 quantityToSend) external returns (bool) {
        if (int(quantityToSend) >= quantity) {
            return false;
        }
        uint256 transactionID = _globalTransactions.addTransaction(name, description, quantityToSend);
        pendingTransactions.push(transactionID);
        _globalTransactions.setTransactionPremature(transactionID);
        quantity = quantity - int(quantityToSend);
        return true;
    }
    
    function isTransactionAccepted(uint256 transactionID) returns (bool) {
        return _globalTransactions.isTransactionAccepted(transactionID);
    }
    
    function isTransactionRejected(uint256 transactionID) returns (bool) {
        return _globalTransactions.isTransactionRejected(transactionID);
    }
    
    function getTransactionRejectedMsg(uint256 transactionID) returns (string) {
        require(_globalTransactions.isTransactionRejected(transactionID));
        return _globalTransactions.getTransactionRejectedMsg(transactionID);
    }
    
    function reclaimRejectedBeans(uint256 transactionID) { 
        // separate method in case the farmer no longer wants the beans
        require(_globalTransactions.isTransactionRejected(transactionID));
        quantity = quantity + int256(_globalTransactions.getTransactionQuantity(transactionID));
    }
    
    function sendBeanTransaction(uint256 transactionID, address recipient) {
        _globalTransactions.addRecipient(transactionID, recipient);
    }
}

contract manufacturer is supplyChainNode {
    int beanCount = 0; // num_beans this manufacturer has 
    SupplyChainTransactions private _globalTransactions;
    
    int beanValueInWei = 1;      // a bean is worth this many ether
    int beansToCoffeeRatio = 50; // need 50 beans to produce 1 coffee 
    
    constructor(int initialBeanCount, int estimatedBeansToCoffeeRatio, int estimatedBeanValueInWei, address transactionAddress) {
        beanCount = initialBeanCount;
        beansToCoffeeRatio = estimatedBeansToCoffeeRatio;
        beanValueInWei = estimatedBeanValueInWei;
        _globalTransactions = SupplyChainTransactions(transactionAddress);
        _globalTransactions.addSupplyChainParty(this, 1);
        _globalTransactions.addNode(this);
    }
    
    function () external payable {}
    
    function getBalanceEther() public view returns (uint256) {
        return address(this).balance;
    }
    
    function capacity() internal returns (int) {
        return int(beanCount/beansToCoffeeRatio);
    }
    
    function getTotalCapacity() external view returns (int) {
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
        // require(transactionToActionId[transactionID] == 0);
        
        int beanQuantity = int(_globalTransactions.getTransactionQuantity(transactionID));
        uint256 saleValueInWei = uint256(beanQuantity * beanValueInWei);
        
        if (address(this).balance < saleValueInWei) { // doesnt enough etherBalance
            _globalTransactions.rejectTransaction(transactionID, "Not enough beans");
            return false;
        }
        
        _globalTransactions.acceptTransaction(transactionID);
        // address owner = _globalTransactions.getTransactionOwner(transactionID);
        address(_globalTransactions.getTransactionOwner(transactionID)).transfer(saleValueInWei);
        return true;
    }
    
    function rejectBeans(uint256 transactionID, string description) public payable returns (bool) {
        // require(transactionToActionId[transactionID] == 1);
        _globalTransactions.rejectTransaction(transactionID, description);
        address owner = _globalTransactions.getTransactionOwner(transactionID);
        cocoBeanFarmer farmer = cocoBeanFarmer(owner);
        // farmer.claimBeans(int256(_globalTransactions.getTransactionQuantity(transactionID)));
        // cocoBeanFarmer(owner).claimBeans(int256(_globalTransactions.getTransactionQuantity(transactionID)));
        return true;
    }
}


contract SupplyChainTransactions {

    struct Status {
        bool accepted; // the requesting party is in compliance with transaction attributes
        bool verified; // the verifiable party has verified the product
        bool premature; // the responsible party has declared the existence of the product
        bool rejected; // was rejected by manufacturer
    }
    
    struct Transaction {
        string name;
        string description;
        string rejectedMsg;
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
            rejected: false,
            verified: false,
            premature: true
        });

        require(authorizedTransactionCreators[msg.sender]);

        Transaction memory transaction = Transaction({
            name: name,
            description: description,
            quantity: quantity,
            status: status,
            rejectedMsg: "",
            currentOwner: msg.sender,
            recipient: msg.sender
        });
        
        transactionToOwner[transactionID] = msg.sender;

        // log0(bytes32(transactions.length));
        transactionID = transactions.push(transaction) - 1;
    }
    
    function acceptTransaction(uint256 transactionID) {
        Transaction transaction = transactions[transactionID];
        transaction.status.accepted = true;
    }
    
    function rejectTransaction(uint256 transactionID, string description) {
        transactions[transactionID].status.rejected = true;
        transactions[transactionID].rejectedMsg = description;
    }
    
    function setTransactionPremature(uint256 transactionID) {
        transactions[transactionID].status.premature = true;
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
    
    function getTransactionQuantity(uint256 transactionID) returns (uint256) {
        return transactions[transactionID].quantity;
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
    
    function isTransactionRejected(uint256 transactionID) returns (bool) {
        return transactions[transactionID].status.rejected;
    }
    
    function getTransactionRejectedMsg(uint256 transactionID) returns (string) {
        return transactions[transactionID].rejectedMsg;
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
