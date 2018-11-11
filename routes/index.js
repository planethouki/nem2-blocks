var express = require('express');
var router = express.Router();
const nem2Sdk = require("nem2-sdk");
const BlockchainHttp = nem2Sdk.BlockchainHttp;
const rxjs = require("rxjs");
const op = require("rxjs/operators");

const host = "http://catapult48gh23s.xyz:3000";
const epochTimestamp = 1459468800000;


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Catapult' });
});

router.get('/ajax/chain/height', async function(req, res, next) {
    const blockchainHttp = new BlockchainHttp(host);
    const height = await blockchainHttp.getBlockchainHeight().toPromise();
    res.json({"height": height.compact()});
});

router.get('/ajax/block', async function(req, res, next) {
    const height = req.query.height;
    const blockchainHttp = new BlockchainHttp(host);
    blockchainHttp.getBlockByHeight(height).subscribe(
        (blockInfo) => {
            const data = {
                "height": blockInfo.height.compact(),
                "timestamp": new Date(blockInfo.timestamp.compact() + epochTimestamp),
                "harvester": blockInfo.signer.address.pretty(),
                "txes": blockInfo.numTransactions,
                "fees": blockInfo.totalFee.compact(),
            };
            res.json(data);
        },
        (error) => {
            console.error(error);
        }
    );

});

router.get('/ajax/blocks', async function(req, res, next) {
    const size = req.query.size;
    const page = req.query.page;
    const blockchainHttp = new BlockchainHttp(host);
    const height = await blockchainHttp.getBlockchainHeight().toPromise();
    const targetHeight = height.compact() - (size * (page - 1));
    const last_page = Math.ceil(height.compact() / size);
    blockchainHttp.getBlocksByHeightWithLimit(targetHeight, size).pipe(

    ).subscribe((blockInfos) => {
        const data = blockInfos.map((blockInfo) => {
            return {
                "height": blockInfo.height.compact(),
                "timestamp": new Date(blockInfo.timestamp.compact() + epochTimestamp),
                "harvester": blockInfo.signer.address.pretty(),
                "txes": blockInfo.numTransactions,
                "fees": blockInfo.totalFee.compact(),
            };
        });
        res.json({
            last_page,
            data
        });
    });
});

module.exports = router;
