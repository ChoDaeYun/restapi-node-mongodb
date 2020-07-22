// DB connection
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    if(process.env.NODE_ENV !== "test") {
        console.log("Connected to %s", process.env.MONGODB_URL);
    }
})
    .catch(err => {
        console.error("App starting error:", err.message);
        process.exit(1);
    });
const db = mongoose.connection;