import express from 'express';
import path from 'path';
import jsonServer from 'json-server';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Настройка json-server
const apiRouter = jsonServer.router(path.join(__dirname, 'dist', 'db.json'));
const middlewares = jsonServer.defaults();
app.use('/api', middlewares, apiRouter);

// Обслуживание статических файлов React
app.use(express.static(path.join(__dirname, 'dist')));

// Все остальные запросы перенаправляются на index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});