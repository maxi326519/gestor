export interface Producto {
  ITE_BARRAS: string;
  ITE_CODIGO: string;
  ITE_DESCRIPCION: string;
  ITE_ESTADO: number;         /* default */
  ITE_ICE: number;            /* default */
  ITE_IMPUESTO: number;       /* 0 o 2 */
  ITE_PVP: number;            /* Precio unitario */
  ITE_TIPO: number;           /* 0 producto 1 servicio */
  ITE_CANTIDAD: number;
  LOC_CODIGO: number          /* default */
  USU_KEY: string;
  VED_CANTIDAD: number        /* default */
}

export const initProduct = (): Producto => ({
  ITE_BARRAS: "",
  ITE_CODIGO: "",
  ITE_DESCRIPCION: "",
  ITE_ESTADO: 0,
  ITE_ICE: 0,
  ITE_IMPUESTO: 0,
  ITE_PVP: 0,
  ITE_TIPO: 0,
  ITE_CANTIDAD: 0,
  LOC_CODIGO: 0,
  USU_KEY: "",
  VED_CANTIDAD: 0,
});
