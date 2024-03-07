import express from 'express'
import crypto from 'crypto'

const SECRET = process.env.SECRET!
const PORT = process.env.PORT!
const PATH = process.env.PATH!

const app = express()

app.use(
  express.json({
    // Verify will catch the request before parsing. If the request either
    // does not include a hash, or the hash does not match, throw an error.
    verify: (req, _res, buf, _encoding) => {
      const hmac = crypto.createHmac('sha1', SECRET)
      hmac.update(buf)
      const gitHash = req.headers['x-hub-signature']
      const myHash = hmac.digest('hex')

      if (gitHash && myHash) {
        const a = Buffer.from(gitHash.slice(5).toString())
        const b = Buffer.from(myHash)
        const result = crypto.timingSafeEqual(a, b)

        if (!result) throw new Error('Invalid Hash')
      } else {
        throw new Error('Invalid Hash')
      }
    },
  })
)

app.post(PATH, (req, res) => {
  console.log(req.body)
  res.status(200)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
