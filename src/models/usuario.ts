export interface User {
  EMP_AGENTERETENCION: number;
  EMP_ARCHIVO: string;          /* archivo firma electronica */
  EMP_AUTOMATICO: number;       /* 1 autorizar  boton de autorizar facturas*/
  EMP_CODIGO: number;           /* ambiente para la factura 1 prueba 2 produccion */
  EMP_COMPROBANTES: number;     /* default */
  EMP_DADICIONAL: number;       /* habilita det Cantidad */
  EMP_DIRECCION: string;
  EMP_EMAIL: string;
  EMP_ESTABLECIMIENTO: string;
  EMP_ESTADO: number;           /* default */
  EMP_FECHA: string;
  EMP_GUIAREMISION: number;     /* default */
  EMP_IMPUESTO: number;
  EMP_INCLUYEIVA: number;
  EMP_KEY: string;              /* Clave de la factura electronica */
  EMP_LICENCIA: string;
  EMP_LOGO: string;
  EMP_MENSAJE: string;          /* default */
  EMP_MULTILOCAL: number;       /* default */
  EMP_MULTIUSUARIO: number;     /* default */
  EMP_NCE: number;              /* Limite de factura */
  EMP_NOMBRE: string;           /* razon social */
  EMP_NOTIFICACION: number;     /* default */
  EMP_NUMERO: number;           /* Secuelcial del perfil */
  EMP_PRECISION: number;        /* Decimales */
  EMP_PTOEMISION: string;       /* emision */
  EMP_REGIMEN: number;
  EMP_RUC: string;
  EMP_SECUENCIAL: number;       /* NUmero de facturas */
  EMP_SOCIEDAD: number;         /* oblicado a llevar contabilidad */
  EMP_TELEFONO: string;
  EMP_USUKEY: string;           /* id */
}

export const initUser = (): User => ({
  EMP_AGENTERETENCION: 0,
  EMP_ARCHIVO: "",
  EMP_AUTOMATICO: 1,
  EMP_CODIGO: 1,
  EMP_COMPROBANTES: 1,
  EMP_DADICIONAL: 0,
  EMP_DIRECCION: "",
  EMP_EMAIL: "",
  EMP_ESTABLECIMIENTO: "",
  EMP_ESTADO: 1,
  EMP_FECHA: "",
  EMP_GUIAREMISION: 1,
  EMP_IMPUESTO: 0,
  EMP_INCLUYEIVA: 0,
  EMP_KEY: "",
  EMP_LICENCIA: "",
  EMP_LOGO: "",
  EMP_MENSAJE: "",
  EMP_MULTILOCAL: 1,
  EMP_MULTIUSUARIO: 0,
  EMP_NCE: 100,
  EMP_NOMBRE: "",
  EMP_NOTIFICACION: 0,
  EMP_NUMERO: 86,
  EMP_PRECISION: 2,
  EMP_PTOEMISION: "",
  EMP_REGIMEN: 0,
  EMP_RUC: "",
  EMP_SECUENCIAL: 179,
  EMP_SOCIEDAD: 0,
  EMP_TELEFONO: "",
  EMP_USUKEY: ""
});