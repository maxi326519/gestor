import { TipoDeMovimiento } from "./movements";

export interface ReporteKardex {
  KDX_CODIGO: string;
  KDX_TIPO: TipoDeMovimiento;
  MOV_CODIGO: string;
  KDX_DOCUMENTO: number;
  KDX_GENERADO: KdxFGenerado;
  KDX_REGISTRO: string;
  ITE_CODIGO: string;
  LOT_CODIGO: number;
  KDX_LOCAL: number;
  KDX_DESCRIPCION: string;
  KDX_CANTIDAD: number;
  KDX_PUNITARIO: number;
  KDX_SALDO: number;
  KDX_COSTO: number;
  KDX_USUKEY: string;
}

export interface FiltrosKardex {
  itemId: string;
  year: string;
  month: string;
  day: string;
}

export enum KdxFGenerado {
  FACTURACION = "facturacion",
  INVENTARIOS = "inventarios",
}

export const initReporteKardex: ReporteKardex = {
  KDX_CODIGO: "",
  KDX_TIPO: TipoDeMovimiento.EGRESO,
  MOV_CODIGO: "",
  KDX_DOCUMENTO: 0,
  KDX_GENERADO: KdxFGenerado.FACTURACION,
  KDX_REGISTRO: "",
  ITE_CODIGO: "",
  LOT_CODIGO: 0,
  KDX_LOCAL: 0,
  KDX_DESCRIPCION: "",
  KDX_CANTIDAD: 0,
  KDX_PUNITARIO: 0,
  KDX_SALDO: 0,
  KDX_COSTO: 0,
  KDX_USUKEY: "",
};

export const initFiltrosKardex: FiltrosKardex = {
  itemId: "",
  year: new Date().getFullYear().toString(),
  month: new Date().getMonth().toString(),
  day: "",
};
