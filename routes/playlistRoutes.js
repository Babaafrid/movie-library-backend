const express = require('express');
const { getPlaylists, addMovieToPlaylist, deleteMovieFromPlaylist} = require('../controllers/playlistController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getPlaylists);
router.post('/', protect, addMovieToPlaylist);
router.delete('/:imdbID', protect, deleteMovieFromPlaylist);

module.exports = router;
