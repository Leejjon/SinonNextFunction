'use strict';
import {dynamicHelloWorld} from "./HelloWorld";

const express = require('express');

const app = express();

app.use(dynamicHelloWorld);

app.use((req, res) => {
    res.contentType('text/plain');
    res.status(200);
    res.send('Hello, world!');
});

// Start the server
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

type ModuleId = string | number;

interface WebpackHotModule {
    hot?: {
        data: any;
        accept(
            dependencies: string[],
            callback?: (updatedDependencies: ModuleId[]) => void,
        ): void;
        accept(dependency: string, callback?: () => void): void;
        accept(errHandler?: (err: Error) => void): void;
        dispose(callback: (data: any) => void): void;
    };
}

declare const module: WebpackHotModule;

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}
