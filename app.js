const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb")
const app = express();

app.use(cors());
app.use(express.json())
let db;
const client = new MongoClient("mongodb://localhost:27017");
client.connect().then(() => {
    db = client.db("shool");
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("MongoDB unconnect");
});


// ดึงข้อมูลทั้งหมด
app.get('/students', async (req, res) => {
    try {
        const product = await db.collection("student").find().toArray();
        res.json(product);
    } catch (err) {
        res.json("error");
    }
});

app.get('/students/search/:search', async (req, res) => {
    try {
        const search = req.params.search;
        const product = await db.collection("student").find({
            "name": search
        }).toArray();


        res.json(product);
    } catch (err) {
        res.json("error");
    }
});


// ดึงข้อมูลรายการนั้น
app.get('/students/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await db.collection("student").findOne({
            "_id": new ObjectId(id)
        });
        res.json(product);
    } catch (err) {
        res.json("error");
    }
});

// เพิ่มข้อมูลใหม่
app.post('/students', async (req, res) => {
    try {
        const data = req.body;
        const product = await db.collection("student").insertOne(data);
        res.json(product);
    } catch (err) {
        res.json("error");
    }
});

// แก้ไขข้อมูล
app.put('/students/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const product = await db.collection("student").updateOne({
            "_id": new ObjectId(id)
        }, {
            $set: data
        });
        res.json(product);
    } catch (err) {
        res.json("error");
    }
});

// ลบข้อมูล
app.delete('/students/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await db.collection("student").deleteOne({
            "_id": new ObjectId(id)
        });
        res.json(product);
    } catch (err) {
        res.json("error");
    }
});


app.listen(3000, () => {
    console.log('Server started: success');
});