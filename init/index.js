const mongoose= require("mongoose");
const initdata=require("./data.js");
const listing=require("../models/listing.js");


const mongourl="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to db");
})
 .catch((err)=>{
    console.log(err);
 });

async function main() {
    await mongoose.connect(mongourl);
    
}

const initDb= async ()=>{
    await listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj, owner:"688d9c665980f34d0b0b2845"}))
    await listing.insertMany(initdata.data);
    console.log("data was initiallized");
}

initDb();