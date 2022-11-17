const Moralis = require('moralis').default;
const EvmChain =  require('@moralisweb3/evm-utils')
const url = require("url")
const axios = require('axios')

// Utils

var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };


// Get all HotNfts
const getHotNfts = async (req, res) => {
    console.log("API Call to hotnfts Endpoint");
    const queryObject = url.parse(req.url, true).query;
    console.log(queryObject);
    const address = queryObject.address;
    console.log(address);

    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

    const response = await Moralis.EvmApi.nft.getWalletNFTTransfers({
        chain: EvmChain.ETHEREUM,
        address: address,
        // limit: 50,
    })

    //console.log(response.data);
    const data = response.data;
    const result = data.result;
    //console.log(result);

    // Filter data to keep only nft bought by address
    const filteredResult = result.filter((transaction) => (transaction.to_address === address && transaction.value > 0))

    // Group transactions by token address
    const groupedResult = filteredResult.reduce((group, object) => {
        const { token_address } = object;
        group[token_address] = group[token_address] ?? [];
        group[token_address].push(object);
        return group;
      }, {});

    console.log(groupedResult);

    // merge objects based on id 
    // const a3 = a1.map(t1 => ({...t1, ...a2.find(t2 => t2.id === t1.id)}))

    res.status(200).json(groupedResult)
}


module.exports = {
    getHotNfts,
}

