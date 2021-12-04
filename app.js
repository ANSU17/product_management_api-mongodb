require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json({ extended: false }));

const mongoose = require("mongoose");

const companyRoute = require("./routes/company");
const productRoute = require("./routes/product");
const sellerRoute = require("./routes/seller");

app.use("/", companyRoute);
app.use("/", productRoute);
app.use("/", sellerRoute);
const MONGOURL = "mongodb+srv://dbUser:dbUser@cluster0.pzuxd.mongodb.net/PRODUCTAPI?retryWrites=true&w=majority";
mongoose
    // .connect(process.env.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
    // mongoose.connection
    // .once('open',() =>console.log('mongoDB connected'))
    // .on('error',(error) => {
    //     console.log(error);
    // });
    .then(() => console.log("mongoDB connected.."));
app.get("/", (req, res) => res.send("WELCOMe to home page."));

app.listen(5000, () => { console.log("Server started..."); });


app.get('/', (req, res) => {
    console.log(req.body);

    res.send({ message: "api is working.." })
});
