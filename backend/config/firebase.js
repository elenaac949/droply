const admin =require('firebase-admin');
const dotenv =require ('dotev');

dotenv.config();

//Inicializar firebase admin sdk

const serviceAccount =require ("./serviceAccountKey.json");

//descargar desde la consola de firebase

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
})


module.exports=admin;