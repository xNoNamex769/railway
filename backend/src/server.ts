import express from 'express';
import colors from 'colors';
import cors from 'cors'; 
import morgan from 'morgan';
import { db } from './config/db';
import ActividadRouter from './routes/ActividadRouter'
import AlquilerElementosRouter from './routes/AlquilerElementosRouter';
import AsistenciaRouter from './routes/AsistenciaRouter';
import ConstanciaRouter from './routes/ConstanciaRouter';
import ConsultaIARouter  from './routes/ConsultaIARouter';
import EventoRouter  from './routes/EventoRouter';
import GestionEventoRouter  from './routes/GestionEventoRouter';
import  RelUsuarioFeedbackRouter  from './routes/RelUsuarioFeedbackRouter';
import  RolUsuarioRouter  from './routes/RolUsuarioRouter';
import  UsuarioRouter  from './routes/UsuarioRouter';
import  FeedbackRouter  from './routes/FeedbackRouter';
import  NotificacionesRouter  from './routes/NotificacionesRouter';
import  PlanificacionEventoRouter  from './routes/PlanificacionEventoRouter';
import  RelUsuarioEventoRouter from './routes/RelUsuarioEventoRouter';
import SolicitudApoyoRouter from './routes/SolicitudApoyoRouter';
import AnalisisIARouter from './routes/AnalisisIARouter';
import analizarComentarioIARouter from './routes/AnalizarComentarioIARouter';


async function connectDB() {
    try {
        await db.authenticate(); 
        console.log(colors.blue.bold('Conexión exitosa a la Base de datos echo por Alex'));

      
        try {
            const [results, metadata] = await db.query('SELECT * FROM asistencia');
            console.log('Datos de ejemplo:', results);
        } catch (error) {
            console.error('Error al ejecutar la consulta:', error);
        }
    } catch (error) {
        console.error('Error al conectar a la BD:', error);
        console.log(colors.red.bold('Falló la conexión a la BD'));
    }
}

connectDB();

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use('/api/actividad', ActividadRouter);
app.use('/api/alquilerelementos', AlquilerElementosRouter);
app.use('/api/asistencia', AsistenciaRouter);
app.use('/api/constancia', ConstanciaRouter);
app.use('/api/consultaia', ConsultaIARouter);
app.use('/api/evento', EventoRouter);
app.use('/api/gestionevento', GestionEventoRouter);
app.use('/api/relusuariofeedback', RelUsuarioFeedbackRouter);
app.use('/api/rolusuario', RolUsuarioRouter)
app.use("/api/usuario", UsuarioRouter)
app.use("/api/feedback", FeedbackRouter)
app.use("/api/notificaciones", NotificacionesRouter)
app.use("/api/planificacionevento", PlanificacionEventoRouter)
app.use("/api/relusuarioevento", RelUsuarioEventoRouter)
app.use("/api/solicitudapoyo", SolicitudApoyoRouter);
app.use("/api/analisisia", AnalisisIARouter);
app.use("/api/comentario", analizarComentarioIARouter);
export default app;
