const express = require('express')
const router = express.Router()

const {
    getHotNfts
} = require('../controllers/HotNftController')

// Get all hot NFT
router.get('/', getHotNfts)

module.exports = router