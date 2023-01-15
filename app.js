
let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let dotenv = require('dotenv').config();



let exerciseControllers = require('./controller/exerciseController');

let app = express();
let uri = `mongodb+srv://${process.env.USER}:${process.env.PW}@exercise-tracker-cluste.ujpmjt6.mongodb.net/exercise-tracker-database?retryWrites=true&w=majority`;
console.log("HELLLLLLLLLLLLLO\n", uri)

app.use(cors());
app.use(express.json());

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        app.listen(8000);
        console.log('connection to database established! listening to requests now');
    })
    .catch(err => console.log('mongoDB database connection failed!', err));


app.get('/exercises', exerciseControllers.exercise_get);


app.post('/exercises', exerciseControllers.exercise_post);


app.delete('/exercises', exerciseControllers.exercise_delete);


app.put('/exercises', exerciseControllers.exercise_put);