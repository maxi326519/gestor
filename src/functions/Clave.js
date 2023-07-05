"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function clave2(ruce, fecha, numero, est, pto, empCodigo) {
    var ca = "";
    var cad = "";
    var invert = "";
    var verificador = 0;
    var numerico = "12345678";
    var ruc = ruce;
    var ambiente = empCodigo;
    var emision = 1;
    var array = fecha.split("-");
    var dia = array[0];
    var mes = array[1];
    var anio = array[2];
    //numer de 9 digitos
    var numer = "";
    for (var a = 0; a < 9 - numero.length; a++) {
        numer += "0";
    }
    //relleno de 0
    numer = numer + numero;
    cad =
        dia +
            mes +
            anio +
            "01" +
            ruc +
            ambiente +
            est +
            pto +
            numer +
            numerico +
            emision;
    for (var j = cad.length - 1; j >= 0; j--) {
        invert += cad.charAt(j);
    }
    verificador = claveacceso(invert);
    //sumo clave de acceso + codigo verififcador
    ca = cad + verificador;
    function claveacceso(cadena) {
        var cantidadTotal = 0;
        var pivote = 2;
        var longitudCadena = cadena.length;
        var b = 1;
        for (var i = 0; i < longitudCadena; i++) {
            if (pivote === 8) {
                pivote = 2;
            }
            var temporal = Number("" + cadena.substring(i, b));
            b++;
            temporal *= pivote;
            pivote++;
            cantidadTotal += temporal;
        }
        cantidadTotal = 11 - (cantidadTotal % 11);
        if (cantidadTotal === 10) {
            cantidadTotal = 1;
        }
        else if (cantidadTotal === 11) {
            cantidadTotal = 0;
        }
        return cantidadTotal;
    }
    return ca;
}
exports.default = clave2;
