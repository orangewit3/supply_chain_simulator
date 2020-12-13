pragma solidity ^0.4.26;

/**
 * @dev
 * 
 * Here are dev notes:
 *
 * ----------------------------------------------------------------------------
 * @dev Jason is almost done implementing this on front-end - Date: 12/02/2020
 *
 * MVP process for setting up supply chain and transaction exchanges:
 * 
 * 1. Deploy SupplyChainTransactions contract from address1
 * 2. Deploy CocoaBeanFarmer contract using SupplyChainTransactions contract address (this address != address1)
 *   1. Set initialQuantity = 100
 * 3. Deploy Manufacturer contract using SupplyChainTransactions contract address (this address is the same as step 2’s address != address1)
 *   1. Set initialBeanCount = 100
 *   2. Set estimatedBeansToCoffeeRatio = 1
 *   3. Set estimatedBeanValueInWei = 1
 * 4. Deploy Carrier contract SupplyChainTransactions contract address (this address is the same as step 2’s address != address1)
 *   1. Set maxCapacityPerTransit = 10
 * 5. Run createBeanTransaction in the CocoaBeanFarmer contract
 *   1. Set name = test1
 *   2. Set description = First test to create bean txn
 *   3. Set quantityToSend = 10
 *
 * ----------------------------------------------------------------------------
 * 
 * 
 * 6. Accept the newly created transaction by running `acceptTransaction` (of SupplyChainTransactions contract), 
 *    passing in transactionID of this transaction
 * 7. 
 * 
 * ----------------------------------------------------------------------------
 * 
 * 
 */

contract SupplyChainNode {
    
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


contract config {
    /*
        Defines constants that any two parties in the supply chain need to define transactions
        Examples: prices, risk distribution ratios, refund policies, etc.
        Must be agreed upon between two parties to exist
    */
}



contract Carrier is SupplyChainNode{
    /*
       manages the movement of transactions between two nodes in the supply chain network
       main methods: can refund if any transaction has failed, specifics on payments defined by config contract [** to be constructed]
    */

    /*
        constants
    */
    int maxCapacityPerTransit = 10;

    /*
        this should be retrieved by the config API / contract
    */
    int riskDistribution = 0;

    /*
        data structures
    */
    SupplyChainTransactions private _globalTransactions;

    struct Transit {
        string name;
        uint status;    // 0 is progress and 1 is failed
        int transactionID;
        address sender;
        address receiver;
    }
    
    uint256[] pendingTransactions;
    /*
        TODO:
        populate this pendingtransactions array with the transactions that need to processed
        In this case transactions that need to be transported from A (farmer) to B (Manufacturer) address.
    */

    constructor(int maxCapacityPerTransit, address supplyChainTransactionsAddress) public {
        maxCapacityPerTransit = maxCapacityPerTransit;
        _globalTransactions = SupplyChainTransactions(supplyChainTransactionsAddress);
        _globalTransactions.addTransactionCreator(this);
        _globalTransactions.addSupplyChainParty(this, 0);
        _globalTransactions.addNode(this);
    }

    function () external payable {}

    Transit[] transits;

    function addTransit(string name, int transactionID, address sender, address receiver) public returns (uint256) {
        /*
            update array of transits or any other datastructres;
        */
        Transit memory t = Transit(name, 0, transactionID, sender, receiver); // status initialized to 0 = in progress by default
        transits.push(t);
        return 0;
    }

    function checkTransitStatus(uint256 transitID) public view returns (int) {
        /*
            use data structure to lookup transit status quickly
        */
        if (transitID < 0 || transitID > transits.length - 1) {
            return -1;
        }
        return int(transits[transitID].status);
    }
    
    function getPendingTransaction() public view returns (int) {
        /*
            return the top pending transaction that this Carrier neds to processed
            pendingTransaction[-1]
        */
        return 0;
    }

    function updateTransitStatus(uint256 transitID, uint status) public returns (bool) {
        /*
            use data structures to update the state of transitID denoting that the ship has failed to deliver the products
            status = ENUM {0: in_progress, 1: failed, 2: completed}
            someone updates with status = 1 failed, call internal method to make necessary actions or updates
        */

        if (transitID < 0 || transitID > transits.length - 1) {
            return false;
        }
        if (transits[transitID].status == 1) {   
            return false;
        }
        transits[transitID].status = status;
        
        if (status == 1) {
            refundTransitValue(transitID);
        }
        else if (status == 2) {  // if completed, update owner 
            _globalTransactions.updateTransactionOwner(transits[transitID].receiver, uint256(transits[transitID].transactionID));
        }    
        return true;
    }

    function refundTransitValue(uint256 transitID) payable returns(bool) {
        /*
        transitID has failed
        send transactionID value equally accross the sender and the receiver
        this involves actually sending the ether
        this method should be **payable**
        */

        if (transitID < 0 || transitID > transits.length - 1) {
            return false;
        }
        address sender = transits[transitID].sender;
        address receiver = transits[transitID].receiver;
        uint256 transactionID = uint256(transits[transitID].transactionID);

        int beanQuantity = int(_globalTransactions.getTransactionQuantity(transactionID));
        uint256 saleValueInWei = uint256(beanQuantity);

        if (address(this).balance < saleValueInWei) {
            return false;
        }
        sender.transfer(saleValueInWei / 2);
        receiver.transfer(saleValueInWei / 2);
        return true;
    }
}

contract CocoaBeanFarmer is SupplyChainNode {

    int quantity = 0; // total beans this farmer has 
    uint256[] pendingTransactions;  
    SupplyChainTransactions private _globalTransactions;

    constructor(int initialQuantity, address supplyChainTransactionsAddress) public {
        quantity = initialQuantity;
        _globalTransactions = SupplyChainTransactions(supplyChainTransactionsAddress);
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
    
    
    event NewBeanTransaction(
        uint indexed _id,
        string _name,
        string _description,
        uint _quantityToSend
    );
    
    function createBeanTransaction(
        string name, string description, uint256 quantityToSend
    ) external returns (bool) {
        if (int(quantityToSend) >= quantity) {
            return false;
        }
        uint256 transactionID = _globalTransactions.addTransaction(
            name, description, quantityToSend
        );
        pendingTransactions.push(transactionID);
        _globalTransactions.setTransactionPremature(transactionID);
        quantity = quantity - int(quantityToSend);
        
        /**
         * @dev 
         * 
         * Emits a new transaction to be logged on the next block. 
         * That log will contain the newly created transaction's info which
         * we can listen to on the front-end. We'll use a websocket connection
         * to update the front-end in real-time, according to the data in the
         * emitted event.
         */
        emit NewBeanTransaction(transactionID, name, description, quantityToSend);
        
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

contract Manufacturer is SupplyChainNode {
    int beanCount = 0; // num_beans this Manufacturer has 
    SupplyChainTransactions private _globalTransactions;
    uint256[] pendingTransactions;
    /*
        TODO
        add pending transactions array
        whenever this Manufacturer has ownership or must do something with a transaction it should be added to this array
        ideally this array should include "transactions to accept"
    */
    int beanValueInWei = 1;      // a bean is worth this many ether
    int beansToCoffeeRatio = 50; // need 50 beans to produce 1 coffee 

    constructor(int initialBeanCount, int estimatedBeansToCoffeeRatio, int estimatedBeanValueInWei, address supplyChainTransactionsAddress) {
        beanCount = initialBeanCount;
        beansToCoffeeRatio = estimatedBeansToCoffeeRatio;
        beanValueInWei = estimatedBeanValueInWei;
        _globalTransactions = SupplyChainTransactions(supplyChainTransactionsAddress);
        _globalTransactions.addSupplyChainParty(this, 1);
        _globalTransactions.addNode(this);
    }
    
    function () external payable {}
    function getArray() public view returns (uint256[]) {
        return pendingTransactions;
    }
    function getBalanceEther() public view returns (uint256) {
        return address(this).balance;
    }
    
    function capacity() internal returns (int) {
        return int(beanCount/beansToCoffeeRatio);
    }
    
    function getTotalBeanCapacity() external view returns (int) {
        return capacity();
    }
    
    function getPendingTransaction() external returns (uint256 transactionID) {
        return pendingTransactions[pendingTransactions.length - 1];
    }
    
    function addTransaction(uint256 transactionID) external returns (bool) {
        pendingTransactions.push(transactionID);
        return true;
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
        CocoaBeanFarmer farmer = CocoaBeanFarmer(owner);
        // farmer.claimBeans(int256(_globalTransactions.getTransactionQuantity(transactionID)));
        // CocoaBeanFarmer(owner).claimBeans(int256(_globalTransactions.getTransactionQuantity(transactionID)));
        return true;
    }
}


contract SupplyChainTransactions {

    struct Status {
        bool accepted; // the requesting party is in compliance with transaction attributes
        bool verified; // the verifiable party has verified the product
        bool premature; // the responsible party has declared the existence of the product
        bool rejected; // was rejected by Manufacturer
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
    
    SupplyChainNode[] nodes;
    
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
    
    function updateTransactionOwner(address ManufacturerAddress, uint256 transactionID) {
        Manufacturer(ManufacturerAddress).addTransaction(transactionID);
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
        SupplyChainNode _instance = SupplyChainNode(nodeAddress);
        uint256 index = nodes.push(_instance) - 1;
        addressToSupplyChainNode[nodeAddress] = index;
    }

}