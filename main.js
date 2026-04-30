import express from "express";
import {router as ordersRoutes} from "./routes/orders.js";
import {router as customersRoutes} from "./routes/customers.js";
import {router as menuItemsRoutes} from "./routes/menuItems.js";
import {router as baristaRoutes} from "./routes/baristas.js";
import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();
const mongoDB = process.env.MONGODB_URI;

async function connectDB() {
    try {
        await mongoose.connect(mongoDB);
        console.log("mongoDB connected");
    } catch (err) {
        console.error("mongoDB not connected");
        process.exit(1);
    }
}

await connectDB();


const app = express();
app.use(express.json());
app.use("/api/orders",ordersRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/menu", menuItemsRoutes);
app.use("/api/baristas", baristaRoutes);


const port = process.env.PORT || 3000;

app.listen(port,"0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});