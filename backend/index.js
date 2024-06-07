import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://lokesh:Lokesh70@cluster0.jan7vci.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
const dataSchema = new mongoose.Schema({
    intensity: Number,
    likelihood: Number,
    relevance: Number,
    year: Number,
    country: String,
    topics: [String],
    region: String,
    city: String,
    sector: String,
    pestle: String,
    source: String,
    swot: String,
})
const DataModel = mongoose.model("VisuzeData", dataSchema);
app.post('/api/post/data', async (req, res) => {
    try {
        const newData = new DataModel(req.body);
        const savedData = await newData.save();
        res.status(201).json(savedData)
    } catch (error) {
        console.log("error", error)
        res.status(400).json({message:"Errir while saving the data"})
    }
})
app.get('/api/data', async (req, res) => {
    try {
        const { year, topic, sector, region } = req.query;
        const query = {};
        if (year) query.year = year;
        if (topic) query.topics = topic;
        if (sector) query.sector = sector;
        if (region) query.region = region;
        const data = await DataModel.find(query);
        res.json(data);
    } catch (error) {
        res.status(400).json({message:"Error while importing data"})
        
    }

})
app.listen(4000, () => {
    console.log("connected to server")
})
