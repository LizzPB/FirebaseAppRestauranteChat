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
  // body... 
  // Refrerencias hacia la base de datos
  const databaseRefComments = firebase.database().ref('comments');
  const databaseRefUsers = firebase.database().ref('users');
  //Get elements by ID
  const nameInput = document.getElementById("name");
  const commentsInput = document.getElementById("comment");
  const textSesion = document.getElementById("textoSesion");
  const btn = document.getElementById("Login");
  const form = document.querySelector("form");

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
      nameInput.setAttribute("disabled", "disabled");
      textSesion.innerText = "Cerrar sesión de Google";
      textSesion.setAttribute('href', 'javascript:cerrarSesion(this)');
    }
    else{
      nameInput.value = "Anónimo";      
      nameInput.removeAttribute("disabled");
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
    console.log(`${result.user.email} ha iniciado sesion`);
    console.log(`${result.user.displayName} ha iniciado sesion`);
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

  //form.addEventListener("submit", postComment);

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

  function postComment() {
    //obtiene los valores de los elementos con el id name y comment.
    let name = document.getElementById("name").value;
    let comment = document.getElementById("comment").value;
    //Si las variables name y comment son diferente de nulas
    if (name && comment) {
      databaseRefComments.push({
        name: name,
        comment: comment,
        time: timeStamp()
      });     
    }
    nameInput.value = '';
    commentsInput.value = '';      
  };

  databaseRefComments.on("child_added", snapshot => {
  let comment = snapshot.val();
  addComment(comment.name, comment.comment, comment.time);
  });

  const addComment = (name, comment, timeStamp) => {
  let comments = document.getElementById("comments");
  comments.innerHTML = `<hr>        
    <span id="horaComentario">${timeStamp}</span> <h5 id="nameUser">${name} </h5>
    <p id="comentarioUser"> ${comment}</p>${comments.innerHTML}
    `;
  }