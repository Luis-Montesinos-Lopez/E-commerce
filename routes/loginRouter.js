const express = require('express')
const loginRouter = express.Router()

/* -----------------------------------------------------------Login-------------------------------------------------------------------------------- */
loginRouter.post('/login', (request, response) => {
    const email = request.body.email
    const password = request.body.password
    connection.query(`select id as userId,nombre as name from usuarios where email='${email}' and password='${password}'`,
      (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
          if (result.length === 0) {
            response.send(pc.red({ message: 'El usuario no se encuentra registrado' }))
          } else {
            response.send(result[0])
          };
        })
      })
  })
module.exports=loginRouter