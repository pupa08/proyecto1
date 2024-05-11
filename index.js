const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({});
});
// Importar las rutas de usuario, libro y pedido
const rutasLibro = require("./rutas/LibroRutas");
const rutasPedido = require("./rutas/PedidosRutas");
const rutasUsuario = require("./rutas/UsuarioRutas");

// Montar las rutas en la aplicación Express
app.use('/libro', rutasLibro);
app.use('/pedido', rutasPedido);
app.use('/usuario', rutasUsuario);


// Aquí colocas la cadena de conexión a la base de datos
const PORT = process.env.PORT || 8080;

// Establecer la conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/proyecto1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conexión a la base de datos establecida.');
  // Iniciar el servidor después de que la conexión a la base de datos se haya establecido correctamente
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
})
.catch((error) => {
  console.error('Error al conectar a la base de datos:', error);
});