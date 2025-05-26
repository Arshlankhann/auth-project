const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use('/api', authRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
