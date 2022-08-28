import Config from '../../config/config.js';
import Utils from './utils.js';

export default class Main {

  constructor(cwd) {
    this.utils = new Utils();
    this.config = new Config(cwd);
    this.startProcess(this.config);
  }

  async startProcess(config) {
    console.log(`[INFO]: ### INICIANDO PROCESSO DE PARTICIONAMENTO DO ARQUIVO: [${config.file}${config.extension}] ###`);
    
    const data = await this.utils.readDataFromFile(config.inputDir);

    const arrayFileParts = this.utils.partitionerFile(data, config.recordsPerFile);

    console.log('[INFO]: Iniciando gravação dos novos arquivos...');
    for(const [index, part] of arrayFileParts.entries()) {
      await this.utils.writeDataFromFile(part, `parte${index + 1}`, config);
    }

    console.log(`[INFO]: ### FINALIZANDO PROCESSO DE PARTICIONAMENTO DO ARQUIVO: [${config.file}${config.extension}] ###`);
  }
}
