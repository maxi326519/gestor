export interface MovCabecera {
  MCA_CODIGO: string; // Key del objeto
  MCA_MOVIMIENTO: number;
  MCA_FECHA: string; // Fecha del documento
  MCA_DOCUMENTO: string; // Key del documento
  MCA_TIPO: TipoDeMovimiento; // Tipo de documento "INGRESO" / "EGRESO"
  MCA_PROCLI: number;
  LOC_CODIGO: number; // Numero de local
  MCA_OBSERVACIONES: string;
  MCA_ESTADO: number;
  MCA_DETALLES: MovDetalle[];
  MCA_USUKEY: string; // UID del usuario
}

export enum TipoDeMovimiento {
  INGRESO = "INGRESO",
  EGRESO = "EGRESO",
}

export interface FiltrosMovimientos {
  year: string;
  month: string;
  day: string;
}

export interface MovDetalle {
  MDE_CODIGO: number;
  MCA_CODIGO: string; // Key del objeto
  ITE_CODIGO: string; // Key del Item
  MDE_CANTIDAD: number; // Cantidad del Item
  MDE_PRECIO: number; // Precio de venta
  MDE_OCOSTOS: number; // Precio de costo
  MDE_OCOSTOSIVA: number; // Iva del costo
  MDE_VALOR: number;
  MDE_NUMERO: number;
  MDE_LOTE: number;
  MDE_USUKEY: string; // Key del usuario
}

export const initMovCabecera: MovCabecera = {
  MCA_CODIGO: "",
  MCA_MOVIMIENTO: 1,
  MCA_FECHA: "",
  MCA_DOCUMENTO: "",
  MCA_TIPO: TipoDeMovimiento.INGRESO,
  MCA_PROCLI: 0,
  LOC_CODIGO: 0,
  MCA_OBSERVACIONES: "",
  MCA_ESTADO: 1,
  MCA_DETALLES: [],
  MCA_USUKEY: "",
};

export const initMovDetalle: MovDetalle = {
  MDE_CODIGO: 0,
  MCA_CODIGO: "",
  ITE_CODIGO: "",
  MDE_CANTIDAD: 0,
  MDE_PRECIO: 0,
  MDE_OCOSTOS: 0,
  MDE_OCOSTOSIVA: 0,
  MDE_VALOR: 0,
  MDE_NUMERO: 0,
  MDE_LOTE: 0,
  MDE_USUKEY: "",
};

export const initFiltrosMovimientos: FiltrosMovimientos = {
  year: new Date().getFullYear().toString(),
  month: "",
  day: "",
}
