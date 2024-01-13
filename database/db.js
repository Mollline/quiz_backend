const mongoose = require("mongoose");
const url =
  "mongodb+srv://Moline:9588@cluster0.tgezrzd.mongodb.net/?retryWrites=true&w=majority";
// async await
//try catch hiine
//connect to mongoose using url
//console.log

// catch the error
//console.log

//export on module
const connect = async () => {
  try{
    await mongoose.connect(url)
    console.log('connected')
  }catch(err){
    console.log(err)
  }
};
module.exports = connect;
