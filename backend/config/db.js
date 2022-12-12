
const mongoose=require('mongoose');

const baglan=async ()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDb Baglandi --> ${conn.connection.name}`.blue.inverse);
    } catch (error){
        console.log(error);
        process.exit(1);
    }
}

module.exports=baglan