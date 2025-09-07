import mongoose from "mongoose";

const connect = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected to database")
    })
    .catch((err) => {
        console.error("DB connection error:", err)
    })

}

export default connect
