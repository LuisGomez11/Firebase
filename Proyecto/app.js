firebase.initializeApp({
    apiKey: "AIzaSyCAuUnhyDNxH54PPSMddPo_fh0YPXX26Yk",
    authDomain: "proyectousuarios-41d11.firebaseapp.com",
    projectId: "proyectousuarios-41d11"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

function guardar() {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var año = document.getElementById('fecha').value;
    db.collection("users").add({
        first: nombre,
        last: apellido,
        born: año
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('fecha').value = '';
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

////LEER DATSOS////////
var tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML += `
            <th scope="row">${doc.id}</th>
            <td>${doc.data().first}</td>
            <td>${doc.data().last}</td>
            <td>${doc.data().born}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>
        `;
    });
});

/////BORRAR DATOS///////
function eliminar(ID) {
    db.collection("users").doc(ID).delete().then(function () {
        console.log("Eliminado correctamente!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });

}

////////EDITAR DATOS//////////


function editar(ID, nombre, apellido, año) {

    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('fecha').value = año;

    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function () {
        var washingtonRef = db.collection("users").doc(ID);
        // Set the "capital" field of the city 'DC'

        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellido').value;
        var año = document.getElementById('fecha').value;

        return washingtonRef.update({
            first: nombre,
            last: apellido,
            born: año
        })
            .then(function () {
                console.log("Editado correctamente!");
                boton.innerHTML = 'Guardar';
                document.getElementById('nombre').value = '';
                document.getElementById('apellido').value = '';
                document.getElementById('fecha').value = '';
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }

}
