const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const port = 3001;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
