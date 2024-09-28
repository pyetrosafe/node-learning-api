import * as dotenv from "dotenv";
import * as http from "http";
import db from './packages/database/Connection.js';
import app from "./app.js";

dotenv.config();

const PORT = process.env.TEST_PORT || 8001;

(async () => {
    await db.sync({force: false});

    http.createServer(app).listen(PORT, () => {
        console.log(`Express server listening on port ${PORT}`);
    });
})();
