import express from "express";
import connectDB from "./database-connection/db.connect.js";
import userRoutes from "./user/user.controller.js";
const app = express();

// to make app understand json
app.use(express.json());
//console.log(process);

//TODO: enable CORS

//connect database

await connectDB();

//register routes
app.use(userRoutes);

// TODO: handle global error

// network port and server
const PORT = process.env.PORT;
// to access the PORT stored in env
// process is actually an object, can view it using console.log(process)
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
