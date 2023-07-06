export interface ReporteKardex {
  KDX_CODIGO: string;
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

export interface FiltrosKardex {}

export enum MovCodigo {
  INGRESO = 1,
  EGRESO = 2,
}

export enum KdxFGenerado {
  FACTURACION = "facturacion",
  INVENTARIOS = "inventarios",
}

export const initReporteKardex: ReporteKardex = {
  KDX_CODIGO: "",
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

export const initFiltrosKardex: FiltrosKardex = {};
