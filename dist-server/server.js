"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var vite_1 = require("vite");
var better_sqlite3_1 = __importDefault(require("better-sqlite3"));
// Use persistent database path for Railway
var dbPath = process.env.DATABASE_PATH || 'showroom.db';
var db = new better_sqlite3_1.default(dbPath);
// Ensure uploads directory exists
var uploadsDir = path_1.default.join(process.cwd(), 'public', 'uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
// Initialize Database
db.exec("\n  CREATE TABLE IF NOT EXISTS cars (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    name TEXT NOT NULL,\n    brand TEXT NOT NULL,\n    year INTEGER NOT NULL,\n    price INTEGER NOT NULL,\n    cash_price INTEGER,\n    km INTEGER NOT NULL,\n    transmission TEXT NOT NULL,\n    fuel TEXT NOT NULL,\n    images TEXT NOT NULL, -- JSON string of image URLs\n    stock INTEGER DEFAULT 1,\n    min_dp_percent INTEGER DEFAULT 20,\n    max_dp_percent INTEGER DEFAULT 90,\n    interest_rate REAL DEFAULT 0.05\n  );\n");
// Migration: Add missing columns if table already existed
var tableInfo = db.prepare("PRAGMA table_info(cars)").all();
var columns = tableInfo.map(function (c) { return c.name; });
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
db.exec("\n  CREATE TABLE IF NOT EXISTS testimonials (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    buyer_name TEXT NOT NULL,\n    car_name TEXT NOT NULL,\n    image_url TEXT NOT NULL,\n    comment TEXT\n  );\n");
db.exec("\n  CREATE TABLE IF NOT EXISTS admin (\n    username TEXT PRIMARY KEY,\n    password TEXT NOT NULL\n  );\n\n  CREATE TABLE IF NOT EXISTS faq (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    question TEXT NOT NULL,\n    answer TEXT NOT NULL\n  );\n\n  CREATE TABLE IF NOT EXISTS sales (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    month TEXT NOT NULL,\n    amount INTEGER NOT NULL\n  );\n\n  CREATE TABLE IF NOT EXISTS branding (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    type TEXT NOT NULL,\n    name TEXT NOT NULL,\n    logo_url TEXT NOT NULL,\n    display_order INTEGER DEFAULT 0\n  );\n");
// Seed Admin if not exists (admin / admin123)
var seedAdmin = db.prepare('INSERT OR IGNORE INTO admin (username, password) VALUES (?, ?)');
seedAdmin.run('admin', 'admin123');
// Seed default branding if empty
var brandingCount = db.prepare('SELECT COUNT(*) as count FROM branding').get();
if (brandingCount.count === 0) {
    var insertBranding = db.prepare('INSERT INTO branding (type, name, logo_url, display_order) VALUES (?, ?, ?, ?)');
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
var carCount = db.prepare('SELECT COUNT(*) as count FROM cars').get();
if (carCount.count === 0) {
    var insertCar = db.prepare("\n    INSERT INTO cars (name, brand, year, price, km, transmission, fuel, images, stock)\n    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)\n  ");
    insertCar.run('BMW M4 Competition', 'BMW', 2022, 2150000000, 5000, 'AT', 'Petrol', JSON.stringify(['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800']), 1);
    insertCar.run('Mercedes-Benz G63 AMG', 'Mercedes', 2021, 5800000000, 12000, 'AT', 'Petrol', JSON.stringify(['https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800']), 1);
}
function startServer() {
    return __awaiter(this, void 0, void 0, function () {
        var app, vite, distPath_1, PORT;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = (0, express_1.default)();
                    app.use(express_1.default.json({ limit: '50mb' }));
                    app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
                    // Serve static files from public directory (for images and other assets)
                    app.use(express_1.default.static(path_1.default.join(process.cwd(), 'public')));
                    app.use('/uploads', express_1.default.static(path_1.default.join(process.cwd(), 'public', 'uploads')));
                    // API Routes
                    app.post('/api/upload', function (req, res) {
                        var _a = req.body, image = _a.image, fileName = _a.fileName;
                        if (!image || !fileName)
                            return res.status(400).json({ error: 'Missing data' });
                        var base64Data = image.replace(/^data:image\/\w+;base64,/, "");
                        var buffer = Buffer.from(base64Data, 'base64');
                        var uniqueFileName = "".concat(Date.now(), "-").concat(fileName);
                        var filePath = path_1.default.join(uploadsDir, uniqueFileName);
                        fs_1.default.writeFile(filePath, buffer, function (err) {
                            if (err)
                                return res.status(500).json({ error: 'Failed to save image' });
                            res.json({ url: "/uploads/".concat(uniqueFileName) });
                        });
                    });
                    app.post('/api/login', function (req, res) {
                        var _a = req.body, username = _a.username, password = _a.password;
                        var user = db.prepare('SELECT * FROM admin WHERE username = ? AND password = ?').get(username, password);
                        if (user) {
                            res.json({ success: true, token: 'mock-jwt-token' });
                        }
                        else {
                            res.status(401).json({ success: false, message: 'Invalid credentials' });
                        }
                    });
                    app.post('/api/admin/settings', function (req, res) {
                        var _a = req.body, oldUsername = _a.oldUsername, newUsername = _a.newUsername, newPassword = _a.newPassword;
                        var admin = db.prepare('SELECT * FROM admin WHERE username = ?').get(oldUsername);
                        if (admin) {
                            db.prepare('UPDATE admin SET username = ?, password = ? WHERE username = ?').run(newUsername, newPassword, oldUsername);
                            res.json({ success: true });
                        }
                        else {
                            res.status(404).json({ success: false, message: 'Admin not found' });
                        }
                    });
                    app.get('/api/cars', function (req, res) {
                        var cars = db.prepare('SELECT * FROM cars').all();
                        res.json(cars.map(function (c) { return (__assign(__assign({}, c), { images: JSON.parse(c.images) })); }));
                    });
                    app.post('/api/cars', function (req, res) {
                        var _a = req.body, name = _a.name, brand = _a.brand, year = _a.year, price = _a.price, cash_price = _a.cash_price, km = _a.km, transmission = _a.transmission, fuel = _a.fuel, images = _a.images, stock = _a.stock, min_dp_percent = _a.min_dp_percent, max_dp_percent = _a.max_dp_percent, interest_rate = _a.interest_rate, description = _a.description;
                        var result = db.prepare("\n      INSERT INTO cars (name, brand, year, price, cash_price, km, transmission, fuel, images, stock, min_dp_percent, max_dp_percent, interest_rate, description)\n      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)\n    ").run(name, brand, year, price, cash_price, km, transmission, fuel, JSON.stringify(images), stock, min_dp_percent, max_dp_percent, interest_rate, description);
                        res.json({ success: true, id: result.lastInsertRowid });
                    });
                    app.put('/api/cars/:id', function (req, res) {
                        var id = req.params.id;
                        var _a = req.body, name = _a.name, brand = _a.brand, year = _a.year, price = _a.price, cash_price = _a.cash_price, km = _a.km, transmission = _a.transmission, fuel = _a.fuel, images = _a.images, stock = _a.stock, min_dp_percent = _a.min_dp_percent, max_dp_percent = _a.max_dp_percent, interest_rate = _a.interest_rate, description = _a.description;
                        db.prepare("\n      UPDATE cars SET name=?, brand=?, year=?, price=?, cash_price=?, km=?, transmission=?, fuel=?, images=?, stock=?, min_dp_percent=?, max_dp_percent=?, interest_rate=?, description=?\n      WHERE id=?\n    ").run(name, brand, year, price, cash_price, km, transmission, fuel, JSON.stringify(images), stock, min_dp_percent, max_dp_percent, interest_rate, description, id);
                        res.json({ success: true });
                    });
                    app.delete('/api/cars/:id', function (req, res) {
                        db.prepare('DELETE FROM cars WHERE id = ?').run(req.params.id);
                        res.json({ success: true });
                    });
                    app.get('/api/testimonials', function (req, res) {
                        var testimonials = db.prepare('SELECT * FROM testimonials').all();
                        res.json(testimonials);
                    });
                    app.post('/api/testimonials', function (req, res) {
                        var _a = req.body, buyer_name = _a.buyer_name, car_name = _a.car_name, image_url = _a.image_url, comment = _a.comment;
                        db.prepare('INSERT INTO testimonials (buyer_name, car_name, image_url, comment) VALUES (?, ?, ?, ?)').run(buyer_name, car_name, image_url, comment);
                        res.json({ success: true });
                    });
                    app.delete('/api/testimonials/:id', function (req, res) {
                        db.prepare('DELETE FROM testimonials WHERE id = ?').run(req.params.id);
                        res.json({ success: true });
                    });
                    app.get('/api/faq', function (req, res) {
                        var faq = db.prepare('SELECT * FROM faq').all();
                        res.json(faq);
                    });
                    app.post('/api/faq', function (req, res) {
                        var _a = req.body, question = _a.question, answer = _a.answer;
                        db.prepare('INSERT INTO faq (question, answer) VALUES (?, ?)').run(question, answer);
                        res.json({ success: true });
                    });
                    app.delete('/api/faq/:id', function (req, res) {
                        db.prepare('DELETE FROM faq WHERE id = ?').run(req.params.id);
                        res.json({ success: true });
                    });
                    app.get('/api/sales', function (req, res) {
                        var sales = db.prepare('SELECT * FROM sales').all();
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
                    app.get('/api/branding', function (req, res) {
                        var branding = db.prepare('SELECT * FROM branding ORDER BY display_order').all();
                        res.json(branding);
                    });
                    app.post('/api/branding', function (req, res) {
                        var _a = req.body, type = _a.type, name = _a.name, logo_url = _a.logo_url, display_order = _a.display_order;
                        var result = db.prepare('INSERT INTO branding (type, name, logo_url, display_order) VALUES (?, ?, ?, ?)').run(type, name, logo_url, display_order || 0);
                        res.json({ success: true, id: result.lastInsertRowid });
                    });
                    app.put('/api/branding/:id', function (req, res) {
                        var id = req.params.id;
                        var _a = req.body, type = _a.type, name = _a.name, logo_url = _a.logo_url, display_order = _a.display_order;
                        db.prepare('UPDATE branding SET type=?, name=?, logo_url=?, display_order=? WHERE id=?').run(type, name, logo_url, display_order, id);
                        res.json({ success: true });
                    });
                    app.delete('/api/branding/:id', function (req, res) {
                        db.prepare('DELETE FROM branding WHERE id = ?').run(req.params.id);
                        res.json({ success: true });
                    });
                    // SEO: Sitemap.xml endpoint
                    app.get('/sitemap.xml', function (req, res) {
                        var cars = db.prepare('SELECT id, name, brand, year FROM cars').all();
                        var baseUrl = 'https://gudangmokas.com';
                        var currentDate = new Date().toISOString().split('T')[0];
                        var sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
                        sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
                        // Homepage
                        sitemap += '  <url>\n';
                        sitemap += "    <loc>".concat(baseUrl, "/</loc>\n");
                        sitemap += "    <lastmod>".concat(currentDate, "</lastmod>\n");
                        sitemap += '    <changefreq>daily</changefreq>\n';
                        sitemap += '    <priority>1.0</priority>\n';
                        sitemap += '  </url>\n';
                        // Inventory section
                        sitemap += '  <url>\n';
                        sitemap += "    <loc>".concat(baseUrl, "/#inventory</loc>\n");
                        sitemap += "    <lastmod>".concat(currentDate, "</lastmod>\n");
                        sitemap += '    <changefreq>daily</changefreq>\n';
                        sitemap += '    <priority>0.9</priority>\n';
                        sitemap += '  </url>\n';
                        // Ecosystem section
                        sitemap += '  <url>\n';
                        sitemap += "    <loc>".concat(baseUrl, "/#ecosystem</loc>\n");
                        sitemap += "    <lastmod>".concat(currentDate, "</lastmod>\n");
                        sitemap += '    <changefreq>weekly</changefreq>\n';
                        sitemap += '    <priority>0.8</priority>\n';
                        sitemap += '  </url>\n';
                        // Testimonials section
                        sitemap += '  <url>\n';
                        sitemap += "    <loc>".concat(baseUrl, "/#testimonials</loc>\n");
                        sitemap += "    <lastmod>".concat(currentDate, "</lastmod>\n");
                        sitemap += '    <changefreq>weekly</changefreq>\n';
                        sitemap += '    <priority>0.7</priority>\n';
                        sitemap += '  </url>\n';
                        // FAQ section
                        sitemap += '  <url>\n';
                        sitemap += "    <loc>".concat(baseUrl, "/#faq</loc>\n");
                        sitemap += "    <lastmod>".concat(currentDate, "</lastmod>\n");
                        sitemap += '    <changefreq>weekly</changefreq>\n';
                        sitemap += '    <priority>0.7</priority>\n';
                        sitemap += '  </url>\n';
                        // Location section
                        sitemap += '  <url>\n';
                        sitemap += "    <loc>".concat(baseUrl, "/#location</loc>\n");
                        sitemap += "    <lastmod>".concat(currentDate, "</lastmod>\n");
                        sitemap += '    <changefreq>monthly</changefreq>\n';
                        sitemap += '    <priority>0.6</priority>\n';
                        sitemap += '  </url>\n';
                        // Individual car pages (if you implement them in the future)
                        cars.forEach(function (car) {
                            sitemap += '  <url>\n';
                            sitemap += "    <loc>".concat(baseUrl, "/car/").concat(car.id, "</loc>\n");
                            sitemap += "    <lastmod>".concat(currentDate, "</lastmod>\n");
                            sitemap += '    <changefreq>weekly</changefreq>\n';
                            sitemap += '    <priority>0.8</priority>\n';
                            sitemap += '  </url>\n';
                        });
                        sitemap += '</urlset>';
                        res.header('Content-Type', 'application/xml');
                        res.send(sitemap);
                    });
                    if (!(process.env.NODE_ENV !== 'production')) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, vite_1.createServer)({
                            server: { middlewareMode: true },
                            appType: 'spa',
                        })];
                case 1:
                    vite = _a.sent();
                    app.use(vite.middlewares);
                    return [3 /*break*/, 3];
                case 2:
                    distPath_1 = path_1.default.join(process.cwd(), 'dist');
                    app.use(express_1.default.static(distPath_1));
                    app.get('*', function (req, res) {
                        res.sendFile(path_1.default.join(distPath_1, 'index.html'));
                    });
                    _a.label = 3;
                case 3:
                    PORT = parseInt(process.env.PORT || '3000', 10);
                    app.listen(PORT, '0.0.0.0', function () {
                        console.log("Server running on port ".concat(PORT));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
startServer();
