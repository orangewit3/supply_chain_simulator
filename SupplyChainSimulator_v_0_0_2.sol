/**
 * @title
 * Supply Chain Manager Simulator
 *
 * @author
 * platocrat@tuta.io
 *
 * Date:
 * December 30, 2019
 *
 * Version:
 * v0.0.2
 *
 * References:
 * 1) Compound's, "Compound Sai (cSAI)", contract:
 * https://etherscan.io/address/0xf5dce57282a584d2746faf1593d3121fcac444dc#code
 *
 * 2) dYdX's, "SoloMargin", contract:
 * https://etherscan.io/address/0x1e0447b19bb6ecfdae1e4ae1694b0c3659614e4e#code
 *
 * 3) ENS's, "BaseRegistrarImplementation", contract:
 * https://etherscan.io/address/0xfac7bea255a6990f749363002136af6556b31e04#code
 *
 * Description:
 * This application simulates a supply chain.
 * A *Manager* is instantiated who operates procurement of supplies
 * (via mangaging inventories, purchase orders, deliveries, ), MORE TEXT
 *
 * SKUs or UPCs?:
 * This application only uses UPCs for products of external
 * businesses and both SKUs and UPCs for products of
 * internal businesses.
 **
 **
 */
pragma solidity 0.6.0;

pragma experimental ABIEncoderV2;



interface SupplyChainOperatorInterface {

    /*** Policy Hooks ***/

    /**
     * @notice
     */
    function purchaseOrderAllowed(address purchaseOrder, address purchaser, uint purchaseCost) external returns (uint);

    function purchaseOrderVerify(address purchaseOrder, address purchaser, uint purchaseCost, uint purchaseAmount) external;


    function sendDeliveryAllowed(address cToken, address redeemer, uint redeemTokens) external returns (uint);

    function sendDeliveryVerify(address cToken, address redeemer, uint redeemAmount, uint redeemTokens) external;

    function borrowAllowed(address cToken, address borrower, uint borrowAmount) external returns (uint);

    function borrowVerify(address cToken, address borrower, uint borrowAmount) external;

    /**
     * @notice Possible statuses of Works In Progress (WIPs)
     */
    enum WIP_Status {
        NON_EXISTENT_WIP,
        NOT_APPLICABLE,
        INCOMPLETE,
        IN_PROGRESS,
        COMPLETE
    }

    /**
     * @notice Universal Product Codes (UPCs):
     *
     * Universal product codes are external product tracking codes
     * that are standardized for use by any company.
     * This makes the UPC a true universal product identification
     * tool like the name implies.
     * An UPC will be the same everywhere.
     * The UPC number is tied to a unique product, but again, it
     * is the same across all stores and chains.
     **
     **
     * @notice Stock Keeping Units (SKUs):
     *
     * Stock keeping units are internal product inventory codes
     * unique to a particular company.
     * If you go into a store and look at an individual product,
     * then compare that product to the same one at another
     * chain, you will see that the SKU on the price tag is
     * different.
     *
     * SKUs are typcally < 12 characters long.
     **
     **
     * @notice Differenting UPC and SKU:
     *
     * UPC:
     * The UPC symbol will be the barcode label or bar coding on
     * the back of the product.
     *
     * SKU:
     * The SKU will generally be printed on the store-specific
     * shelf pricing.
     **
     **
     */


    /**
     * @notice Marker function used for light validation when
     * updating the manager of a supply chain.
     * @dev Implementations should simply return true.
     * @return true
     */
    function isManager() external view returns (bool);
}




/**
 * @todo ============================ INTERFACE OR ABSTRACT ==================================
 *
 * Should this contract be `interface` or `abstract`?
 *
 * Questions to consider:
 *
 * 1) Does this contract need to inherit from other contracts or interfaces?
 *
 * 2) Does this contract need to define a `constructor`?
 *
 * 3) Does this contract need variabels?
 *
 * 4) Does this contract need `enum`s?
 */

interface WIPs {

    /**
     * @notice Getter for Works In Progress (WIP) of products
     * of external businesses.
     * @return list of statuses { 0, 1, 2, 3, 4 }
     */
    function external_WIPs(

        bytes32[] calldata UPC,                     // array of UPC; UPC per item

        // bytes32[] calldata SKU,                     // array of SKU; SKU per item

        address[] calldata openPurchaseOrders,      // address per purchase order

        string[] calldata statusOfProgress          // output status of orders
    )
        virtual external view

        returns (uint[] memory);


    /**
     * @notice Getter for Works In Progress (WIP) of products
     * of internal businesses.
     */
    function internal_WIPs(

        bytes32[] calldata UPC,                     // array of UPC; UPC per item

        bytes32[] calldata SKU,                     // array of SKU; SKU per item

        address[] calldata openPurchaseOrders,      // address per purchase order

        string[] calldata statusOfProgress          // output status of orders
    )
        virtual external view

        returns (uint[] memory);
}




/**
 * @todo ============================ INTERFACE OR ABSTRACT ==================================
 *
 * Should this contract be `interface` or `abstract`?
 *
 * Questions to consider:
 *
 * 1) Does this contract need to inherit from other contracts or interfaces?
 *
 * 2) Does this contract need to define a `constructor`?
 *
 * 3) Does this contract need variabels?
 *
 * 4) Does this contract need `enum`s?
 */

interface InventoryMgmt {

    /**
     * @notice Check for single item in inventory.
     */
    function checkInventory_SKUs(

        bytes32[] calldata UPCs,                    // array of UPC; UPC per item

        bytes32[] calldata SKUs,                    // array of SKUs; SKU per item

        address[] calldata inventory                // array of addresses; address per item
    )
        virtual external view

        returns (uint[] memory);



    /**
     * @notice Check for multiple items in inventory by UPCs.
     */
    function checkInventory_UPCs(

        bytes32[] calldata UPCs,                    // array of UPC; UPC per item

        bytes32[] calldata SKUs,                    // array of SKUs; SKU per item

        address[] calldata inventory                // array of addresses; address per item
    )
        virtual external

        returns (uint[] memory);
}




/**
 * @todo ============================ INTERFACE OR ABSTRACT ==================================
 *
 * Should this contract be `interface` or `abstract`?
 *
 * Questions to consider:
 *
 * 1) Does this contract need to inherit from other contracts or interfaces?
 *
 * 2) Does this contract need to define a `constructor`?
 *
 * 3) Does this contract need variabels?
 *
 * 4) Does this contract need `enum`s?
 */

interface DeliveryMgmt {

    /// WILL

    /**
     * @notice Function to check delivery status of single
     * item by SKU and UPC.
     **
     * @return status denoted by 1, if delivered,
     * and 0 if pending delivery.
     */
    function checkDeliveredStatus_Single(

        // bytes32[] calldata UPC,

        bytes32 UPC,                                // single item UPC

        bytes32 SKU,                                // single item SKU

        address single_PurchaseOrder,               // single item purchase order

        uint single_OrderAmount                     // single item order amount
    )
        virtual external

        returns (bool);

    /**
     * @notice Function to check delivery status of multiple
     * items by their SKUs and UPCs.
     **
     * @return true if delivered, false if pending delivery.
     */
    function checkDeliveredStatus_Multiple(

        // bytes32[] calldata UPC,

        bytes32[] calldata UPCs,                    // multi-item UPCs

        bytes32[] calldata SKUs,                    // multi-item SKUs

        address[] calldata multi_PurchaseOrders,    // multi-item purchase orders

        uint[] calldata multi_OrderAmounts          // multi-item *total* order amounts
    )
        virtual external

        returns (bool[] memory);
}




/**
 * @todo ============================ INTERFACE OR ABSTRACT ==================================
 *
 * Should this contract be `interface` or `abstract`?
 *
 * Questions to consider:
 *
 * 1) Does this contract need to inherit from other contracts or interfaces?
 *
 * 2) Does this contract need to define a `constructor`?
 *
 * 3) Does this contract need variabels?
 *
 * 4) Does this contract need `enum`s?
 */

interface OrderMgmt {

    function scheduleOrder(

        bytes32[] calldata UPCs,

        bytes32[] calldata SKUs,

        bytes32 purchaseOrderCode,

        uint totalOrderCost
    )
        virtual external

        returns (uint);


    function transferAllowed(
        address cToken,
        address src,
        address dst,
        uint transferTokens
    )
        virtual external

        returns (uint);


    function transferVerify(
        address cToken,
        address src,
        address dst,
        uint transferTokens
    )
        virtual external;
}



/**
 * @title ManagedSupplyChain contract
 * @notice Abstract base for CTokens
 */
contract ManagedSupplyChain {

    // `SupplyChainSpawner` is a contract type defined below.
    // It is fine to reference it as long as it is not used
    // to create a new contract.
    SupplyChainSpawner spawner;

    address manager;

    bytes32 name;

    // Constructor that registers the creator and the assigned
    // name.
    constructor(bytes32 _name) public {

        manager = msg.sender;

        spawner = SupplyChainSpawner(msg.sender);

        name = _name;
    }

    // Only the creator can alter the name.
    // We can compare the contract based on its address which
    // can be retrieved by explicit conversion to address.
    function changeName(bytes32 newName) public {

        if (msg.sender == address(spawner))
            name = newName;
    }

}



contract SupplyChainSpawner {

    function spawnSupplyChain(bytes32 name)

        public

        returns (ManagedSupplyChain contractAddress)
    {
        // Create a new `X` contract and return its address.
        // From the JavaScript side, the return type of this
        // function is `address`, as this is the closest type
        // available in the ABI.
        return new ManagedSupplyChain(name);
    }
}




interface Distributor {


}



interface Retailer {
}


interface Manufacturer {
}


interface Supplier {
}





interface ComptrollerInterface {

    // Marker function
    function isComptroller() external view returns (bool);

    /*
    * @notice `calldata` is a special data location that contrains
    * the function arguments
    */


    /*
    * @notice to program the desired interactive actions of the contract
    * it is required to use asynchronous defining of functions and
    * asynchronous implementation in the final JS pages
    */

    // Shows assets you are in
    function enterMarkets(address[] calldata cTokens) external returns (uint[] memory);

    function exitMarket(address cToken) external returns (uint);

    /* Policy hooks */

    function mintAllowed(address cToken, address minter, uint mintAmount) external returns (uint);

    function mintVerify(address cToken, address minter, uint mintAmount, uint mintTokens) external;

    function redeemAllowed(address cToken, address redeemer, uint redeemTokens) external returns (uint);

    function redeemVerify(address cToken, address redeemer, uint redeemAmount, uint redeemTokens) external;

    function borrowAllowed(address cToken, address borrower, uint borrowAmount) external returns (uint);

    function borrowVerify(address cToken, address borrower, uint borrowAmount) external;
}
