import { useState } from "react";


const DisplayExercises = ({ allExercises, getExercises }) => {

    let [updateExercise, setUpdateExercise] = useState({
        name: "",
        description: "",
        type: "",
        duration: "",
        date: ""
    });

    function deleteExercise(event) {
        let delId = event.target.dataset.id;

        fetch('http://localhost:8000/exercises', {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ delId })
        })
            .then(response => getExercises())
            .catch(err => console.log('error in deleting exercise', err));
    }

    function displayModal(event) {

        let updateExerciseId = event.target.dataset.id;

        let updateExercise = allExercises.find((curExercise) => {
            return curExercise._id === updateExerciseId;
        })

        setUpdateExercise(updateExercise);

    }

    function putExercise() {

        fetch('http://localhost:8000/exercises', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateExercise)
        })
            .then(response => getExercises())
            .catch(err => console.log('error in deleting exercise', err));
    }


    return (
        <div className="display-exercises">

            <h3 className="display-5 my-4">Your Exercises:</h3>

            <div className="container">
                <div className="row" id="exercises-card-container">

                    {(allExercises.length != 0) && allExercises.map((exercise, index) => {
                        return (

                            <div className="col-sm-12 col-md-4 col-lg-3 d-flex justify-content-center" key={exercise._id}>
                                <div className="card border-secondary mb-3" style={{ maxWidth: '18rem' }}>
                                    <div className="card-header">{exercise.name}</div>
                                    <div className="card-body text-secondary">
                                        <h5 className="card-title">{exercise.type}</h5>
                                        <p className="card-text">{exercise.description}</p>
                                        <p className="card-text">{exercise.duration} min</p>
                                        <p className="card-text">{exercise.date}</p>
                                    </div>
                                    <div className="card-footer text-muted d-flex gap-3">
                                        <button className="btn btn-danger" data-id={exercise._id} onClick={deleteExercise}>Delete</button>
                                        <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#updateModal" data-id={exercise._id} onClick={(e, exercise) => displayModal(e, exercise)}>Update</button>
                                    </div>

                                </div>
                            </div>

                        )
                    })}

                    {(allExercises.length == 0) && <p className="lead">No exercises to display!</p>}

                </div>
            </div>


            {/* modal */}
            <div className="modal fade" id="updateModal" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="updateModalLabel">Update Exercise</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-2" id="exercise-form">

                                {/* name */}
                                <div className="mb-3">
                                    <label htmlFor="exercise-name" className="form-label">Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exercise-name"
                                        name="name"
                                        value={updateExercise.name}
                                        onChange={e => setUpdateExercise({ ...updateExercise, name: e.target.value })}
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
                                        value={updateExercise.description}
                                        onChange={e => setUpdateExercise({ ...updateExercise, description: e.target.value })}
                                        required></textarea>
                                </div>

                                {/* type */}
                                <div className="mb-3">
                                    <label htmlFor="exercise-type" className="form-label">Type:</label>
                                    <select
                                        className="form-select"
                                        id="exercise-type"
                                        name="type"
                                        value={updateExercise.type}
                                        onChange={e => setUpdateExercise({ ...updateExercise, type: e.target.value })}
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
                                        value={updateExercise.duration}
                                        onChange={e => setUpdateExercise({ ...updateExercise, duration: e.target.value })}
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
                                        value={updateExercise.date}
                                        onChange={e => setUpdateExercise({ ...updateExercise, date: e.target.value })}
                                        required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={ putExercise }>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default DisplayExercises;