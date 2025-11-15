import { Schema, model, Document } from 'mongoose';

export interface IDespesa extends Document {
    descricao: string;
    valor: number;
    data: Date;
}

const despesaSchema = new Schema<IDespesa>({
    descricao: {
        type: String,
        required: true,
        trim: true
    },
    valor: {
        type: Number,
        required: true,
        validate: (value: number) => value >= 0
    },
    data: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export const Despesa = model<IDespesa>('Despesa', despesaSchema, 'expenses');