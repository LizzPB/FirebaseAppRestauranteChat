//Array que contiende todos los checkbox del documento HTML
var checkboxes = document.getElementsByName("checkbox");
console.log(checkboxes);
//Obtención del elemento  HTML con id#
//Cajas de contenido donde se alamcenaran los pedidos de las entradasm, plato fuerte, postres y bebidas.
var cajaEntradas = document.getElementById("pedidoEntrada");
var cajaPlatoFuerte = document.getElementById("pedidoPlatoFuerte");
var cajaPostres = document.getElementById("pedidoPostre");
var cajaBebidas = document.getElementById("pedidoBebida");
var cajaTotal = document.getElementById("total");
//Función que se ejecuta al clickear el botón de agregar pedido.
function agregarPedidos() {
	//Arrays para almacenar el pedido por categorías.
	var entradas = []; 
	var platofuerte = [];
	var postres = [];
	var bebidas = [];
	//Arrays para almacenar los precios del pedido por categoría: entrada, plato fuerte, postre, bebidas.
	var preciosEntradas = [];
	var preciosPlatoFuerte = [];
	var preciosPostres = [];
	var preciosBebidas = [];
	//Contadores de cada uno de los arrays
	var contE = 0; 
	var contPF = 0; 
	var contP = 0; 
	var contB = 0;
	//Variable de suma para almacenar el total a pagar por parte del cliente.
	var suma = 0;
	//Reiniciar el contenido de las cajas donde se almacena la orden.
	cajaEntradas.innerHTML="";
	cajaPlatoFuerte.innerHTML="";
	cajaPostres.innerHTML="";
	cajaBebidas.innerHTML="";
	cajaTotal.innerHTML="";
	//Ciclo para o recorrer el arreglo de los checkbox
	for (var x=0; x < checkboxes.length; x++) {	
		/*Evaluar el checkbox del arreglo checkboxes en la posición x esta clickeado, 
		es decir su atributo checked es igual a true.*/
		if (checkboxes[x].checked) {
			//Según la clase del checkbox, este será almacenado en un array de acuerdo a su categoría.
			switch (checkboxes[x].className) { 
				case 'entrada':					
					entradas[contE] = checkboxes[x].id; 
					preciosEntradas[contE]= parseInt(checkboxes[x].value);
					contE=contE+1;
					break;
				case 'platofuerte':
					platofuerte[contPF] = checkboxes[x].id;
					preciosPlatoFuerte[contPF] = parseInt(checkboxes[x].value);	
					contPF=contPF+1;	
					break;
				case 'postre':
					postres[contP] = checkboxes[x].id;
					preciosPostres[contP] = parseInt(checkboxes[x].value);
					contP=contP+1;		
					break;
				case 'bebida':
					bebidas[contB] = checkboxes[x].id;
					preciosBebidas[contB] = parseInt(checkboxes[x].value);	
					contB=contB+1;
					break;
				default:
					break;
			}
		}
	}
	//Ciclos para recorrer los arreglos: entradas[], platofuerte[], postres[] y bebidas[].
	/*En el recorrido del array en cada iteración se crean elementos de parrafó (p) 
	para poder colocar texto a cada uno de ellos, este texto sera el platillo y precio que el cliente pidió 
	en cada categoría*/

	for (var i=0; i<entradas.length; i++) {		
		var p = document.createElement("p");
		p.innerHTML = ""+entradas[i]+": $"+preciosEntradas[i]+".00";
		cajaEntradas.appendChild(p);
	}
	for (var i=0; i<platofuerte.length; i++) {		
		var p = document.createElement("p");
		p.innerHTML = ""+platofuerte[i]+": $"+preciosPlatoFuerte[i]+".00";
		cajaPlatoFuerte.appendChild(p);
	}
	for (var i=0; i<postres.length; i++) {		
		var p = document.createElement("p");
		p.innerHTML = ""+postres[i]+": $"+preciosPostres[i]+".00";
		cajaPostres.appendChild(p);
	}
	for (var i=0; i<bebidas.length; i++) {		
		var p = document.createElement("p");
		p.innerHTML = ""+bebidas[i]+": $"+preciosBebidas[i]+".00";
		cajaBebidas.appendChild(p);
	}
	/*Ciclos para recorrer los arreglos de precios de cada categoría 
	para realizar la suma total a pagar por el cliente.*/
	for (var i=0; i<preciosEntradas.length; i++) {
		suma=suma+preciosEntradas[i];
	}
	for (var i=0; i<preciosPlatoFuerte.length; i++) {
		suma=suma+preciosPlatoFuerte[i];
	}
	for (var i=0; i<preciosPostres.length; i++) {
		suma=suma+preciosPostres[i];
	}
	for (var i=0; i<preciosBebidas.length; i++) {
		suma=suma+preciosBebidas[i];
	}
	//Total a pagar, agregado a un elemento h5, mismo que se agregará a la cajaTotal.
	var h5 = document.createElement("h5");
	h5.innerHTML = "$"+suma+".00";
	cajaTotal.appendChild(h5);

}
