const express = require("express");
const router = express.Router();

router.use(express.json());

const productModel = require("../models/products")


//adding products
router.post("/addProducts" ,async (req , res) => {

    const  newProduct  = req.body;
    productModel.create(newProduct);

    return res.json({ data : "Products added successfully..." });

} );

//  FETCHING...
router.get("/prodlist" , async (req , res) => {

    const productList = await productModel.find();

    if(productList.length == 0)
    {
        return res.json({ data : "no product in mydatabase" });
    }

    return res.json({ data : productList });

} );

// fetch all products of a seller
router.get("/prodlistbyseller" , async (req , res) => {

    var sid = req.body.sid;
    const productList = await productModel.find();
    const products_needed = [];

    for (let i = 0;i < productList.length;i++){
        if(productList[i].seller_id.indexOf(sid) !== -1){
            products_needed.push(productList[i]);
        }
    }

    if(products_needed.length == 0)
    {
        return res.json({ data : "no product in mydatabase" });
    }

    return res.json({ data : products_needed });

} );

//	fetch all products of a company
router.get("/prodlistbycompany" , async (req , res) => {

    var cid = req.body.cid;
    const productList = await productModel.find();
    const products_needed = [];

    for (let i = 0;i < productList.length;i++){
        if(productList[i].company_id.indexOf(cid) !== -1){
            products_needed.push(productList[i]);
        }
    }

    if(products_needed.length == 0)
    {
        return res.json({ data : "no product in mydatabase" });
    }

    return res.json({ data : products_needed });

} );

// update product (add/remove category)
router.put("/updateProduct/add",async(req,res) =>{  
    const pid = req.body.pid;
    const category = req.body.cat;

    const product = await productModel.findOne({product_id : pid});
    newCategory = product.category;
    newCategory.push(category);           
    console.log(newCategory,category);                    
    var updated = await productModel.findOneAndUpdate({product_id :pid} , {$set:{category : newCategory}},{new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!",err);
        }
    
        return res.json(doc);

    });

});

router.put("/updateproduct/remove",async(req,res)=>{
    const pid = req.body.pid;
    const category = req.body.cat;

    const product = await productModel.findOne({product_id : pid});
    newCategory = product.category;
    var index = newCategory.indexOf(category);
    if( index !== -1){
        newCategory.splice(index,1);
    }
    else{
        return res.json(" category removed ");
    }
    var updated = await productModel.findOneAndUpdate({product_id :pid} , {$set:{category : newCategory}},{new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!",err);
        }
    
        return res.json(doc);

    });

});




//•	deleting products
router.delete("/deleteProduct",async(req,res)=>{
    const product_id = req.body.pid;
    const products = await productModel.findOneAndDelete({product_id:product_id});
    return res.json("Deleted Succesfully");
});



module.exports = router;