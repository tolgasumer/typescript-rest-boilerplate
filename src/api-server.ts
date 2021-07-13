import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import * as morgan from 'morgan';
import * as swaggerUi from "swagger-ui-express";
import { Server } from 'typescript-rest';
const swaggerDocument = require('../dist/swagger.json');
import { readdirSync } from 'fs';
import "reflect-metadata";
import { createConnection } from 'typeorm';

export class ApiServer {
    public PORT: number = +process.env.PORT || 3000;

    private readonly app: express.Application;
    private server: http.Server = null;
    private modules: Array<string> = readdirSync(__dirname + '/modules'); // Fetch all folder names under 'modules' directory 

    constructor() {
        this.app = express();
        this.config();

        Server.useIoC();

        // All folders containing controllers should be included
        // Grep files containing '.controller.' phrase in the middle
        this.modules.forEach(module => {
            Server.loadControllers(this.app, `modules/${module}/*.controller.*`, __dirname);
        });

        // Path to generate swagger.json using swagger.config.yml
        Server.swagger(this.app, { filePath: './dist/swagger.json' });

        // Serve Swagger UI at {host}/swagger-ui
        this.app.use(
            "/swagger-ui",
            swaggerUi.serve,
            swaggerUi.setup(swaggerDocument)
        );
    }

    /**
     * Start the server
     */
    public async start() {
        await createConnection();
        return new Promise<void>((resolve, reject) => {
            this.server = this.app.listen(this.PORT, (err: any) => {
                if (err) {
                    return reject(err);
                }

                // tslint:disable-next-line:no-console
                console.log(`Listening to http://0.0.0.0:${this.PORT}`);

                return resolve();
            });
        });

    }

    /**
     * Stop the server (if running).
     * @returns {Promise<boolean>}
     */
    public async stop(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (this.server) {
                this.server.close(() => {
                    return resolve(true);
                });
            } else {
                return resolve(true);
            }
        });
    }

    /**
     * Configure the express app.
     */
    private config(): void {
        // Native Express configuration
        this.app.use(cors());
        this.app.use(morgan('combined'));
    }
}