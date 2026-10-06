import mongoose from "mongoose";

const connectDB = async() => {
    await mongoose.connect(process.env.DATABASE_URL)
    maxPoolSize = 10
}

export default connectDB