const express = require('express');

const group = require('../models/group');

const router = express.Router();

router.post('/createGroup', async (req, res) => {
    try {
        const newGroup = await group.create(req.body);

        return res.send({ newGroup })
    } catch (err){
        return res.status(400).send({ error: 'Ops! Algo de errado ocorreu ao tentar criar o grupo. (Ref 00x303)'})
    }
});

module.exports = app => app.use('/group', router);