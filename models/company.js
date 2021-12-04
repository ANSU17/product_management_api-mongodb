const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
    company_id : {type:String},
    name:{type:String},
    product_id:[{
        type: String
    }]

 
    
});

const  companyModel = mongoose.model("mycompany",companySchema,"mycompany");

module.exports = companyModel;
