

// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Ac&aacute; vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano(){
	if(grilla[0][0] == 1&& grilla[0][1]==2&& 
	grilla[0][2] == 3&& grilla[1][0]==4&&
	grilla[1][1] == 5&& grilla[1][2]==6&& 
	grilla[2][0] == 7&& grilla[2][1]==8 )
		return 1;
	return 0;
}


// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
	//switcheo en la grilla
	var aux = grilla[fila1][columna1];
	grilla[fila1][columna1] = grilla[fila2][columna2];
	grilla[fila2][columna2]=aux;
	
	//switcheo en el dom

	var elementoPieza1 = document.getElementById('pieza'+grilla[fila1][columna1]);
	var elementoPieza2 = document.getElementById('pieza'+grilla[fila2][columna2]);
	console.log("elemento pieza 1="+elementoPieza1);
	console.log(elementoPieza2);
	var padre = elementoPieza1.parentNode;

	var clonElemento1 = elementoPieza1.cloneNode(true);
	var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);
	
}


// Para chequear si la posicón est&aacute; dentro de la grilla.
function posicionValida(fila, columna){
	if(fila>2 || columna >2 || fila<0 ||columna<0)
		return false;
	return true;

}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){
	console.log("mover en direccion"+direccion);

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;

  }
  else if (direccion == 39) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
	  nuevaColumnaPiezaVacia = posicionVacia.columna-1;
	// Completar

  }
  else if (direccion == 37) {
	  nuevaFilaPiezaVacia = posicionVacia.fila;
	  nuevaColumnaPiezaVacia = posicionVacia.columna+1;
	  console.log("Nueva pieza Vacia="+nuevaFilaPiezaVacia);
	  console.log("nueva columna pieza vacia="+nuevaColumnaPiezaVacia);
    // Completar
  }

  // Se chequea si la nueva posición es v&aacute;lida, si lo es, se intercambia
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }

}
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
  posicionVacia.fila = nuevaFila;
  posicionVacia.columna = nuevaColumna;
}



// Extras, lo que est&aacute; ac&aacute; abajo no debería tocarse

function mezclarPiezas(veces){
	console.log("veces= "+veces);
  if(veces<=0){return;}
  var direcciones = [40, 38,39,37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    moverEnDireccion(evento.which);

    var gano = chequearSiGano();
    if(gano) alert('ganaste!');
    evento.preventDefault();
  })
}

function iniciar(){
  mezclarPiezas(60);
  capturarTeclas();
}

iniciar();
