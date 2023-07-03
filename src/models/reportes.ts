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

export interface ReporteKardex {
  KDX_CODIGO: number;
  KDX_TIPO: number;
  MOV_CODIGO: MovCodigo;
  KDX_DOCUMENTO: number;
  KDX_GENERADO: KdxFGenerado;
  KDX_REGISTRO: string;
  ITE_CODIGO: number;
  LOT_CODIGO: number;
  KDX_LOCAL: number;
  KDX_DESCRIPCION: string;
  KDX_CANTIDAD: number;
  KDX_PUNITARIO: number;
  KDX_SALDO: number;
  KDX_COSTO: number;
  KDX_USUKEY: string;
}

export enum MovCodigo {
  INGRESO = 1,
  EGRESO = 2,
}

export enum KdxFGenerado {
  FACTURACION = "facturacion",
  INVENTARIOS = "inventarios",
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

export const initReporteKardex: ReporteKardex = {
  KDX_CODIGO: 0,
  KDX_TIPO: 0,
  MOV_CODIGO: MovCodigo.EGRESO,
  KDX_DOCUMENTO: 0,
  KDX_GENERADO: KdxFGenerado.FACTURACION,
  KDX_REGISTRO: "",
  ITE_CODIGO: 0,
  LOT_CODIGO: 0,
  KDX_LOCAL: 0,
  KDX_DESCRIPCION: "",
  KDX_CANTIDAD: 0,
  KDX_PUNITARIO: 0,
  KDX_SALDO: 0,
  KDX_COSTO: 0,
  KDX_USUKEY: "",
};
