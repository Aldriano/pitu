import express from 'express'; 
//importar as rotas
import linksRouter from './routes/links'

const app = express(); //criar a aplicação, o objeto app.
app.use(express.json());  //a app vair receber e retornar dados no formato json - configuração no express

//diz para o app usar o linksRouter
app.use(linksRouter);

//inicializar a aplicação/subir. Por questão de profissionalismo, fazer em outro arquivo, então
//iremos exportar o app.ts. Será o server.ts na raíz do src, no nosso caso

export  default app;  //exportar nosso OBJETO app.

