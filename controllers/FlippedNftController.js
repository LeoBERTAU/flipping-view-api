const FlippedNft = require('../models/FlippedNftModel')
const mongoose = require('mongoose')

// Get all FlippedNft
const getFlippedNfts = async (req, res) => {
    const hotnfts = await FlippedNft.find({}).sort({createdAt: -1})

    res.status(200).json(hotnfts)
}

// Get a single FlippedNft
const getSingleFlippedNft = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such hotnft'})
    }

    const flippedNft = await FlippedNft.findById(id)

    if(!hotnft) {
        return res.status(404).json({error: 'No such hotnft'})
    }

    res.status(200).json(hotnft)
}
 

// Post new hot NFT
const createFlippedNft =  async (req, res) => {
    const {name, contractAddress} = req.body
    // add doc to db
    try{
        const flippedNft = await FlippedNft.create({
            name, contractAddress
        })
        res.status(200).json(hotnft)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getFlippedNfts,
    getSingleFlippedNft,
    createFlippedNft,
}