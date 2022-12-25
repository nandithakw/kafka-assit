import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const config = {
    mode: 'production',
    entry: './app.js',
    target: "node",
    externals: {
        sqlite3: 'commonjs sqlite3'
    },
    output: {
        path: path.resolve(__dirname, ''),
        filename: 'app.bundle.js', chunkFormat: "commonjs"
    }
};

export default config;