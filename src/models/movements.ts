export interface MovCabecera {
  MCA_CODIGO: string;
  MCA_MOVIMIENTO: string;
  MCA_FECHA: string;
  MCA_DOCUMENTO: string;
  MCA_TIPO: string;
  MCA_PROCLI: number;
  LOC_CODIGO: number;
  MCA_OBSERVACIONES: string;
  MCA_ESTADO: number;
  MCA_DETALLES: MovDetalle[];
  MCA_USUKEY: string;
}

export interface MovDetalle {
  MDE_CODIGO: number;
  MCA_CODIGO: number;
  ITE_CODIGO: number;
  MDE_CANTIDAD: number;
  MDE_PRECIO: number;
  MDE_OCOSTOS: number;
  MDE_OCOSTOSIVA: number;
  MDE_VALOR: number;
  MDE_NUMERO: number;
  MDE_LOTE: number;
  MDE_USUKEY: string;
}

export const initMovCabecera: MovCabecera = {
  MCA_CODIGO: "",
  MCA_MOVIMIENTO: "",
  MCA_FECHA: "",
  MCA_DOCUMENTO: "",
  MCA_TIPO: "",
  MCA_PROCLI: 0,
  LOC_CODIGO: 0,
  MCA_OBSERVACIONES: "",
  MCA_ESTADO: 0,
  MCA_DETALLES: [],
  MCA_USUKEY: "",
};

export const initMovDetalle: MovDetalle = {
  MDE_CODIGO: 0,
  MCA_CODIGO: 0,
  ITE_CODIGO: 0,
  MDE_CANTIDAD: 0,
  MDE_PRECIO: 0,
  MDE_OCOSTOS: 0,
  MDE_OCOSTOSIVA: 0,
  MDE_VALOR: 0,
  MDE_NUMERO: 0,
  MDE_LOTE: 0,
  MDE_USUKEY: "",
};
