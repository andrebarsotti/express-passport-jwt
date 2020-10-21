import express from 'express';
import bodyParser from 'body-parser';
import { Logger } from 'tslog';
import { env } from 'process';
import { ListarProfilesController } from './controllers/listarProfileController';
import { loginController } from './controllers/loginController';

const log = new Logger();
const app = express();
const PORT = env["PORT"];

app.use(bodyParser.json());

app.get('/', (req, res) => res.send(""));
app.get('/login', loginController)
app.get('/profile', ListarProfilesController);

app.listen(PORT, () => {
  log.info(`Site em execução na porta ${PORT}`)
});
