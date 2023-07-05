export interface Establecimiento {
  LOC_ESTABLECIMIENTO: string;
  LOC_IMPRIME: number;
  LOC_NOMBRE: string;
  LOC_NUMERO: number;
  LOC_PTOEMISION: string;
  LOC_SECUENCIA: number;
  LOC_TELEFONO: string;
  LOC_ESTADO: number;
  LOC_USUKEY: string;
}

export interface ErrorEstablecimiento {
  LOC_ESTABLECIMIENTO: string;
  LOC_NOMBRE: string;
  LOC_NUMERO: string;
  LOC_PTOEMISION: string;
  LOC_TELEFONO: string;
  LOC_ESTADO: string;
}

export const initEstablecimiento: Establecimiento = {
  LOC_ESTABLECIMIENTO: "",
  LOC_IMPRIME: 0,
  LOC_NOMBRE: "",
  LOC_NUMERO: 0,
  LOC_PTOEMISION: "",
  LOC_SECUENCIA: 0,
  LOC_TELEFONO: "",
  LOC_ESTADO: 0,
  LOC_USUKEY: "",
};

export const initErrorEstablecimiento: ErrorEstablecimiento = {
  LOC_ESTABLECIMIENTO: "",
  LOC_NOMBRE: "",
  LOC_NUMERO: "",
  LOC_PTOEMISION: "",
  LOC_TELEFONO: "",
  LOC_ESTADO: "",
};
