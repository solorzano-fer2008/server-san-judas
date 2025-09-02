import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.status (202).json ({
    msg: 'Hello World'
  })
  console.log ("dentro de el get")
})

app.listen(3000)