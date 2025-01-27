import express from "express";
import { router } from "./router";
import { errorHandler } from "./middlewares/error-handler";

const app = express();

app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running in http://localhost:${PORT}`)
);
