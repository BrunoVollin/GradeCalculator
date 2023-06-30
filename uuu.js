const XLSX = require('xlsx');
const json1 = require('./consolidated_grades.json');
const json2 = require('./numers.json');
const fs = require('fs');

function stringTerminaComEspaco(str) {
    return str[str.length - 1] === ' ';
}


try {

    const newJson = json1.map((item) => {
        json2.forEach((item2) => {
            if (stringTerminaComEspaco(item.name)) {
                item.name = item.name.slice(0, -1);
            }
            item.name = item.name.toUpperCase();
            if (item.name.toUpperCase() === item2.name.toUpperCase()) {
                item.number = item2.number;
                console.log(`${item.name.toUpperCase()} - ${item2.name.toUpperCase()}`);
            }
        });
        return item;
    });

    fs.writeFileSync('consolidated_grades2.json', JSON.stringify(newJson));
} catch (err) {
    console.log(err);
}