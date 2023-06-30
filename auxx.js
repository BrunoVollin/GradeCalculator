const XLSX = require('xlsx');
const json = require('./consolidated_grades2.json');

// Array de objetos
const data = json;

// Cria um novo workbook
const workbook = XLSX.utils.book_new();

// Cria um novo objeto que mapeia o nome dos testes para as colunas
const testColumns = {};

// Converte o array de objetos em um array de linhas
const rows = [];
rows.push(['Number', 'Name', ...data[0].grades.map(grade => {
  testColumns[grade.test] = grade.test;
  return grade.test;
})]);

data.forEach(obj => {
  const { number, name, grades } = obj;
  const row = [number, name];

  grades.forEach(grade => {
    row.push(grade.percent);
  });

  rows.push(row);
});

// Cria uma nova planilha com os dados
const worksheet = XLSX.utils.aoa_to_sheet(rows);

// Define o nome das colunas na planilha
worksheet["!cols"] = Object.keys(testColumns).map(test => {
  return { wch: test.length };
});

// Adiciona a planilha ao workbook
XLSX.utils.book_append_sheet(workbook, worksheet, 'Grades');

// Salva o workbook em um arquivo
XLSX.writeFile(workbook, 'grades.xlsx');
