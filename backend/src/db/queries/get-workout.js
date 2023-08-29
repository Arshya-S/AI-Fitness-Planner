const db = require('../connection');

const getWorkoutById = (id) => {
  return db
    .query(`
    SELECT * FROM workouts
    WHERE user_id = $1
    ORDER BY id`, [id])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log('Query Error: ', error);
    });
};

module.exports = { getWorkoutById };