const app = require('./server')

const port = process.env.port
app.listen(port, ()=> {
  console.log('server started on port ' + port)
})