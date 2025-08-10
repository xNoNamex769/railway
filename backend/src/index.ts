import app from './server';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import colors from 'colors'; 
import { db } from './config/db';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 3001;

// 1️⃣ Crear servidor HTTP
const httpServer = http.createServer(app);

// 2️⃣ Crear instancia de Socket.IO con CORS abierto (para desarrollo)
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*",
  },
});

// 3️⃣ Guardar la instancia de io dentro de la app para usarla en otros lados
app.set("io", io);

async function startServer() {
    try {
        // Conectar a la base de datos
        await db.authenticate();
        console.log(colors.blue.bold('Conexión exitosa a la Base de datos'));

        // Sincronizar modelos y tablas
        await db.sync();
        console.log(colors.blue.bold('Base de datos y modelos sincronizados.'));

        // Crear carpeta uploads si no existe
        const uploadPath = path.join(__dirname, "../uploads");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
            console.log(colors.yellow("📁 Carpeta 'uploads' creada."));
        }

        // Iniciar servidor HTTP escuchando en el puerto definido
        httpServer.listen(PORT, () => {
            console.log(colors.green.bold(`✅ Servidor escuchando en el puerto ${PORT}`));
        });
    } catch (error) {
        console.error(colors.red.bold('❌ Error al conectar a la base de datos:'), error);
    }
}

startServer();




// import server from './server';
// import colors from 'colors'; 
// import { db } from './config/db';

// const port = process.env.PORT || 3000;

// async function startServer() {
//     try {
//         await db.authenticate(); 
//         console.log(colors.blue.bold('Conexión exitosa a la Base de datos'));

//         // Sincroniza la base de datos
//         await db.sync()
//         console.log(colors.blue.bold('Base de datos y modelos sincronizados.'));

//         // Inicia el servidor en el puerto especificado
//         server.listen(port, () => {
//             console.log(`✅ El servidor se está escuchando en el puerto http://localhost:${port}`);
//         });

//     } catch (error) {
//         console.error('Error al conectar a la base de datos:', error);
//     }
// }

// startServer();



// base de datos y modelo:
// await db.sync({ alter: true });
// Le estás diciendo a Sequelize que revise todas las tablas y las modifique automáticamente para que coincidan con tus modelos. Esto es útil para desarrollo, pero:

// Es pesado y puede tardar mucho si hay muchos modelos o datos.

//  Lo hace cada vez que reinicias con Nodemon.

// Y sí, fácilmente puede tardar 30 segundos o más en sincronizar.