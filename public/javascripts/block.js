(async () => {

    // const table = new Tabulator("#blockTable", {
    //     index:"height",
    //     ajaxURL:"/ajax/blocks",
    //     pagination:"remote",
    //     paginationSize:25,
    //     columns:[
    //         {title:"Height", field:"height", width:"10%"},
    //         {title:"Timestamp", field:"timestamp", width:"35%"},
    //         {title:"Harvester", field:"harvester", width:"35%"},
    //         {title:"#TXes", field:"txes", width:"10%"},
    //         {title:"Fees", field:"fees", width:"10%"},
    //     ],
    // });
    const table = new Tabulator("#blockTable", {
        index:"height",
        columns:[
            {title:"Height", field:"height", width:"10%"},
            {title:"Timestamp", field:"timestamp", width:"35%"},
            {title:"Harvester", field:"harvester", width:"35%"},
            {title:"#TXes", field:"txes", width:"10%"},
            {title:"Fees", field:"fees", width:"10%"},
        ],
    });

    $('#pagination').pagination({
        dataSource: function(done){
            axios.get('/ajax/chain/height').then((result) => {
                const height = result.data.height;
                let ar = [];
                for (let i = height; 0 < i; i--) {
                    ar.push(i);
                }
                done(ar);
            });
        },
        pageSize: 10,
        showGoInput: true,
        showGoButton: true,
        callback: function(data, pagination) {
            table.clearData();
            let count = 0;
            data.map((i) => {
                table.addData({
                    height:i,
                });
                setTimeout(async (i) => {
                    const resBlock = await axios.get("/ajax/block", {
                        params: {
                            height:i,
                        }
                    });
                    const tableData = [
                        {
                            height: resBlock.data.height,
                            timestamp: resBlock.data.timestamp,
                            harvester: resBlock.data.harvester,
                            txes: resBlock.data.txes,
                            fees: resBlock.data.fees,
                        },
                    ];
                    table.updateData(tableData);
                }, 1000 * count, i);
                count++;
            });
        }
    });

})();