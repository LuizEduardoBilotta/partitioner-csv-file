import { dirname } from 'path';
import Main from './models/main.js';

const app = new Main(getCurrentDirectory());

function getCurrentDirectory() {
  const { pathname: currentFile } = new URL(import.meta.url);
  return dirname(currentFile);
}