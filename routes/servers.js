import {Router} from 'express'
import {getAll} from '../controllers/servers.js'

const router = Router();
export default router;

router.get('/api/server', (req, res) => [
  res.json({test: 'okeiushki'})
])

router.get('/api/server', getAll);