import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js', // Altere para o arquivo de entrada principal do seu projeto
  output: {
    file: 'dist/bundle.js', // Onde o bundle será gerado
    format: 'cjs', // Formato do bundle (CommonJS)
  },
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.json'], // Certifique-se de que o Rollup resolva também .js e .jsx
    }),
    commonjs(), // Para converter módulos CommonJS para ES6
  ],
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, 'src/Utils'), // Se quiser criar aliases para facilitar os imports
    },
  },
};
