const express = require('express');
const router = express.Router();
const getExercises = require('../db/queries/get-exercises');
const getExercisesByWorkoutId = require('../db/queries/get-exercises-by-workout-id');
const editExercise = require('../db/queries/edit-exercise');

// Get route for exercises
router.get('/', (req, res) => {
  getExercises.getAllExercisesForDropDownMenu()
    .then(data => {
      res.json(data);
    });
});

// Get route for individual exercise
router.get('/:id', (req, res) => {
  const workoutId = req.params.id;
  getExercisesByWorkoutId.getExercisesByWorkoutId(Number(workoutId))
    .then(data => {
      res.json(data);
    });
});

// Post route for individual exercise
router.post('/:id', (req, res) => {
  const workoutId = req.params.id;
  getExercisesByWorkoutId.getExercisesByWorkoutId(Number(workoutId))
    .then(data => {
      res.json(data);
    });
});

// Put route to edit an exercise
router.put('/edit/:id', (req, res) => {
  const exerciseId = req.params.id;
  const updatedExerciseData = req.body; // Assuming updated exercise data is sent in the request body
  editExercise.editExerciseById(exerciseId, updatedExerciseData)
    .then(data => {
      res.json(data);
    });
});

// Delete route to delete an exercise
router.delete('/delete/:id', (req, res) => {
  const exerciseId = req.params.id;
  deleteExercise.deleteExerciseById(exerciseId)
    .then(data => {
      res.json(data);
    });
});

module.exports = router;