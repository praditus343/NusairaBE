import cors from "cors";
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import tambakRoutes from './routes/TambakRoutes.js';
import siklusRouter from './routes/MulaiSiklus.js';
import kematianRoutes from './routes/Kematian.js';
import dataPakanRoutes from './routes/Pakan.js';
import dataPanenRoutes from './routes/Panen.js'
import penyakitRoutes from './routes/Penyakit.js';
import ancoRoutes from './routes/Anco.js';
import penyakitLeleRoutes from './routes/PenyakitLele.js';
import beritaRoutes from './routes/Berita.js';
import notifikasiRoutes from './routes/Notifikasi.js';
import pengeluaranRoutes from './routes/Pengeluaran.js';
import pemasukanRoutes from './routes/Pemasukan.js';
import kualitasAirRoutes from './routes/Air.js';
import tagihanRoutes from './routes/Tagihan.js';
import penggunaRoutes from './routes/Pengguna.js';
import predictionRoutes from './routes/Prediction.js';
// import { predictionService } from './models/PredictionService.js';
import contactRoutes from './routes/Contact.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3020;


app.use(express.json());  
app.use(express.urlencoded({ extended: false })); 


const corsOptions = {
  // Allow all origins - use cautiously in production
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    // and any origin you want to explicitly allow
    const allowedOrigins = [
      'https://nusaira.vercel.app', 
      'http://localhost:5173', 
      'https://nusaira-be.vercel.app',
      'https://www.nusaira.vercel.app'
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'Origin', 
    'X-Requested-With', 
    'Accept', 
    'x-requested-with',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Methods'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS middleware before any routes
app.use(cors(corsOptions));

// Global middleware to ensure CORS headers
app.use((req, res, next) => {
  const origin = req.headers.origin || req.get('origin');
  const allowedOrigins = [
    'https://nusaira.vercel.app', 
    'http://localhost:5173', 
    'https://nusaira-be.vercel.app',
    'https://www.nusaira.vercel.app'
  ];

  // Set CORS headers for allowed origins
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    // Fallback to wildcard (use cautiously)
    res.header('Access-Control-Allow-Origin', '*');
  }

  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods');
  res.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Preflight handler for all routes
app.options('*', cors(corsOptions));

app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use('/api/tambak', tambakRoutes); 
app.use('/api', siklusRouter);
app.use('/api', kematianRoutes);
app.use('/api', penyakitRoutes);
app.use('/api', dataPakanRoutes);
app.use('/api', dataPanenRoutes); 
app.use('/api', ancoRoutes);
app.use('/api', penyakitLeleRoutes);
app.use('/api', beritaRoutes);
app.use('/api', notifikasiRoutes);
app.use('/api', pengeluaranRoutes);
app.use('/api', pemasukanRoutes);
app.use('/api', kualitasAirRoutes);
app.use('/api', tagihanRoutes);
app.use('/api', penggunaRoutes);
app.use('/api', predictionRoutes); 
app.use('/uploads', express.static('uploads'));
app.use('/api/contact', contactRoutes);


//ini akan dipakai untuk prediksi
// predictionService.startScheduler();



app.listen(port, async () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});