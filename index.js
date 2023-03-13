const express = require("express"); 

const app = express(); 

app.get("/", (req, res) => { 
  res.send(" my express app"); 
}); 

app.get("/me", (req, res) => { 
  res.send("Hi I am Thien Trinh"); 
}); 

app.listen(5000, () => { 
  console.log("listening"); 
}); 
