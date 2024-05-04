import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 5000;
//if connect to the data base then make connection
connectToDatabase()
  .then(() => {
    //connection and listner
    app.listen(PORT, () => {
      console.log("Server is running and connect to db!");
    });
  })
  .catch((err) => console.log(err));
