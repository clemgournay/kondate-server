import express from 'express';

import { DB } from '../database.js';

export const IngredientRouter = express.Router();

IngredientRouter.get('/ingredients', async (req, res) => {
    const ingredients = await DB.collection('ingredients').find().toArray();
    res.json({data: ingredients});
});

IngredientRouter.post('/ingredients', async (req, res) => {
    const ingredient = req.body;
    delete ingredient.id;
    const resp = await DB.collection('ingredients').insertOne(ingredient);
    ingredient.id = resp.insertedId.toString();
    res.json({data: ingredient});
});