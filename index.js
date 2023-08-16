import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoute from "./route/auth.js";
import usersRoute from "./route/users.js";
import productRoute from "./route/product.js";
import cartRoute from "./route/cartRoute.js";
import orderRoute from "./route/order.js";
import stripeRoute from "./route/stripe.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const CONNECTION_URL = process.env.MONGO_URL;
app.use(express.json({limit:'10mb'}));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
// app.use("/", (req, res) => {
//   res.send("hello mongodb ....");
// });
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use("/images", express.static(path.join(__dirname, "public/images")));
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });
// app.post("/upload", upload.single("file"), (req, res) => {
//   try {
//     return res.status(200).json("File uploded successfully");
//   } catch (error) {
//     console.error(error);
//   }
// });

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);
app.use("/orders", orderRoute);
app.use("/create-payment-intent", stripeRoute);
mongoose
  .connect(
    CONNECTION_URL,
    { useUnifiedTopology: true },
    { useNewUrlParser: true }
  )
  .then(() => app.listen(PORT, () => console.log("Db connected successfully")))
  .catch((error) => console.log(error));
