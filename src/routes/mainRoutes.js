const express = require('express');
const path = require('path')

const router = express.Router()

router.get('/', (req, res) => {
    req.session.nickname = null;
    res.sendFile(path.join(__dirname, '../../public', 'index.html'))
})

router.post('/board', (req, res, next) => {
    if (req.session.nickname) {
        res.redirect('/');
        return;
    }
    req.session.nickname = req.body.nickname;
    req.app.session = req.session;
    console.log(req.session.nickname)
    if (req.session.nickname === null) {
        res.redirect('/');
        return;
    }
    res.sendFile(path.join(__dirname, '../../public', 'board.html'));
})

module.exports = router;