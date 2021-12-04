const express = require("express");
const router = express.Router();

router.use(express.json());

const sellerModel= require('../models/seller');
const productModel = require('../models/products');
 
 //fetching
router.get("/slrlist",async (req,res) =>{

    const sellerList = await sellerModel.find();

    if(sellerList.lenght == 0)
    {
        return res.json({data:"no seller available ! "});
    }
    return res.json({data:sellerList});

});

// adding sellers
router.post("/addseller",(req,res) => {
     const newSeller = req.body;
     sellerModel.create(newSeller);

     return res.json({data:"sellers added ! ! ! "});

});

// fetching seller details based on product name
router.get("/getSeller",async (req,res) =>{

    const productName = req.body.pname;
    const product = await productModel.find({
        "title":productName
    });
    console.log(product, productName);
    let pid = product[0].product_id;
    const sellerList = await sellerModel.find();
    const seller_needed = [];

    for(let i = 0; i < sellerList.length;i++){
       
        if (sellerList[i].product_id.indexOf(pid) !== -1){
            seller_needed.push(sellerList[i]);
        }
    }
    
    if(seller_needed.lenght == 0)
    {
        return res.json({data:"no sellers available ! "});
    }
    return res.json({data:seller_needed});

});


//	update seller (add/remove products)

router.put("/updateseller/add",async(req,res)=>{
    const sid = req.body.sid;
    const pid = req.body.pid;

    const seller = await sellerModel.findOne({seller_id : sid});
    proIds = seller.product_id;
    proIds.push(pid);                               
    var new_seller = await sellerModel.findOneAndUpdate({seller_id :sid} , {$set:{product_id : proIds}},{new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!",err);
        }
    
        return res.json(doc);

    });

});

router.put("/updateseller/remove",async(req,res)=>{
    const sid = req.body.sid;
    const pid = req.body.pid;

    const seller = await sellerModel.findOne({seller_id : sid});
    proIds = seller.product_id;
    var index = proIds.indexOf(pid);
    if( index !== -1){
        proIds.splice(index,1);
    }
    else{
        return res.json("sxdcfv");
    }
    var new_seller = await sellerModel.findOneAndUpdate({seller_id :sid} , {$set:{product_id : proIds}},{new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!",err);
        }
    
        return res.json(doc);

    });

});


//•	deleting seller
router.delete("/deleteSeller",async(req,res)=>{
    const seller_id = req.body.sid;
    const seller = await sellerModel.findOneAndDelete({seller_id:seller_id});
    return res.json("Deleted Succesfully");
});

module.exports = router;