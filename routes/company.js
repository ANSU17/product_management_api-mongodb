const express = require("express");
const router = express.Router();

router.use(express.json());

const companyModel= require("../models/company")
const productModel  = require("../models/products")
const sellerModel = require("../models/seller")


router.get("/prodlist",async (req,res) =>{

    const productList = await productModel.find();

    if(productList.lenght == 0)
    {
        return res.json({data:"no seller available ! "});
    }
    return res.json({data:productList});

});

//  adding company details
router.post("/addCompany",(req,res) => {
    const newCompany = req.body;
    companyModel.create(newCompany);

    return res.json({data:"companies added ! ! ! "});

});

//•	fetching company details based on product name
router.get("/getCompany",async (req,res) =>{

    const productName = req.body.pname;
    const product = await productModel.find({
        "title":productName
    });
    let pid = product[0].product_id;
    const companyList = await companyModel.find();
    const company_needed = [];

    for(let i = 0; i < companyList.length;i++){
       
        if (companyList[i].product_id.indexOf(pid) !== -1){
            company_needed.push(companyList[i]);
        }
    }
    
    if(company_needed.lenght == 0)
    {
        return res.json({data:"no companies available ! "});
    }
    return res.json({data:company_needed});

});


//	update company (add/remove products)

router.put("/updateCompany/add",async(req,res) =>{  
    const cid = req.body.cid;
    const pid = req.body.pid;

    const company = await companyModel.findOne({company_id : cid});
    proIds = company.product_id;
    proIds.push(pid);                               
    var new_company = await companyModel.findOneAndUpdate({company_id :cid} , {$set:{product_id : proIds}},{new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!",err);
        }
    
        return res.json(doc);

    });

});

router.put("/updatecompany/remove",async(req,res)=>{
    const cid = req.body.cid;
    const pid = req.body.pid;

    const company = await companyModel.findOne({company_id : cid});
    proIds = company.product_id;
    var index = proIds.indexOf(pid);
    if( index !== -1){
        proIds.splice(index,1);
    }
    else{
        return res.json("product removed ");
    }
    var new_company = await companyModel.findOneAndUpdate({company_id :cid} , {$set:{product_id : proIds}},{new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!",err);
        }
    
        return res.json(doc);

    });

});



//•	deleting company
router.delete("/deleteCompany",async(req,res)=>{
    const company_id = req.body.cid;
    const company = await companyModel.findOneAndDelete({company_id:company_id});
    return res.json("Deleted Succesfully");
});

module.exports = router;