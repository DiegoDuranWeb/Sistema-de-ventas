import express from 'express';
//permite ver las peticiones en la terminal
import morgan from 'morgan';
//permite hacer peticiones desde otras pc
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import router from './routes';


//Conexion a la base de datos
mongoose.Promise= global.Promise;
const dbUrl='mongodb://localhost:27017/dbsistema'
mongoose.connect(dbUrl, {useCreateIndex:true, useNewUrlParser: true})
.then(mongoose=> console.log('Conectando a la BD en el puerto 27017'))
.catch(err => console.log(err));



const app = express();

app.use(morgan('dev'));

app.use(cors());

//Permitir peticiones json 
app.use(express.json());

app.use(express.urlencoded({extended:true}));

//le indico la carpeta publica
app.use(express.static(path.join(__dirname ,'public')));

app.use('/api', router);

app.set('port',process.env.PORT || 3000);


app.listen(app.get('port'),()=>{
    console.log('server on ' + app.get('port'));
});
