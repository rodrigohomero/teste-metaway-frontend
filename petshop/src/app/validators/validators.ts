import { AbstractControl, ValidationErrors } from "@angular/forms";

export function ValidateCpf(control: AbstractControl) {
  const cpf = control.value;
  if (cpf) {
    let numbers, digits, sum, i, result, equalDigits;
    equalDigits = 1;
    if (cpf.length < 11) {
      return { invalidCpf: true };
    }

    for (i = 0; i < cpf.length - 1; i++) {
      if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
        equalDigits = 0;
        break;
      }
    }

    if (!equalDigits) {
      numbers = cpf.substring(0, 9);
      digits = cpf.substring(9);
      sum = 0;
      for (i = 10; i > 1; i--) {
        sum += numbers.charAt(10 - i) * i;
      }

      result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

      if (result !== Number(digits.charAt(0))) {
        return { invalidCpf: true };
      }

      numbers = cpf.substring(0, 10);
      sum = 0;

      for (i = 11; i > 1; i--) {
        sum += numbers.charAt(11 - i) * i;
      }
      result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

      if (result !== Number(digits.charAt(1))) {
        return { invalidCpf: true };
      }

      return null;
    } else {
      return { invalidCpf: true };
    }
  }
  return { invalidCpf: true };
}

export function ValidateCnpj(control: AbstractControl) {

  let cnpj = control.value;

  // Ignora validação se o campo estiver vazio (permitindo que seja opcional)
  if (!cnpj || cnpj.trim() === '') {
    return null; // Campo vazio é considerado válido
  }

  if (cnpj) {
    let size, numbers, digits, sum, pos;

    if (cnpj.length < 14 && cnpj.length < 15) {
      return { invalidCnpj: true };
    }

    // Remove invalid chars
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj === '') {
      return { invalidCnpj: true };
    }

    if (cnpj.length !== 14) {
      return { invalidCnpj: true };
    }

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj === '00000000000000' ||
      cnpj === '11111111111111' ||
      cnpj === '22222222222222' ||
      cnpj === '33333333333333' ||
      cnpj === '44444444444444' ||
      cnpj === '55555555555555' ||
      cnpj === '66666666666666' ||
      cnpj === '77777777777777' ||
      cnpj === '88888888888888' ||
      cnpj === '99999999999999'
    ) {
      return { invalidCnpj: true };
    }

    // Valida DVs
    size = cnpj.length - 2;
    numbers = cnpj.substring(0, size);
    digits = cnpj.substring(size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== Number(digits.charAt(0))) {
      return { invalidCnpj: true };
    }

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== Number(digits.charAt(1))) {
      return { invalidCnpj: true };
    }

    return null;
  }
  return { invalidCnpj: true };
}


export function ValidarFormatoData(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  const regex = /^([0-2][0-9]|(3)[0-1])\/((0)[0-9]|(1)[0-2])\/\d{4}$/;

  if (valor && !regex.test(valor)) {
    return { invalidDate: true };
  }

  return null;
}