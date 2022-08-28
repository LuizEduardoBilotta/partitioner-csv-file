import fs from 'fs';
import neatCsv from 'neat-csv';
import ObjectsToCsv from 'objects-to-csv';

export default class Utils {

  async readDataFromFile(inputDir) {
    try {
      console.log('[INFO]: Iniciando leitura dos dados...');

      const dados = fs.readFileSync(inputDir);
      console.log('[INFO]: Leitura dos dados realizada com sucesso!');
      
      return neatCsv(dados, {separator: ';'});
          
    } catch(error) {
    
      console.log(`[ERROR]: Ocorreu um erro ao realizar a leitura do arquivo. Causa: ${error}`);
    
    }
  }

  partitionerFile(data, recordsPerFile) {
    console.log('[INFO]: Iniciando particionamento do arquivo...');
    const quantNewFiles = this.discoveryQuantPart(data.length, recordsPerFile);

    let start = 0;
    let end = recordsPerFile;
    let newPart = null;
    const arrayFileParts = new Array();

    for (let counter = 1; counter <= quantNewFiles.integerPart; counter++) {
      newPart = data.slice(start, end);
      arrayFileParts.push(newPart);
      start = end;
      end = recordsPerFile * (counter + 1);
    }

    if(quantNewFiles.decimalPart !== 0) {
      newPart = data.slice(-quantNewFiles.decimalPart);
      arrayFileParts.push(newPart);
    }

    console.log('[INFO]: Arquivo particionado com sucesso!');
    return arrayFileParts;
  }

  async writeDataFromFile(dataPart, partFileName, config) {
    try {
      const newCsv = new ObjectsToCsv(dataPart);
      const fileName = `${config.outputDir}/${config.file}-${partFileName}${config.extension}`;
      await newCsv.toDisk(fileName);
      console.log(`Dados gravados com sucesso para: [${fileName}]`);  
    
    } catch(error) {
      
      console.log(`[ERROR]: Ocorreu um erro ao realizar a escrita do arquivo. Causa: ${error}`);
    
    }
  }

  discoveryQuantPart(data, recordsPerFile) {
    return {
      integerPart: Number.parseInt(data / recordsPerFile),
      decimalPart: Number.parseInt(data % recordsPerFile)
    };    
  }

}