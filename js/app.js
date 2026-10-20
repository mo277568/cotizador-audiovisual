// Cotizador de Producción Audiovisual
// Calcula un presupuesto estimado según tipo, duración, revisiones y extras.

const MONEDA = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0
});

const COSTO_POR_MINUTO_ADICIONAL = 900;
const COSTO_REVISION_EXTRA = 400;
const REVISIONES_INCLUIDAS = 2;

const selectTipo = document.getElementById("tipo");
const rangoDuracion = document.getElementById("duracion");
const duracionValor = document.getElementById("duracionValor");
const inputRevisiones = document.getElementById("revisiones");
const checksExtras = document.querySelectorAll("[data-extra]");
const totalEl = document.getElementById("total");
const desgloseEl = document.getElementById("desglose");

function agregarLinea(texto, monto) {
  const li = document.createElement("li");
  const izquierda = document.createElement("span");
  const derecha = document.createElement("span");
  izquierda.textContent = texto;
  derecha.textContent = MONEDA.format(monto);
  li.appendChild(izquierda);
  li.appendChild(derecha);
  desgloseEl.appendChild(li);
}

function calcular() {
  const base = Number(selectTipo.value);
  const minutos = Number(rangoDuracion.value);
  const revisiones = Math.min(5, Math.max(1, Number(inputRevisiones.value) || 1));

  const costoMinutos = (minutos - 1) * COSTO_POR_MINUTO_ADICIONAL;
  const revisionesExtra = Math.max(0, revisiones - REVISIONES_INCLUIDAS);
  const costoRevisiones = revisionesExtra * COSTO_REVISION_EXTRA;

  let costoExtras = 0;
  checksExtras.forEach(function (check) {
    if (check.checked) {
      costoExtras += Number(check.dataset.extra);
    }
  });

  const total = base + costoMinutos + costoRevisiones + costoExtras;

  duracionValor.textContent = minutos;
  totalEl.textContent = MONEDA.format(total) + " MXN";

  desgloseEl.innerHTML = "";
  agregarLinea("Producción base (" + selectTipo.options[selectTipo.selectedIndex].text + ")", base);
  if (costoMinutos > 0) {
    agregarLinea("Minutos adicionales (" + (minutos - 1) + ")", costoMinutos);
  }
  if (costoRevisiones > 0) {
    agregarLinea("Revisiones extra (" + revisionesExtra + ")", costoRevisiones);
  }
  if (costoExtras > 0) {
    agregarLinea("Extras seleccionados", costoExtras);
  }
}

selectTipo.addEventListener("change", calcular);
rangoDuracion.addEventListener("input", calcular);
inputRevisiones.addEventListener("input", calcular);
checksExtras.forEach(function (check) {
  check.addEventListener("change", calcular);
});

calcular();
