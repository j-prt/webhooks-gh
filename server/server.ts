import express from 'express'
import crypto from 'crypto'
import path from 'path'
import shell from 'shelljs'
import dotenv from 'dotenv'

dotenv.config()

const SECRET = process.env.SECRET!
const PORT = process.env.PORT!
const POST_PATH = process.env.POST_PATH!
const SCRIPT_PATH = process.env.SCRIPT_PATH!

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

app.post(POST_PATH, (req, res) => {
  console.info(`New commit on ${req.body.repository?.name}. Running script...`)
  if (shell.exec(path.join(__dirname, SCRIPT_PATH)).code !== 0) {
    shell.echo('Script failed to execute.')
  }
  res.status(200).send()
})

app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`)
})
