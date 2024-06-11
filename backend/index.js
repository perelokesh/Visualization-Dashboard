import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { configDotenv } from 'dotenv';
configDotenv();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB)
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
        res.status(500).json({message:"Errir while saving the data"})
    }
})
app.get('/api/data', async (req, res) => {
    try {
        const filterFields = [
            'start_year','region', 'city', 'intensity','relevance','topics','likelihood','country'
        ];
        let filter = {};
        filterFields.forEach(field => {
            if(req.query[field]){
                if(field ===topics){
                 filter[field] = {$in:req.query[field].split(',')}
                }
                else{
                    filter[field] = req.query[field]
                }
            }   
        });
        const data = await DataModel.find(filter);
        res.json(data);
    } catch (error) {
        res.status(500).json({message:"Error while importing data"})
        
    }

})
app.listen(4000, () => {
    console.log("connected to server")
})
