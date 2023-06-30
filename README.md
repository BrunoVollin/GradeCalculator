# Script de Cálculo de Notas

Este é um script em Node.js que lê arquivos XLSX de uma pasta específica, processa os dados e calcula as notas finais com base em critérios pré-definidos. O resultado é armazenado em um arquivo JSON chamado `consolidated_grades.json`.

## Pré-requisitos

Certifique-se de ter o Node.js instalado no seu sistema antes de executar este script.

## Instalação de Dependências

Antes de executar o script, é necessário instalar as dependências necessárias. Certifique-se de ter acesso à internet para realizar a instalação.

Execute o seguinte comando para instalar as dependências:

```shell
npm install xlsx
```

## Como usar

1. Coloque todos os arquivos XLSX que deseja processar na pasta "xlsx" no mesmo diretório deste script.

2. Execute o seguinte comando no terminal:

   ```shell
   node index.js
   ```

3. Aguarde até que o script processe todos os arquivos e gere o arquivo `consolidated_grades.json`.

4. O arquivo `consolidated_grades.json` conterá os dados consolidados das notas, incluindo o nome do aluno, as notas dos testes e a nota final.

## Sobre as Notas

O cálculo das notas é feito de acordo com as seguintes regras:

- Se o teste for do tipo "Exercício Avaliativo", a nota será 10.
- Se o teste for "Relatório 05" ou "Relatório 08", a nota será 6.
- Caso contrário, a nota será 3.

## Estrutura do Código

O código está organizado da seguinte forma:

- Importação dos módulos `fs`, `path` e `xlsx`.
- Definição da função `calculateGradeValue` para calcular o valor da nota com base no tipo de teste.
- Definição da função `processFile` para processar um arquivo XLSX e extrair os dados relevantes.
- Definição da função `getTotalGrade` para calcular a nota total de cada aluno.
- Definição da função `main` que coordena todo o processo.
- Execução da função `main` para iniciar o processamento.

Certifique-se de ajustar o código de acordo com as necessidades do seu projeto antes de executá-lo.
