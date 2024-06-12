import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const config = dotenv.config().parsed;

import { DayRouter } from './src/endpoints/day.js';
import { IngredientRouter } from './src/endpoints/ingredient.js';
import { RecipeRouter } from './src/endpoints/recipe.js';

const app = express();
const port = process.env.PORT || 9000;

console.log(config.DB_URI)

const whitelist = config.CORS_ORIGINS.split(',');

const corsOptions = {
  origin: whitelist
}

app.use(express.json());
app.use(cors(corsOptions));

app.use(DayRouter);
app.use(IngredientRouter);
app.use(RecipeRouter);

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});