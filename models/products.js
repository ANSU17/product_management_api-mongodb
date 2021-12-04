const mongoose = require("mongoose");

const productSchema = mongoose.Schema({

product_id : {type:String},
title : {type:String},
price : {type:String},
category :[{
    type: String
}],
company_id : {type:String},
seller_id : [{
    type: String
}]

    
});

const productModel = mongoose.model("mydatabase",productSchema,"mydatabase");

module.exports = productModel;