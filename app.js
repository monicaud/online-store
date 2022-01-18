var express = require('express');
let bodyParser = require('body-parser');
var mongoose = require('mongoose');
let cors = require('cors');

var app = express();

let routerShop = require("./routes/shop.router");
let empRouter = require("./routes/employee.router");
var userRouter = require("./routes/user.router");
let adminRouter = require("./routes/admin.router");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use("/api/shop", routerShop);
app.use("/api/employee", empRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

let url = "mongodb+srv://auren:test@tcs-capstone-4.bfmc6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(url).then(res => console.log("Connected...")).catch(error => console.log(error));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "\\index.html");
});

app.use(express.static('views'));

app.listen(8080, () => console.log("Server is running on port 8080..."));
