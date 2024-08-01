const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const employeeModel = require("./models/employee");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/employee",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("Failed to connect to MongoDB", err));

// REGISTER
app.post("/register", (req, res) => {
    //its check the schema if the schema passed then its create the new employee taking the value from body
    employeeModel.create(req.body)
    // if the employee created then pass the parameter.
    .then(employee => res.json(employee))
    .catch(err => res.json(err))
});



//LOGIN

app.post("/login", (req, res) =>{
    employeeModel.findOne({ email: req.body.email})
    .then(employee => {
        // if the password matches then it will return the employee details
        if(employee.password === req.body.password){
            res.json(employee)
        } else{
            res.json({message: "Incorrect password"})
        }
        if(!employee){
            return res.json({message: "User not found"})
        }
    })
    console.log("email: req.body.email", req.body.email)
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
