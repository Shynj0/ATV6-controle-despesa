import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import rotasDespesas from './routes/rotasDespesas';

const app = express();
const PORTA = process.env.PORT || 3000;
const MONGO_URI = 'mongodb://localhost:27017/controle-despesas';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use('/api', rotasDespesas);

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Conectado ao MongoDB com sucesso!');
        app.listen(PORTA, () => {
            console.log(`Servidor rodando na porta ${PORTA} -> http://localhost:3000/`);
        });
    })
    .catch((erro) => {
        console.error('Erro ao conectar ao MongoDB:', erro);
    });