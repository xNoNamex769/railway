


import server from './server';
import colors from 'colors'; 
import { db } from './config/db';

const PORT = 3001;

async function startServer() {
    try {
        // Intenta conectar a la base de datos
        await db.authenticate(); 
        console.log(colors.blue.bold('Conexión exitosa a la Base de datos'));

        // Sincroniza la base de datos
        await db.sync();
        console.log(colors.blue.bold('Base de datos y modelos sincronizados.'));

        // Inicia el servidor en el puerto fijo 3001
        server.listen(PORT, '0.0.0.0', () => {
            console.log(colors.green.bold(`✅ Servidor escuchando en http://localhost:${PORT}`));
        });

    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error);
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