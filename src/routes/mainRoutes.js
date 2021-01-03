const express = require('express');
const path = require('path')

const router = express.Router()

router.get('/board', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../public', 'board.html'));
})

module.exports = router;