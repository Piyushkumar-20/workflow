import app from "./app.js";
import connectDB from "./config/db.js";
import "dotenv/config" 

const PORT = process.env.PORT || 500;
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error.message);
  }
};

startServer();
