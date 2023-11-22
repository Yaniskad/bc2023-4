const http = require('http');
const fs = require('fs');
const xml = require('fast-xml-parser')

const ids = ['BS2_ExpensesTotal', 'BS2_IncomeTotal']

const host = 'localhost';
const port = 8000;
const parser = new xml.XMLParser();
const builder = new xml.XMLBuilder();

const server = http.createServer((req, res) => {
    fs.readFile('date.xml', (err, data) => {
        res.writeHead(200);
        // res.setHeader('Content-Type', 'text');
        var blocks = parser.parse(data.toString())['indicators']['banksincexp'];
        var data = [];
        for(const block of blocks){
            if(ids.includes(block['id_api'])){
                data.push({'txt' : block['txt'], 'value' : block['value']});
            }
        }
        var builded = builder.build({'data': {'indicators' : data} });
        console.log(builded);
        res.end(builded);
    })
});

server.listen(port, host, () => {
    console.log('Server is running on http://' + host + ':'+ port);
})