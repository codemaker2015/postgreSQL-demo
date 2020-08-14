const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'my_database',
  password: 'root',
  port: 5432,
});

const getUser = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM User_Details ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const createUser = (body) => {
    return new Promise(function(resolve, reject) {
      const { name, email } = body
      pool.query('INSERT INTO User_Details (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`New user details has been added`)
      })
    })
  }  
  const updateUser = (body) => {
    return new Promise(function(resolve, reject) {
      const { id, name, email, weight, height } = body
      pool.query('UPDATE User_Details SET name = $2, email = $3 WHERE id = $1', [id, name, email], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`User details has been updated`)
      })
    })
  }
  const deleteUser = (id) => {
    return new Promise(function(resolve, reject) {  
      pool.query('DELETE FROM User_Details WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`User deleted`)
      })
    })
  }
  
  module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
  }