
const excel = require('exceljs');
const fs = require('fs');

const alphbet = 'ABCDEFGHIJKLMNOPQRSTUVXYZ'.split('');

const file = fs.readFileSync('./text.txt');

const lines = file.toString().split('\r\n');

const names = lines.map((item) => item.split(' - '));

const sort = {};

var data = [];
var data2 = [];
names.forEach((name) => {
    sort[name[1][0].toLocaleUpperCase()] ? sort[name[1][0].toLocaleUpperCase()].push(name) : sort[name[1][0].toLocaleUpperCase()] = [name];
})

alphbet.forEach((item) => {
    if (!sort[item]) {
        return;
    }

    data.push({ name: '' });
    data.push({ name: item });

    sort[item].forEach((name) => {
        data.push({ name: name[1], key: name[0] });
    })
});

var workbook = new excel.Workbook();
var sheetName = 'Sheet1';
var sheet = workbook.addWorksheet(sheetName);
sheet.columns = [{ key: "name", header: "name" }];
for (i in data) {
    sheet.addRow({
        ...data[i],
        key: '',
    });
}
var fileName = "names.xlsx";
workbook.xlsx.writeFile(fileName).then(() => { });




var workbook2 = new excel.Workbook();
var sheetName2 = 'Sheet2';
var sheet2 = workbook2.addWorksheet(sheetName2);
sheet2.columns = [{ key: "name", header: "name", width: '25' }, { key: "key", header: "key" }];
for (i in data) {
    sheet2.addRow(data[i]);
}
var fileName2 = "key.xlsx";
workbook2.xlsx.writeFile(fileName2).then(() => {});

