import express from 'express'

const app = express()

app.get('/', (req, res) => {
  console.log('hit root')
  console.log(req)
  res.send({ thanks: 'for clicking' })
})

app.listen(4001, () => {
  console.log('Listening on port 4001')
})
