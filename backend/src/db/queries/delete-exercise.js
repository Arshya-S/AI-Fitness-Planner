const db = require('../connection');

const deleteExerciseById = (exerciseId) => {
  return db
    .query(`
      DELETE FROM exercises
      WHERE id = $1
      RETURNING id`,
      [exerciseId])
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      console.log('Query Error: ', err);
      throw err;
    });
};

module.exports = { deleteExerciseById };