const express = require("express");
const mongoose = require('mongoose');

const app = express()
app.use(express.json())
const port = 3043

const DataModel = mongoose.model('teste', {
    title: String,
    description: String,
    image_url: String,
    url: String,
});

app.get("/", async (req, res)=> {
    try { 
        const newData = await DataModel.find()
        res.send(newData)
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar dados.')
    }
});

app.delete("/:id", async(req, res) =>{
    const deletedData = await DataModel.findByIdAndDelete(req.params.id);
    if (!deletedData) {
        res.status(404).send('Documento não encontrado.');
    } else {
        res.send(deletedData)
    }
    res.send(DataModel);
})

app.put("/:id", async(req, res) => {
    const upData = await DataModel.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        url: req.body.url
    })

    return res.send(upData);
})

app.post("/", async (req, res) => {
    const newData = new DataModel({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        url: req.body.url
    })

    await newData.save();
    res.send(newData);
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://vilabelarenan:XJI7RWu8gaLPX6ur@securitysuape.wpwnbix.mongodb.net/?retryWrites=true&w=majority');
    console.log('App running')
})