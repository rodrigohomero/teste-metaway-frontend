import { Cliente } from "./cliente.model";

export class Pet {
    id?: number;
    nome: string = '';
    raca: Raca = new Raca;
    cliente: Cliente = new Cliente;
    dataDeNascimento: Date = new Date
  }

  export class Raca{
    id?: number;
    descricao: string = '';
  }
  