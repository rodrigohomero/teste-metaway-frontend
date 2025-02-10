import { Pet } from "./pet.model";
import { Usuario } from "./usuario.model";

export class Cliente {
    id?: number;
    nome: string = '';
    cpf: string = '';
    dataCadastro: Date = new Date;
    endereco: Endereco = new Endereco;
    contato: Contato = new Contato;
    usuario: Usuario = new Usuario;
    pets: Pet[] = []
  }


  export class Endereco {
    id?: number;
    logradouro: string = '';
    bairro: string = '';
    cidade: string = '';
    complemento: string = '';
    tag: string = '';
  }

  export class Contato {
    id?: number;
    tag: string = ''
    tipo: string = '';
    valor: string = '';
  }
  
  
  