let cors = require('cors');

let Exercise = require('../models/exercise');


function exercise_get(req, res) {
    Exercise.find()
        .then(result => {
            res.json({ exercises: result });
        })
        .catch(err => {
            console.log('can not find exercises', err);
        });
}

function exercise_post(req, res) {
    let exercise = new Exercise(req.body);

    exercise.save()
        .then(result => {
            res.json();
        })
        .catch(err => {
            console.log('error in posting document', err);
            res.status(400).json(err);
        })
}


function exercise_delete(req, res) {
    let delId = req.body.delId;

    Exercise.findByIdAndDelete(delId)
        .then(response => {
            res.json();
        })
        .catch(err => console.log('can not delete blog: ', err));
}

function exercise_put(req, res) {
    let exercise = req.body;

    Exercise.findByIdAndUpdate(exercise._id, exercise)
        .then(result => res.json())
        .catch(err => console.log('error in updating: ', err));
}


module.exports = {
    exercise_get,
    exercise_post,
    exercise_delete,
    exercise_put
}