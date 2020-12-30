const express = require('express');
const path = require('path')

const router = express.Router()


router.post('/board', (req, res, next) => {
    req.session.nickname = req.body.nickname;
    console.log(req.session.nickname)
    if (req.session.nickname === null) {
        res.redirect('/');
    }
    res.sendFile(path.join(__dirname, '../../public', 'board.html'));
})

router.get('/*', (req, res, next) => {
    res.redirect('/');
})

module.exports = router;