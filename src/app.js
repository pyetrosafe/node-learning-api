import express from 'express';
import { routes } from './routes.js';

class AppClass {
    app;
    routes;

    constructor(routes){
        this.routes = routes;
        this.app = express();
    }

    config() {
        this.app.use(express.urlencoded());
        this.app.use(express.json());

        this.app.use(this.routes);

        this.app.get('/test', (req, res) => {
            res.send('Hello World from the app.js!');
        });
    }
}

class App extends AppClass {

    constructor(routes){
        super(routes);

        this.config();
    }
}

export default new App(routes).app;
