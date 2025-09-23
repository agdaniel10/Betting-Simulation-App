import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB connected ${conn.connection.host}`)
        
    }catch (error) {
        console.error("Database connection error: ", error.message);
        process.exit(1)
    }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected')
})

mongoose.connection.on('error', (error) => {
    console.error('MongoDb connection error: ', error)
})

export default connectDB;