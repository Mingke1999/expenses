import mongoose from "mongoose";

export default dbConn = async () =>{
    try{
        const conn = await mongoose.connect(process.env.URI);
    }catch(error){
        console.error(`Error:${error.message}`);
        process.exit(1);
    }
}