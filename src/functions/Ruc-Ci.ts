export default function validaDocumento(documento: String): Array<any> {
  var respuesta: any = [];
  var Suma: number = 0;
  var Residuo: number = 0;
  var Natural: boolean = false;
  var Juridica: boolean = false;
  var Publica: boolean = false;
  var NumProvincias: number = 23;
  var digitoverificador: number = 0;
  if (documento.length >= 10) {
    var c1: number = Number(documento.substr(0, 1));
    var c2: number = Number(documento.substr(1, 1));
    var c3: number = Number(documento.substr(2, 1));
    var c4: number = Number(documento.substr(3, 1));
    var c5: number = Number(documento.substr(4, 1));
    var c6: number = Number(documento.substr(5, 1));
    var c7: number = Number(documento.substr(6, 1));
    var c8: number = Number(documento.substr(7, 1));
    var c9: number = Number(documento.substr(8, 1));
    var C10: number = Number(documento.substr(9, 1));
    switch (c3) {
      case 6:
        Publica = true;
        break;
      case 7:
      case 8:
        respuesta["correcto"] = "N";
        respuesta["mensaje"] = "Identificación no valida";
        break;
      case 9:
        Juridica = true;
        break;
      default:
        if (c3 < 6) {
          Natural = true;
        }
        break;
    }
    if (Natural) {
      if (
        Number(documento.substr(0, 2)) > 0 &&
        Number(documento.substr(0, 2)) <= NumProvincias
      ) {
        var p1: number = c1 * 2;
        var p2: number = c2 * 1;
        var p3: number = c3 * 2;
        var p4: number = c4 * 1;
        var p5: number = c5 * 2;
        var p6: number = c6 * 1;
        var p7: number = c7 * 2;
        var p8: number = c8 * 1;
        var p9: number = c9 * 2;
        var P10: number = C10 * 1;
        if (p1 >= 10) {
          p1 = p1 - 9;
        }
        if (p2 >= 10) {
          p2 = p2 - 9;
        }
        if (p3 >= 10) {
          p3 = p3 - 9;
        }
        if (p4 >= 10) {
          p4 = p4 - 9;
        }
        if (p5 >= 10) {
          p5 = p5 - 9;
        }
        if (p6 >= 10) {
          p6 = p6 - 9;
        }
        if (p7 >= 10) {
          p7 = p7 - 9;
        }
        if (p8 >= 10) {
          p8 = p8 - 9;
        }
        if (p9 >= 10) {
          p9 = p9 - 9;
        }
        if (P10 >= 10) {
          P10 = P10 - 9;
        }
        Suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9 + P10;
        Residuo = Suma % 10;

        if (documento.length === 10) {
          if (Residuo == 0) {
            respuesta["correcto"] = "S";
            respuesta["mensaje"] = "cedula";
          } else {
            respuesta["correcto"] = "N";
            respuesta["mensaje"] = "Cédula no valida";
          }
        } else if (documento.length > 10) {
          if (Residuo === 0) {
            if (
              Number(documento.substr(10, 3)) === 1 &&
              String(documento.substr(10, 3)).length === 3
            ) {
              if (
                String(documento.substr(10, 3)).length === 3
              ) {
                if (String(documento).length === 13) {
                  respuesta["correcto"] = "S";
                  respuesta["mensaje"] = "ruc";
                } else {
                  respuesta["mensaje"] =
                    "Número de Ruc correspondiente a Persona Natural es incorrecta, por favor verifícalo";
                  respuesta["correcto"] = "N";
                }
              } else {
                respuesta["mensaje"] =
                  "Número de Ruc correspondiente a Persona Natural es incorrecta, por favor verifícalp";
                respuesta["correcto"] = "N";
              }
            } else {
              respuesta["mensaje"] =
                "Número de Ruc correspondiente a Persona Natural es incorrecta, por favor verifícalo";
              respuesta["correcto"] = "N";
            }
          } else {
            if (Residuo == 0) {
              if (
                String(documento.substr(10, 3)).length === 3
              ) {
                if (String(documento).length == 13) {
                  respuesta["correcto"] = "S";
                  respuesta["mensaje"] = "ruc";
                } else {
                  respuesta["mensaje"] =
                    "Número de Ruc correspondiente a Persona Natural es incorrecta, por favor verifícalos";
                  respuesta["correcto"] = "N";
                }
              } else {
                respuesta["mensaje"] =
                  "Número de Ruc correspondiente a Persona Natural es incorrecta, por favor verifícalos";
                respuesta["correcto"] = "N";
              }
            } else {
              respuesta["mensaje"] =
                "Número de Ruc correspondiente a Persona Natural es incorrecta, por favor verifícalo";
              respuesta["correcto"] = "N";
            }
          }
        }
      } else {
        respuesta["correcto"] = "N";
        respuesta["mensaje"] =
          "Ruc de Persona Natural incorrecto, por favor verifícalo";
      }
    }
    if (Juridica) {
      if (
        Number(documento.substr(0, 2)) > 0 &&
        Number(documento.substr(0, 2)) <= NumProvincias
      ) {
        if (documento.length == 13) {
          p1 = c1 * 4;
          p2 = c2 * 3;
          p3 = c3 * 2;
          p4 = c4 * 7;
          p5 = c5 * 6;
          p6 = c6 * 5;
          p7 = c7 * 4;
          p8 = c8 * 3;
          p9 = c9 * 2;
          Suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;

          var ValDivision: number = Math.round(Number(Suma / 11));
          var ValMultiplicacion: number = ValDivision * 11;
          var VALRESTA: number = Suma - ValMultiplicacion;

          if (VALRESTA == 0) {
            digitoverificador = 0;
          } else {
            digitoverificador = 11 - VALRESTA;
          }

          if (
            Number(digitoverificador) == C10 &&
            Number(documento.substr(10, 3)) == 1
          ) {
            respuesta["correcto"] = "S";
            respuesta["mensaje"] = "ruc";
          } else {
            respuesta["correcto"] = "N";
            respuesta["mensaje"] =
              "Número de Ruc correspondiente a Persona Jurídica es incorrecta, por favor verificar";
          }
        } else {
          respuesta["correcto"] = "N";
          respuesta["mensaje"] =
            "Ruc de Persona Jurídica incorrecto, por favor verificar los digitos correspondientes a la Provincia";
        }
      }
    }

    if (Publica) {
      if (
        Number(documento.substr(0, 2)) > 0 &&
        Number(documento.substr(0, 2)) <= NumProvincias
      ) {
        if (documento.length == 13) {
          p1 = c1 * 3;
          p2 = c2 * 2;
          p3 = c3 * 7;
          p4 = c4 * 6;
          p5 = c5 * 5;
          p6 = c6 * 4;
          p7 = c7 * 3;
          p8 = c8 * 2;
          Suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;
          ValDivision = Math.round(Number(Suma / 11));
          ValMultiplicacion = ValDivision * 11;
          VALRESTA = Suma - ValMultiplicacion;
          digitoverificador = 11 - VALRESTA;
          if (
            (c9 == digitoverificador &&
              Number(documento.substr(9, 4)) > 0 &&
              Number(documento.substr(10, 3)) == 1) ||
            VALRESTA == 0
          ) {
            respuesta["correcto"] = "S";
            respuesta["mensaje"] = "ruc";
          } else {
            respuesta["mensaje"] =
              "Número de Ruc correspondiente a Empresas del Sector Público es incorrecta, por favor verificar";
            respuesta["correcto"] = "N";
          }
        } else {
          respuesta["correcto"] = "N";
          respuesta["mensaje"] =
            "Ruc de Empresas del Sector Público incorrecto, por favor verificar los digitos correspondientes a la Provincia";
        }
      } else {
        respuesta["correcto"] = "N";
        respuesta["mensaje"] =
          "Ruc de Empresas del Sector Público incorrecto, por favor verificar los digitos correspondientes a la Provincia";
      }
    }
  } else {
    respuesta["mensaje"] = "Numero de Documento no válido.";
    respuesta["correcto"] = "N";
  }
  return respuesta;
}
