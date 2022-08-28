export default class Config {

  constructor(cwd) {
    this.file = 'arrecadacao-estado';
    this.recordsPerFile = 1000;
    this.extension = '.csv';
    this.inputDir = `${cwd}/dataset/${this.file}${this.extension}`;
    this.outputDir = `${cwd}/dataset`  
  }
}
