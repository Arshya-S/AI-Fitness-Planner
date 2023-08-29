const express = require('express');
const router = express.Router();
const getWorkouts = require('../db/queries/get-workout');
const addWorkouts = require('../db/queries/add-workout');
const addExerciseByWorkoutId = require('../db/queries/add-exercise-for-workout');
const deleteWorkout = require('../db/queries/delete-workout');
const editExercisesByWorkoutId = require('../db/queries/edit-exercise-for-workout');
const editWorkouts = require('../db/queries/edit-workout');

// Get route for individual workout
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const workout = await getWorkouts.getWorkoutById(Number(userId));
    if (!workout) {
      res.status(404).json({ message: 'Workout not found' });
    } else {
      res.json(workout);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete route for indvidual workout
router.delete('/:id', (req, res) => {
  const workoutId = req.params.id;
  deleteWorkout.deleteWorkoutByWorkoutId(Number(workoutId))
    .then(data => {
      res.json(data);
    });
});

// Post route for individual workout
router.post('/create/:id', (req, res) => {
  const userId = req.params.id;
  const title = req.body.title;
  const exercises = req.body.exercises; // array of objects

  addWorkouts.addWorkout(userId, title)
    .then(workoutId => {
      for (const exercise of exercises) {
        addExerciseByWorkoutId.addExerciseByWorkoutId(workoutId, exercise);
      }
    });
  res.sendStatus(200);
});

// Post route for editing individual workout
router.post('/edit/:id', (req, res) => {
  const userId = req.params.id;
  const title = req.body.title;
  const workoutId = req.body.workoutId;
  const exercises = req.body.exercises; // array of objects

  editWorkouts.editWorkout(userId, title, workoutId).then(_ => {
    Promise.all(exercises.flatMap(exercise => editExercisesByWorkoutId.editExerciseByWorkoutId(exercise))).then(data => {
      res.json(data.flat());
    });
  });
});


module.exports = router;