import express from "express";
import "dotenv/config";
import ApiRoutes from "./routes/api.js";
const app = express();
const PORT = process.env.PORT || 3000;
import fileUpload from "express-fileupload";

// MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

app.get("/", (req, res) => {
  return res.json({ message: "Hello it's working" });
});

app.use("/api", ApiRoutes);

app.listen(PORT, () => console.log(`server is running on PORT${PORT}`));
