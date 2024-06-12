import express from 'express';
import cors from 'cors';

import { DayRouter } from './src/endpoints/day.js';
import { IngredientRouter } from './src/endpoints/ingredient.js';
import { RecipeRouter } from './src/endpoints/recipe.js';

const app = express();
const port = process.env.PORT || 9000;

const whitelist = ['http://localhost:5200'];

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