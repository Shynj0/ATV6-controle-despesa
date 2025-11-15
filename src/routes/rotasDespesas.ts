import { Router } from 'express';
import {
    criarDespesa,
    listarDespesas,
    atualizarDespesa,
    excluirDespesa,
    obterTotalDespesas
} from '../controllers/despesaController';

const router = Router();

router.post('/despesas', criarDespesa);
router.get('/despesas', listarDespesas);
router.put('/despesas/:id', atualizarDespesa);
router.delete('/despesas/:id', excluirDespesa);
router.get('/despesas/total', obterTotalDespesas);

export default router;