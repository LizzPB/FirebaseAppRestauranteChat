   // Initialize Firebase
  const config = {
    apiKey: "AIzaSyB7dw49nHdAJcYFWVI-vFLrt_kf2_xBl0w",
    authDomain: "restaurante-522b9.firebaseapp.com",
    databaseURL: "https://restaurante-522b9.firebaseio.com",
    projectId: "restaurante-522b9",
    storageBucket: "restaurante-522b9.appspot.com",
    messagingSenderId: "136888241015"
  };
  firebase.initializeApp(config);

  // Refrerencias hacia la base de datos
  const databaseRefUsers = firebase.database().ref('users');
  const databaseChat = firebase.database().ref('chat');
  const databaseChats = firebase.database().ref('chats');

  /*Agregando los elementos del DOM para chat*/
  const mensaje = document.getElementById('mensaje');
  const enviar = document.getElementById('enviar');
  const contenedor = document.getElementById('contenedorMensajes');
  const textSesion = document.getElementById("textoSesion");  
  const nameInput = document.getElementById("name");
  
  var user = firebase.auth().currentUser;

  firebase.auth().onAuthStateChanged(user => {
    let nameUser;
    if(user){
      if(user.displayName!= null){
        nameUser = user.displayName;
      }
      else{
        nameUser = user.email;
      }
      nameInput.value = nameUser;      
      textSesion.innerText = "Cerrar sesión de Google";
      textSesion.setAttribute('href', 'javascript:cerrarSesion(this)');
    }
    else{
      nameInput.value = "Anónimo";      
      textSesion.innerText = "Iniciar sesión con Google";
      textSesion.setAttribute('href', 'javascript:iniciarSesion(this)');
    }
  });

  function iniciarSesion() {
    const provider = new firebase.auth.GoogleAuthProvider(); 
    firebase.auth().signInWithPopup(provider).then((result) =>{
    var token = result.credential.accessToken;
    var user = result.user;
    let userName = result.user.displayName;
    let email = result.user.email;
    var photo = result.user.photoURL;
    // The Google credential, this contain the Google access token:
    let credential = result.credential;
    /*Guardar Usuario*/
    firebase.database().ref('users/' + userName).update({
      username: userName,
      email: email,
      foto: photo
      });       
    }).catch(error => console.error(`Error : ${error.code}: ${error.message}`));
  } 

  function cerrarSesion() {
    firebase.auth().signOut()
      .then(() =>{
        console.log('te has deslogeado')
        nameInput.value = '';
        commentsInput.value = '';
        location.reload();
      }).catch(error => console.error(`Error : ${error.code}: ${error.message}`));      
  }

  //Anonimus function timeStamp, par aagregar fecha y hora al comentario
  const timeStamp = () => {
  let options = {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute:'2-digit'
  };
  let now = new Date().toLocaleString('es-MX', options);
  return now;
}

/*Evento para enviar y guardar mensajes */
function guardarMensaje() {
  /*Recupera el mensaje ingresado */
   var mensajeEnviado = mensaje.value;
   var usuario = nameInput.value;
   /*Envia los datos a la BD*/
   databaseChat.push({
     name : usuario,
     message: mensajeEnviado,
     time: timeStamp()
   });   

   mensaje.value="";
}

 /*Mostrar los mensajes enviador en el contenedor */
 databaseChat.on('value', function(snapshot){
   var html ='';
   snapshot.forEach(function(e) {
     var elemento = e.val();
     var usuario = elemento.name;
     var mensajeEnviado = elemento.message;
     var fecha = elemento.time;
     html += `<hr>
     <h5 id="nombreUsuario">${usuario} </h5>
     <p id="mensajes"> ${mensajeEnviado}</p>
     <span id="fecha">${fecha}</span>`;
   });
   contenedor.innerHTML = html;
   /*Posicionar el scroll*/ 
   contenedor.scrollTop =contenedor.scrollHeight;
 });