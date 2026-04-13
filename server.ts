import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import { GoogleGenAI } from '@google/genai';

// Use persistent database path for Railway
const dbPath = process.env.DATABASE_PATH || 'showroom.db';
const db = new Database(dbPath);

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    year INTEGER NOT NULL,
    price INTEGER NOT NULL,
    cash_price INTEGER,
    km INTEGER NOT NULL,
    transmission TEXT NOT NULL,
    fuel TEXT NOT NULL,
    images TEXT NOT NULL, -- JSON string of image URLs
    stock INTEGER DEFAULT 1,
    min_dp_percent INTEGER DEFAULT 20,
    max_dp_percent INTEGER DEFAULT 90,
    interest_rate REAL DEFAULT 0.05
  );
`);

// Migration: Add missing columns if table already existed
const tableInfo = db.prepare("PRAGMA table_info(cars)").all();
const columns = tableInfo.map((c: any) => c.name);

if (!columns.includes('cash_price')) {
  db.prepare('ALTER TABLE cars ADD COLUMN cash_price INTEGER').run();
}
if (!columns.includes('fuel')) {
  db.prepare("ALTER TABLE cars ADD COLUMN fuel TEXT DEFAULT 'Bensin'").run();
}
if (!columns.includes('stock')) {
  db.prepare('ALTER TABLE cars ADD COLUMN stock INTEGER DEFAULT 1').run();
}
if (!columns.includes('min_dp_percent')) {
  db.prepare('ALTER TABLE cars ADD COLUMN min_dp_percent INTEGER DEFAULT 20').run();
}
if (!columns.includes('max_dp_percent')) {
  db.prepare('ALTER TABLE cars ADD COLUMN max_dp_percent INTEGER DEFAULT 90').run();
}
if (!columns.includes('interest_rate')) {
  db.prepare('ALTER TABLE cars ADD COLUMN interest_rate REAL DEFAULT 0.05').run();
}
if (!columns.includes('description')) {
  db.prepare('ALTER TABLE cars ADD COLUMN description TEXT').run();
}

db.exec(`
  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    buyer_name TEXT NOT NULL,
    car_name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    comment TEXT,
    year INTEGER DEFAULT 2024
  );
`);

// Migration: Add year column to testimonials if it doesn't exist
const testimonialTableInfo = db.prepare("PRAGMA table_info(testimonials)").all();
const testimonialColumns = testimonialTableInfo.map((c: any) => c.name);
if (!testimonialColumns.includes('year')) {
  db.prepare('ALTER TABLE testimonials ADD COLUMN year INTEGER DEFAULT 2024').run();
}

db.exec(`
  CREATE TABLE IF NOT EXISTS admin (
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS faq (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    month TEXT NOT NULL,
    amount INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS branding (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    logo_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
  );
`);


// Seed Admin if not exists (admin / admin123)
const seedAdmin = db.prepare('INSERT OR IGNORE INTO admin (username, password) VALUES (?, ?)');
seedAdmin.run('admin', 'admin123');

// Seed default branding if empty
const brandingCount = db.prepare('SELECT COUNT(*) as count FROM branding').get() as { count: number };
if (brandingCount.count === 0) {
  const insertBranding = db.prepare('INSERT INTO branding (type, name, logo_url, display_order) VALUES (?, ?, ?, ?)');
  
  // Header logo
  insertBranding.run('header', 'Gudang Mokas', 'https://i.postimg.cc/Kz8Zy8Qy/logo.png', 0);
  
  // Brand logos
  insertBranding.run('brand', 'Toyota', 'https://www.carlogos.org/car-logos/toyota-logo-2020-640.png', 1);
  insertBranding.run('brand', 'Honda', 'https://www.carlogos.org/car-logos/honda-logo-1700x1150.png', 2);
  insertBranding.run('brand', 'Suzuki', 'https://www.carlogos.org/car-logos/suzuki-logo-2000x2000.png', 3);
  insertBranding.run('brand', 'BMW', 'https://www.carlogos.org/car-logos/bmw-logo-2020-gray.png', 4);
  insertBranding.run('brand', 'Mercedes', 'https://www.carlogos.org/car-logos/mercedes-benz-logo-2011-640.png', 5);
  
  // Financing partners
  insertBranding.run('financing', 'BCA Finance', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1200px-Bank_Central_Asia.svg.png', 1);
  insertBranding.run('financing', 'BFI Finance', 'https://www.bfi.co.id/assets/img/logo-bfi.png', 2);
  insertBranding.run('financing', 'Adira Finance', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Adira_Finance_logo.svg/1200px-Adira_Finance_logo.svg.png', 3);
  insertBranding.run('financing', 'Mandiri Utama Finance', 'https://muf.co.id/wp-content/uploads/2021/04/logo-muf-new.png', 4);
}

// Seed some initial cars if empty
const carCount = db.prepare('SELECT COUNT(*) as count FROM cars').get() as { count: number };
if (carCount.count === 0) {
  const insertCar = db.prepare(`
    INSERT INTO cars (name, brand, year, price, km, transmission, fuel, images, stock)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertCar.run(
    'BMW M4 Competition', 'BMW', 2022, 2150000000, 5000, 'AT', 'Petrol',
    JSON.stringify(['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800']),
    1
  );
  insertCar.run(
    'Mercedes-Benz G63 AMG', 'Mercedes', 2021, 5800000000, 12000, 'AT', 'Petrol',
    JSON.stringify(['https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800']),
    1
  );
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  
  // Serve static files from public directory (for images and other assets)
  app.use(express.static(path.join(process.cwd(), 'public')));
  app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

  // API Routes
  app.post('/api/upload', (req, res) => {
    const { image, fileName } = req.body;
    if (!image || !fileName) return res.status(400).json({ error: 'Missing data' });

    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
    const uniqueFileName = `${Date.now()}-${fileName}`;
    const filePath = path.join(uploadsDir, uniqueFileName);

    fs.writeFile(filePath, buffer, (err) => {
      if (err) return res.status(500).json({ error: 'Failed to save image' });
      res.json({ url: `/uploads/${uniqueFileName}` });
    });
  });

  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare('SELECT * FROM admin WHERE username = ? AND password = ?').get(username, password);
    if (user) {
      res.json({ success: true, token: 'mock-jwt-token' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });

  app.post('/api/admin/settings', (req, res) => {
    const { oldUsername, newUsername, newPassword } = req.body;
    const admin = db.prepare('SELECT * FROM admin WHERE username = ?').get(oldUsername);
    if (admin) {
      db.prepare('UPDATE admin SET username = ?, password = ? WHERE username = ?').run(newUsername, newPassword, oldUsername);
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Admin not found' });
    }
  });

  app.get('/api/cars', (req, res) => {
    const cars = db.prepare('SELECT * FROM cars').all();
    res.json(cars.map((c: any) => ({ ...c, images: JSON.parse(c.images) })));
  });

  app.post('/api/cars', (req, res) => {
    const { name, brand, year, price, cash_price, km, transmission, fuel, images, stock, min_dp_percent, max_dp_percent, interest_rate, description } = req.body;
    const result = db.prepare(`
      INSERT INTO cars (name, brand, year, price, cash_price, km, transmission, fuel, images, stock, min_dp_percent, max_dp_percent, interest_rate, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(name, brand, year, price, cash_price, km, transmission, fuel, JSON.stringify(images), stock, min_dp_percent, max_dp_percent, interest_rate, description);
    res.json({ success: true, id: result.lastInsertRowid });
  });

  app.put('/api/cars/:id', (req, res) => {
    const { id } = req.params;
    const { name, brand, year, price, cash_price, km, transmission, fuel, images, stock, min_dp_percent, max_dp_percent, interest_rate, description } = req.body;
    db.prepare(`
      UPDATE cars SET name=?, brand=?, year=?, price=?, cash_price=?, km=?, transmission=?, fuel=?, images=?, stock=?, min_dp_percent=?, max_dp_percent=?, interest_rate=?, description=?
      WHERE id=?
    `).run(name, brand, year, price, cash_price, km, transmission, fuel, JSON.stringify(images), stock, min_dp_percent, max_dp_percent, interest_rate, description, id);
    res.json({ success: true });
  });

  app.delete('/api/cars/:id', (req, res) => {
    db.prepare('DELETE FROM cars WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  });

  app.get('/api/testimonials', (req, res) => {
    const testimonials = db.prepare('SELECT * FROM testimonials ORDER BY year DESC, id DESC').all();
    res.json(testimonials);
  });

  app.post('/api/testimonials', (req, res) => {
    const { id, buyer_name, car_name, image_url, comment, year } = req.body;
    if (id) {
      // Update existing testimonial
      db.prepare('UPDATE testimonials SET buyer_name=?, car_name=?, image_url=?, comment=?, year=? WHERE id=?')
        .run(buyer_name, car_name, image_url, comment, year || new Date().getFullYear(), id);
    } else {
      // Insert new testimonial
      db.prepare('INSERT INTO testimonials (buyer_name, car_name, image_url, comment, year) VALUES (?, ?, ?, ?, ?)')
        .run(buyer_name, car_name, image_url, comment, year || new Date().getFullYear());
    }
    res.json({ success: true });
  });

  app.delete('/api/testimonials/:id', (req, res) => {
    db.prepare('DELETE FROM testimonials WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  });

  app.get('/api/faq', (req, res) => {
    const faq = db.prepare('SELECT * FROM faq').all();
    res.json(faq);
  });

  app.post('/api/faq', (req, res) => {
    const { question, answer } = req.body;
    db.prepare('INSERT INTO faq (question, answer) VALUES (?, ?)').run(question, answer);
    res.json({ success: true });
  });

  app.delete('/api/faq/:id', (req, res) => {
    db.prepare('DELETE FROM faq WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  });

  app.get('/api/sales', (req, res) => {
    const sales = db.prepare('SELECT * FROM sales').all();
    if (sales.length === 0) {
      // Mock data if empty
      return res.json([
        { month: 'Jan', amount: 4000000000 },
        { month: 'Feb', amount: 3000000000 },
        { month: 'Mar', amount: 5000000000 },
        { month: 'Apr', amount: 4500000000 },
        { month: 'May', amount: 6000000000 },
        { month: 'Jun', amount: 5500000000 },
      ]);
    }
    res.json(sales);
  });

  // Branding API
  app.get('/api/branding', (req, res) => {
    const branding = db.prepare('SELECT * FROM branding ORDER BY display_order').all();
    res.json(branding);
  });

  app.post('/api/branding', (req, res) => {
    const { type, name, logo_url, display_order } = req.body;
    const result = db.prepare('INSERT INTO branding (type, name, logo_url, display_order) VALUES (?, ?, ?, ?)').run(type, name, logo_url, display_order || 0);
    res.json({ success: true, id: result.lastInsertRowid });
  });

  app.put('/api/branding/:id', (req, res) => {
    const { id } = req.params;
    const { type, name, logo_url, display_order } = req.body;
    db.prepare('UPDATE branding SET type=?, name=?, logo_url=?, display_order=? WHERE id=?').run(type, name, logo_url, display_order, id);
    res.json({ success: true });
  });

  app.delete('/api/branding/:id', (req, res) => {
    db.prepare('DELETE FROM branding WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  });

  // SEO: Sitemap.xml endpoint
  app.get('/sitemap.xml', (req, res) => {
    const cars = db.prepare('SELECT id, name, brand, year FROM cars').all();
    const baseUrl = 'https://gudangmokas.com';
    const currentDate = new Date().toISOString().split('T')[0];
    
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Homepage
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}/</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += '    <changefreq>daily</changefreq>\n';
    sitemap += '    <priority>1.0</priority>\n';
    sitemap += '  </url>\n';
    
    // Inventory section
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}/#inventory</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += '    <changefreq>daily</changefreq>\n';
    sitemap += '    <priority>0.9</priority>\n';
    sitemap += '  </url>\n';
    
    // Ecosystem section
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}/#ecosystem</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += '    <changefreq>weekly</changefreq>\n';
    sitemap += '    <priority>0.8</priority>\n';
    sitemap += '  </url>\n';
    
    // Testimonials section
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}/#testimonials</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += '    <changefreq>weekly</changefreq>\n';
    sitemap += '    <priority>0.7</priority>\n';
    sitemap += '  </url>\n';
    
    // FAQ section
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}/#faq</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += '    <changefreq>weekly</changefreq>\n';
    sitemap += '    <priority>0.7</priority>\n';
    sitemap += '  </url>\n';
    
    // Location section
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}/#location</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += '    <changefreq>monthly</changefreq>\n';
    sitemap += '    <priority>0.6</priority>\n';
    sitemap += '  </url>\n';
    
    // Individual car pages (if you implement them in the future)
    (cars as any[]).forEach((car: any) => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}/car/${car.id}</loc>\n`;
      sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
      sitemap += '    <changefreq>weekly</changefreq>\n';
      sitemap += '    <priority>0.8</priority>\n';
      sitemap += '  </url>\n';
    });
    
    sitemap += '</urlset>';
    
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = parseInt(process.env.PORT || '3000', 10);
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
