const db = require('../connection');

const editExerciseById = (exerciseId, updatedExerciseData) => {
  const { name, sets, reps } = updatedExerciseData; // Assuming you're updating name, sets, and reps

  return db
    .query(`
      UPDATE exercises
      SET name = $1, sets = $2, reps = $3
      WHERE id = $4
      RETURNING id, name, sets, reps`,
      [name, sets, reps, exerciseId])
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      console.log('Query Error: ', err);
      throw err;
    });
};

module.exports = { editExerciseById };