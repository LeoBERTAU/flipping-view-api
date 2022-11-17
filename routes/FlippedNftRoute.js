const express = require('express')
const {
    getFlippedNfts,
    getSingleFlippedNft,
    createFlippedNft,
} = require('../controllers/FlippedNftController')

const router = express.Router()

// Get all hot NFT
router.get('/', getFlippedNfts)

module.exports = router