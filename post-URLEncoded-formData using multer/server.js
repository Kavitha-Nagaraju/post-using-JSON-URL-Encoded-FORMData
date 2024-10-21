const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
      console.log(file);
   
      cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());





const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: String,
    email: String,
    password: String,
    mobileNo: String,
    profilePic: String,
});

const User =new  mongoose.model("user", userSchema, "UserData");


app.post("/signup", upload.single("profile"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    try {
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            profilePic: req.file ? req.file.path : null ,
            password: req.body.password,
            mobileNo: req.body.mobileNo,
           
        });
        await newUser.save();
        res.json({ status: "Success", msg: "Successfully created user data" });
    } catch (error) {
        res.json({ status: "unSuccess", msg: "Unable to create user data" });
        console.log(error);
    }
});

// Listen to the port
app.listen(3345, () => {
    console.log("Listening on port 3345");
});

// Connect to MongoDB
const connectToMDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://nagarajukavibhavi:nagarajukavibhavi@cluster0.okjzs.mongodb.net/clouds?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Unable to connect to MongoDB");
    }
};

connectToMDB();
