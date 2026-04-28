import express from 'express'
import agentRoute from './routes/agent.route'
const app = express()

app.use(express.json())

app.use('/ai', agentRoute)
app.listen(3000, () => {
    console.log('server on port 3000')
})