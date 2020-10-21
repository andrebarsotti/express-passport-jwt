import express from 'express';
import bodyParser from 'body-parser';
import { Logger } from 'tslog';
import { env } from 'process';
import { ListarProfilesController } from './controllers/listarProfileController';
import { loginController } from './controllers/loginController';
import { Auth } from './authentication/auth';

const log = new Logger();
const app = express();
const PORT = env["PORT"];
const auth = new Auth();

app.use(bodyParser.json());
app.use(auth.initialize())

app.get('/', (req, res) => res.send(""));
app.post('/login', loginController)
app.get('/profile', auth.authenticate(), ListarProfilesController);

app.listen(PORT, () => {
  log.info(`Site em execução na porta ${PORT}`)
});
