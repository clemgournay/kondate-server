import express from 'express';

import { DB } from '../database.js';
import { ObjectId } from 'mongodb';

export const DayRouter = express.Router();

DayRouter.get('/days', async (req, res) => {
    const query = {}
    if (req.query.start) {
        const start = new Date(req.query.start);
        query.$gte = start;
    }
    if (req.query.end) {
        const end = new Date(req.query.end);
        query.$lt = end;
    }
    const days = await DB.collection('days').find().toArray();
    res.json({data: days});
});

DayRouter.post('/days', async (req, res) => {
    const day = req.body;
    day.date = new Date(day.date);
    const resp = await DB.collection('days').insertOne(day);
    day.id = resp.insertedId.toString();
    res.json({data: day});
});

DayRouter.delete('/days/:id/recipes/:index', async (req, res) => {
    const id = req.params.id;
    const index = req.params.index;

    const day = await DB.collection('days').findOne({_id: ObjectId.createFromHexString(id)});
    const recipes = day.recipes;

    recipes[index] = null;

    await DB.collection('days').updateOne({_id: ObjectId.createFromHexString(id)}, {$set: {recipes}});
    res.json({message: 'ok'});
});

DayRouter.delete('/days/:id', async (req, res) => {
    const id = req.params.id;
    await DB.collection('days').deleteOne({_id: ObjectId.createFromHexString(id)});
    res.json({message: 'ok'});
});