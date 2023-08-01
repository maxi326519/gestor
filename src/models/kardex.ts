import { TipoDeMovimiento } from "./movements";

export interface ReporteKardex {
  KDX_CODIGO: string; // Key del kardex
  KDX_TIPO: TipoDeMovimiento;
  MCA_MOVIMIENTO: number; // saltar
  KDX_ID_DOCUMENTO: string; // id de factura o de movimiento
  KDX_GENERADO: KdxGenerado;
  KDX_FECHA: string;
  ITE_CODIGO: string;
  LOT_CODIGO?: number; // NUll por el momento
  KDX_LOCAL: number;
  KDX_DESCRIPCION: string; // {MCA_MOVIMIENTO} 001-001-00000008123
  KDX_CANTIDAD: number;
  KDX_PUNITARIO: number;
  KDX_SALDO: number; // Existencias restastes
  KDX_COSTO: number; // 0
  KDX_USUKEY: string;
}

export interface FiltrosKardex {
  itemId: string;
  year: string;
  month: string;
  day: string;
}

export enum KdxGenerado {
  VENTA = "venta",
  MOVIMIENTO = "movimiento",
}

export const initReporteKardex = (): ReporteKardex => ({
  KDX_CODIGO: "",
  KDX_TIPO: TipoDeMovimiento.INGRESO,
  MCA_MOVIMIENTO: 0,
  KDX_ID_DOCUMENTO: "",
  KDX_GENERADO: KdxGenerado.MOVIMIENTO,
  KDX_FECHA: "",
  ITE_CODIGO: "",
  LOT_CODIGO: 0,
  KDX_LOCAL: 0,
  KDX_DESCRIPCION: "",
  KDX_CANTIDAD: 0,
  KDX_PUNITARIO: 0,
  KDX_SALDO: 0,
  KDX_COSTO: 0,
  KDX_USUKEY: "",
});

export const initFiltrosKardex = (): FiltrosKardex => ({
  itemId: "",
  year: new Date().getFullYear().toString(),
  month: new Date().getMonth().toString(),
  day: "",
});
