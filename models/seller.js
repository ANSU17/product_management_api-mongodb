
const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema({
    seller_id : {type:String},
    name:{type:String},
    product_id:[{
        type: String
    }]

 
    
});

const  sellerModel = mongoose.model("sellers",sellerSchema,"sellers");

module.exports = sellerModel;

