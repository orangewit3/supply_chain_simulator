pragma solidity ^0.4.17;

contract Order {
    uint productID;
    address customer;
    string location;
    bool delivered;
    uint deliveryTime;
    
    function placeOrder(uint product_id, string loc) public {
        customer = msg.sender;
        productID = product_id;
        location = loc;
    }
    
    function setDeliveryInfo(uint estimatedTime, bool status) public {
        deliveryTime = estimatedTime;
        delivered = status;
    }
    
    function getOrderInfo(uint product_id) public returns (uint time, bool status) {
        require(productID == product_id);
        time = deliveryTime;
        status = delivered;
    }
}

contract Storage {
    //storage for all products
    //storage does 3 things, accept product, store product, deliver product
    struct Product {
        address customer;
        string delivery_location;
        uint deliveryTime;
        bool product_status = true;//status of product i.e. is it good condition or not
        string storage_location;
    }
    mapping(uint => Product) product_map;
   
    function addItem(uint product_id, address cust, string end_loc, uint time_to_deliver. string warehouse) public {
        product_map[product_id].customer = cust;
        product_map[product_id].delivery_location = end_loc;
        product_map[product_id].deliveryTime = time_to_deliver;
        product_map[product_id].product_status = status;
        product_map[product_id].storage_location = warehouse;
    }
   
    function updateProductStatus(uint product_id, bool status) public {
        product_map[product_id].product_status = status;
    }
   
    function updateProductDeliveryTime(uint product_id, uint time) public {
        product_map[product_id].deliveryTime = time;
    }
   
    function updateProductDeliveryLocation(uint product_id, string loc) {
        product_map[product_id].delivery_location = loc;
    }
   
    function getProductStatus(uint product_id) public returns (bool status) {
       status =  product_map[product_id].product_status;
    }
   
    function getProductDeliveryTime(uint product_id) public returns (uint time) {
       time =  product_map[product_id].deliveryTime;
    }
   
    function getProductLocation(uint product_id) public returns (string loc) {
       loc =  product_map[product_id].delivery_location;
    }
}

contract Delivery {
    uint vehicleNumber;
    struct Product {
        address customer;
        string delivery_location;
        uint deliveryTime;
    }
    mapping(uint => Product) product_map;
    
    function addItem(uint product_id, address cust, uint time_to_deliver, string delivery_loc) {
        product_map[product_id].customer = cust;
        product_map[product_id].delivery_location = delivery_loc;
        product_map[product_id].deliveryTime = time_to_deliver;
    }
    
    function deliveredProduct(uint product_id) {
        delete product_map[product_id];
    }
    
}