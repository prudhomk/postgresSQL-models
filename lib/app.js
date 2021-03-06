import express from 'express';
import dogController from './controllers/dogs.js';
import heroController from './controllers/heroes.js';
import gameController from './controllers/games.js';
import albumController from './controllers/albums.js';
import sandwichController from './controllers/sandwiches.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';

const app = express();

app.use(express.json());

app.use(dogController);
app.use(heroController);
app.use(gameController);
app.use(albumController);
app.use(sandwichController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
