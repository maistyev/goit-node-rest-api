import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import contactsRouter from "./routes/contactsRouter.js";
import connectDatabase from "./db/connectDatabase.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRouter from "./routes/authRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

await connectDatabase();

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
