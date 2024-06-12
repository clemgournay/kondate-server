import express from 'express';

import { DB } from '../database.js';
import { ObjectId } from 'mongodb';

export const RecipeRouter = express.Router();

RecipeRouter.get('/recipes', async (req, res) => {
    const query = {};
    if (req.query.ids) {
        const ids = req.query.ids.split(',');
        let oids = [];
        for (let id of ids) oids.push(ObjectId.createFromHexString(id));
        query._id = {$in: oids};
    }
    const recipes = await DB.collection('recipes').find(query).toArray();
    res.json({data: recipes});
});

RecipeRouter.post('/recipes', async (req, res) => {
    const recipe = req.body;
    delete recipe._id;
    const resp = await DB.collection('recipes').insertOne(recipe);
    recipe.id = resp.insertedId.toString();
    res.json({data: recipe});
});

RecipeRouter.delete('/recipes/:id', async (req, res) => {
    const id = req.params.id;
    await DB.collection('recipes').deleteOne({_id: ObjectId.createFromHexString(id)});
    res.json({data: 'ok'});
});