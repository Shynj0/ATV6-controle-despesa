import { Request, Response } from 'express';
import { Despesa } from '../models/Despesa';

export const criarDespesa = async (req: Request, res: Response) => {
    try {
        const { descricao, valor, data } = req.body;

        if (!descricao || valor == null || !data) {
            return res.status(400).json({ erro: 'Campos obrigatórios estão faltando.' });
        }

        if (valor < 0) {
            return res.status(400).json({ erro: 'O valor não pode ser negativo.' });
        }

        const novaDespesa = new Despesa({
            descricao,
            valor,
            data: new Date(data)
        });

        await novaDespesa.save();
        res.status(201).json(novaDespesa);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao criar a despesa.' });
    }
};

export const listarDespesas = async (req: Request, res: Response) => {
    try {
        const despesas = await Despesa.find().sort({ data: -1 });
        res.status(200).json(despesas);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar as despesas.' });
    }
};

export const atualizarDespesa = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { descricao, valor, data } = req.body;

        const despesaAtualizada = await Despesa.findByIdAndUpdate(
            id,
            { descricao, valor, data },
            { new: true, runValidators: true }
        );

        if (!despesaAtualizada) {
            return res.status(404).json({ erro: 'Despesa não encontrada.' });
        }
        res.status(200).json(despesaAtualizada);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao atualizar a despesa.' });
    }
};

export const excluirDespesa = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const despesaExcluida = await Despesa.findByIdAndDelete(id);

        if (!despesaExcluida) {
            return res.status(404).json({ erro: 'Despesa não encontrada.' });
        }
        res.status(200).json({ mensagem: 'Despesa excluída com sucesso.' });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao excluir a despesa.' });
    }
};

export const obterTotalDespesas = async (req: Request, res: Response) => {
    try {
        const total = await Despesa.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$valor" }
                }
            }
        ]);

        const totalAmount = total.length > 0 ? total[0].totalAmount : 0;
        res.json({ totalAmount });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao calcular o total das despesas' });
    }
};