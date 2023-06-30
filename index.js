const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

function calculateGradeValue(test) {
  if (test.includes("Exercício Avaliativo")) {
    return 10;
  } else if (test === "Relatório 05" || test === "Relatório 08") {
    return 6;
  } else {
    return 3;
  }
}

function processFile(filePath, consolidatedData) {
  const wb = XLSX.readFile(filePath);
  const firstSheet = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

  data.forEach((item, index) => {
    if (index > 0) {
      const name = item[0];
      let percent = item[9];
      const test = item[4];

      if (percent === "") {
        percent = 0;
      }

      if (!consolidatedData[name]) {
        consolidatedData[name] = {};
      }

      const nameAlreadyExists = consolidatedData.find((item) => item.name === name);

      const value = calculateGradeValue(test);

      if (nameAlreadyExists) {
        const idx = consolidatedData.findIndex((item) => item.name === name);
        consolidatedData[idx].grades.push({ test, percent, value });
      } else {
        consolidatedData.push({
          name,
          grades: [{ test, percent, value }],
        });
      }
    }
  });
}

function getTotalGrade(grades) {
  const updatedGrades = grades.map((item) => {
    let sum = 0;
     let total = 0;

    item.grades.forEach((grade) => {
      sum = (grade.value * grade.percent) / 100;
      console.log(`${grade.test}: ${sum}`);
      total += sum;
      item.total = total;
    });

    return item;
  });

  return updatedGrades;
}

function main() {
  const currentFolder = path.join(__dirname, 'xlsx');
  const files = fs.readdirSync(currentFolder).filter((file) => path.extname(file) === '.xlsx');

  const consolidatedData = [];

  files.forEach((file) => {
    const filePath = path.join(currentFolder, file);
    processFile(filePath, consolidatedData);
  });

  const result = getTotalGrade(consolidatedData);
  fs.writeFileSync('consolidated_grades.json', JSON.stringify(result));
}

main();
