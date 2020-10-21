import express  from 'express';
import { Logger } from 'tslog';

const log = new Logger();
const app = express();
const PORT = 8080;

app.get('/', (req, res) => res.send(""));

app.listen(PORT, () => {
  log.info(`Serviço em execução na porta ${PORT}`)
});
