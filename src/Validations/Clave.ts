export default function clave2(
  ruce: String,
  fecha: String,
  numero: String,
  est: String,
  pto: String
): String {
  var ca: String = "";
  var cad: String = "";
  var invert: String = "";
  var verificador: int = 0;
  var numerico: String = "12345678";
  var ruc: String = ruce;
  var ambiente: int = int(parentApplication.emp_codigo);
  var emision: int = 1;
  var array: Array = fecha.split("-");
  var dia: String = array[0];
  var mes: String = array[1];
  var anio: String = array[2];
  //numer de 9 digitos
  var numer: String = "";
  for (var a: int = 0; a < 9 - numero.length; a++) {
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

  for (var j: int = cad.length - 1; j >= 0; j--) {
    invert += cad.charAt(j);
  }
  verificador = claveacceso(invert);
  //sumo clave de acceso + codigo verififcador
  ca = cad + verificador;
  function claveacceso(cadena: String): int {
    var cantidadTotal: int = 0;
    var pivote: int = 2;
    var longitudCadena: int = cadena.length;
    var b: int = 1;
    for (var i: int = 0; i < longitudCadena; i++) {
      if (pivote == 8) {
        pivote = 2;
      }
      var temporal: int = int("" + cadena.substring(i, b));
      b++;
      temporal *= pivote;
      pivote++;
      cantidadTotal += temporal;
    }
    cantidadTotal = 11 - (cantidadTotal % 11);
    if (cantidadTotal == 10) {
      cantidadTotal = 1;
    } else if (cantidadTotal == 11) {
      cantidadTotal = 0;
    }
    return cantidadTotal;
  }
  return ca;
}
