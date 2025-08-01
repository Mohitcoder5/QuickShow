import express from 'express';
import { addShow, getNowPlayingMovies, getShow, getShows } from '../controllers/showController.js';
import { protectAdmin } from '../middleware/auth.js';

const showRouter = express.Router();

// Public route
showRouter.get('/now-playing', protectAdmin, getNowPlayingMovies);

// Admin-only routes
showRouter.post('/add', protectAdmin, addShow);

showRouter.get('/all', getShows);
showRouter.get('/:movieId', getShow);

export default showRouter;
