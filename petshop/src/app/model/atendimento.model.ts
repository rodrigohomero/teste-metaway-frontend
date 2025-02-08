import { Cliente } from "./cliente.model";
import { Pet } from "./pet.model";

export class Atendimento {
    id?: number;
    pet: Pet = new Pet;
    data: Date = new Date;
    descricao: string = '';
    valor: number = 0;
  }
  