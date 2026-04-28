import express from 'express'
import { runAgent } from '../controller/agent.controller'

const router = express.Router()

router.post('/agent', runAgent)



export default router