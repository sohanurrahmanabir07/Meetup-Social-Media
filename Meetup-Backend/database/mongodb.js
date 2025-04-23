
require('dotenv').config()
const mongoose = require('mongoose');

const connectDB = () => {

    const uri = `mongodb+srv://sohanurrahmanabir:${process.env.mongoDB_password}@cluster0.ryt44.mongodb.net/Addabazi?retryWrites=true&w=majority&appName=Cluster0`;

    const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

    async function run() {
        try {
            // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
            await mongoose.connect(uri, clientOptions);
            await mongoose.connection.db.admin().command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            const db = mongoose.connection;

            // Check DB Connection
            db.once('open', () => {
                (async () => {
                    const data = await mongoose.connection.db.admin().command({
                        listDatabases: 1,
                    });
                    console.log(data);
                })();
                console.log('Connected to MongoDB');
            });

            // Check for DB errors
            db.on('error', (err) => {
                console.log('DB Connection errors', err);
            });
        } finally {
            // Ensures that the client will close when you finish/error
            // await mongoose.disconnect();
        }
    }
    run().catch(console.dir);

}

module.exports = connectDB;