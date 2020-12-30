const express = require('express');

const router = express.Router()

router.get('/', (req, res) => {
    res.send('sup bithc')
})

module.exports = router;
