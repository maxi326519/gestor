interface ruc {
  type: idType;
  message: string;
}

enum idType {
  ruc,
  cedula,
  pasaporte,
}

export default function validation(numero: number) {
  let suma: number = 0;
  let residuo: number = 0;
  let pri: boolean = false;
  let pub: boolean = false;
  let nat: boolean = false;
  let numeroProvincias: number = 22;
  let modulo: number = 11;
  let identification: ruc = {
    type: idType.ruc,
    message: ""
  }

  if(numero.toString().length === 13){
    identification.type = idType.ruc
  }else   if(numero.toString().length === 10){
    identification.type = idType.cedula
  }else{
    identification.type = idType.pasaporte
  }

  /* Los primeros dos digitos corresponden al codigo de la provincia */
  const provincia: number = Number(numero.toString().substring(0,2));
  if (provincia < 1 || provincia > numeroProvincias) {
    identification.message = "El código de la provincia (dos primeros dígitos) es inválido"
  }

  /* Aqui almacenamos los digitos de la cedula en variables. */
  const d1: number = Number(numero.toString().substring(0, 1));
  const d2: number = Number(numero.toString().substring(1, 2));
  const d3: number = Number(numero.toString().substring(2, 3));
  const d4: number = Number(numero.toString().substring(3, 4));
  const d5: number = Number(numero.toString().substring(4, 5));
  const d6: number = Number(numero.toString().substring(5, 6));
  const d7: number = Number(numero.toString().substring(6, 7));
  const d8: number = Number(numero.toString().substring(7, 8));
  const d9: number = Number(numero.toString().substring(8, 9));
  const d10: number = Number(numero.toString().substring(9, 10));

  /* El tercer digito es: */
  /* 9 para sociedades privadas y extranjeros   */
  /* 6 para sociedades publicas */
  /* menor que 6 (0,1,2,3,4,5) para personas naturales */

  if (d3 === 7 || d3 === 8) {
    identification.message = "El tercer dígito ingresado es inválido"
  }

  let p1: number = 0;
  let p2: number = 0;
  let p3: number = 0;
  let p4: number = 0;
  let p5: number = 0;
  let p6: number = 0;
  let p7: number = 0;
  let p8: number = 0;
  let p9: number = 0;

  /* Solo para personas naturales (modulo 10) */
  if (d3 < 6) {
    nat = true;
    p1 = d1 * 2;
    if (p1 >= 10) p1 -= 9;
    p2 = d2 * 1;
    if (p2 >= 10) p2 -= 9;
    p3 = d3 * 2;
    if (p3 >= 10) p3 -= 9;
    p4 = d4 * 1;
    if (p4 >= 10) p4 -= 9;
    p5 = d5 * 2;
    if (p5 >= 10) p5 -= 9;
    p6 = d6 * 1;
    if (p6 >= 10) p6 -= 9;
    p7 = d7 * 2;
    if (p7 >= 10) p7 -= 9;
    p8 = d8 * 1;
    if (p8 >= 10) p8 -= 9;
    p9 = d9 * 2;
    if (p9 >= 10) p9 -= 9;
    modulo = 10;
    suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
  } else if (d3 === 6) {

  /* Solo para sociedades publicas (modulo 11) */
  /* Aqui el digito verficador esta en la posicion 9, en las otras 2 en la pos. 10 */
    pub = true;
    p1 = d1 * 3;
    p2 = d2 * 2;
    p3 = d3 * 7;
    p4 = d4 * 6;
    p5 = d5 * 5;
    p6 = d6 * 4;
    p7 = d7 * 3;
    p8 = d8 * 2;
    p9 = 0;
    suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
  } else if (d3 === 9) {

  /* Solo para entidades privadas (modulo 11) */
    pri = true;
    p1 = d1 * 4;
    p2 = d2 * 3;
    p3 = d3 * 2;
    p4 = d4 * 7;
    p5 = d5 * 6;
    p6 = d6 * 5;
    p7 = d7 * 4;
    p8 = d8 * 3;
    p9 = d9 * 2;
    suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
  }
  residuo = suma % modulo;

  /* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
  const digitoVerificador = residuo === 0 ? 0 :( modulo - residuo);

  /* ahora comparamos el elemento de la posicion 10 con el dig. ver.*/
  if (pub === true) {
    if (digitoVerificador !== d9) {
      identification.message = "El ruc de la empresa del sector público es incorrecto."
    }
    /* El ruc de las empresas del sector publico terminan con 0001*/
    if (numero.toString().substring(9, 13) !== "0001") {
      identification.message = "El ruc de la empresa del sector público debe terminar con 0001"
    }
  } else if (pri == true) {
    if (digitoVerificador !== d10) {
      identification.message = "El ruc de la empresa del sector privado es incorrecto."
    }
    if (numero.toString().substring(10, 13) !== "001") {
      identification.message = "El ruc de la empresa del sector privado debe terminar con 001"
    }
  } else if (nat === true) {
    if (digitoVerificador !== d10) {
      identification.message = "El número de cédula de la persona natural es incorrecto."
    }
    if (numero.toString().length > 10 && numero.toString().substring(10, 13) !== "001") {
      identification.message = "El ruc de la persona natural debe terminar con 001"
    }
  }
  return identification;
}