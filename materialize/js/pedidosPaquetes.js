function cambiarEstilo() {
	var card = document.getElementById("cardpaquete");
	card.classList.add("light-green","lighten-3");

	var icono = document.getElementById("iconobtn");
	icono.classList.remove("fa-usd");
	icono.classList.add("fa-check-circle");

	var botoncompra = document.getElementById("botonComprar");
	botoncompra.insertAdjacentHTML('beforebegin', '<h5 class="green-text">Agregado al carrito</h5>');
	botoncompra.classList.remove("red");
	botoncompra.classList.add("green");
	
}