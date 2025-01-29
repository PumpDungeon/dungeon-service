const express = require('express');
const cors = require('cors');

const {generateMap} = require("./helpers/generateMap");

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/generate', (req, res) => {
    const dungeon = generateMap();

    return res.status(200).json({
        map: dungeon
    })
});

app.post('/api/move', (req, res) => {
    const {map, position} = req.body
    if (map[position.y][position.x] === 2) {
        return res.status(200).send({
            message: 'Not possible',
            possible: false
        })
    }

    return res.status(200).send({
        fight: Math.random() >= 0.8,
        position,
        possible: true
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Dungeon Service running on port ${PORT}`);
});
