import { connect, disconnect } from "mongoose";
async function connectToDatabase() {
    try {
        //make connection with the data base
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error("Cant Connect to Mongodb!");
    }
}
//make function for disconnect the data base
async function disconnectFromDatabase() {
    try {
        //disconnet method grab from mongoose it use to disconnect the data base
        //this approch use to mak secure
        await disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error("Cant Connect to Mongodb!");
    }
}
export { connectToDatabase, disconnectFromDatabase };
//# sourceMappingURL=connection.js.map