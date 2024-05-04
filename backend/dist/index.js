import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
//if connect to the data base then make connection
connectToDatabase()
    .then(() => {
    //connection and listner
    app.listen(5000, () => {
        console.log("Server is running and connect to db!");
    });
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map