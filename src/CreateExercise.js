import { useEffect, useState } from "react";

import DisplayExercises from "./DisplayExercises";

const CreateExercise = () => {

    let [name, setName] = useState('');
    let [description, setDescription] = useState('');
    let [type, setType] = useState('walk');
    let [duration, setDuration] = useState(1);
    let [date, setDate] = useState('');

    let [allExercises, setAllExercises] = useState([]);

    function addExercise(event) {
        event.preventDefault();

        let newExercise = {
            name,
            description,
            type,
            duration,
            date
        }


        fetch('http://localhost:8000/exercises', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newExercise)
        })
            .then(response => getExercises())
            .catch(err => console.log('error in posting blog', err));


        setName('');
        setDescription('');
        setType('walk');
        setDuration('5');
        setDate('');
    }

    function getExercises() {
        fetch('http://localhost:8000/exercises', { method: 'GET', mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                setAllExercises(data.exercises);
            })
            .catch(err => console.log("error:", err));
    }

    useEffect(() => {
        getExercises();
    }, [])


    return (
        <div className="create-exercise">

            <h1 className="display-2 text-center bg-light p-4">Exercise Tracker</h1>

            <div className="container-lg">

                <form className="my-4" id="exercise-form" onSubmit={e => addExercise(e)}>
                    <h3 className="display-5 mb-3">Exercise Information</h3>

                    {/* name */}
                    <div className="mb-3">
                        <label htmlFor="exercise-name" className="form-label">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exercise-name"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* description */}
                    <div className="mb-3">
                        <label htmlFor="exercise-description" className="form-label">Description:</label>
                        <textarea
                            className="form-control"
                            id="exercise-description"
                            rows="3"
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required></textarea>
                    </div>

                    {/* type */}
                    <div className="mb-3">
                        <label htmlFor="exercise-type" className="form-label">Type:</label>
                        <select
                            className="form-select"
                            id="exercise-type"
                            name="type"
                            value={type}
                            onChange={e => setType(e.target.value)}
                            required
                        >
                            <option value="run">Run</option>
                            <option value="bicycle-ride">Bicycle Ride</option>
                            <option value="swim">Swim</option>
                            <option value="walk">Walk</option>
                            <option value="hike">Hike</option>
                        </select>
                    </div>

                    {/* duration */}
                    <div className="mb-3">
                        <label htmlFor="exercise-duration" className="form-label">Duration:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="exercise-duration"
                            min="1"
                            name="duration"
                            value={duration}
                            onChange={e => setDuration(e.target.value)}
                            required />
                        <div className="form-text">Enter duration in minutes.</div>
                    </div>

                    {/* date */}
                    <div className="mb-3">
                        <label htmlFor="exercise-date" className="form-label">Date:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="exercise-date"
                            name="date"
                            
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            required />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                <DisplayExercises allExercises={allExercises} getExercises={getExercises} />

            </div>
        </div>
    );
}

export default CreateExercise;