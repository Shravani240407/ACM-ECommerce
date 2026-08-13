import express from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const JWT_SECRET = 'acm_india_secret_key_123';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initial Seed Data
let users = [
    { id: 1, name: 'Aarav Sharma', email: 'aarav@example.in', password: 'user123', role: 'user' },
    { id: 2, name: 'ACM Admin India', email: 'admin@example.in', password: 'admin123', role: 'admin' }
];

// 40 Products (Prices in INR ₹)
let products = [
    { id: 1, name: 'Wireless Noise-Canceling Headphones', category: 'Electronics', price: 2999, stock: 15, description: 'Active noise cancellation, 30-hour battery life, and crystal-clear acoustic clarity.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
    { id: 2, name: 'RGB Mechanical Gaming Keyboard', category: 'Electronics', price: 3499, stock: 8, description: 'Customizable RGB lighting with linear mechanical switches for fast typing.', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500' },
    { id: 3, name: 'ACM India Chapter Fleece Hoodie', category: 'Apparel', price: 1299, stock: 25, description: 'Heavyweight premium fleece hoodie embroidered with the official ACM Student emblem.', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500' },
    { id: 4, name: 'Algorithms & Data Structures Guide', category: 'Books', price: 699, stock: 10, description: 'Mastering coding interviews, dynamic programming, and complexity analysis.', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500' },
    { id: 5, name: 'Ergonomic Optical Gaming Mouse', category: 'Electronics', price: 1499, stock: 20, description: '16,000 DPI optical sensor with customizable macro buttons.', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500' },
    { id: 6, name: '4K Ultra-Wide Monitor 34"', category: 'Electronics', price: 28999, stock: 5, description: '144Hz curved display with HDR10 for maximum coding screen space.', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500' },
    { id: 7, name: 'Raspberry Pi 4 Model B (8GB)', category: 'Hardware', price: 6499, stock: 12, description: 'Quad-core processor single-board mini computer for IoT home projects.', image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=500' },
    { id: 8, name: 'Arduino Uno Rev3 Starter Kit', category: 'Hardware', price: 1899, stock: 18, description: 'Microcontroller starter kit with sensors, LEDs, motor, and manual.', image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=500' },
    { id: 9, name: 'ACM Binary Matrix Cotton Tee', category: 'Apparel', price: 599, stock: 30, description: '100% breathable organic cotton graphic tee.', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500' },
    { id: 10, name: 'Clean Code: Handbook of Agile Software', category: 'Books', price: 899, stock: 14, description: 'Refactoring, software craftsmanship, and writing readable code.', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500' },
    { id: 11, name: 'USB-C Docking Station 11-in-1', category: 'Accessories', price: 2499, stock: 16, description: 'Dual HDMI, Ethernet, USB 3.0, SD card reader, and 100W power delivery.', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500' },
    { id: 12, name: 'Anker Power Bank 20,000mAh', category: 'Accessories', price: 2199, stock: 22, description: 'Fast charging external portable power bank with dual USB outputs.', image: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=500' },
    { id: 13, name: 'Full HD Webcam 1080p with Mic', category: 'Electronics', price: 1999, stock: 11, description: 'Auto-focus widescreen streaming camera with noise-canceling dual stereo mics.', image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500' },
    { id: 14, name: 'Developer Mug "Chai to Code"', category: 'Accessories', price: 349, stock: 40, description: 'Ceramic mug that converts Indian cutting chai into working software.', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500' },
    { id: 15, name: '1TB Portable External NVMe SSD', category: 'Hardware', price: 7999, stock: 9, description: 'Ultra-fast read speeds up to 1050MB/s in a shock-resistant casing.', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500' },
    { id: 16, name: 'Smart RGB LED Desk Study Lamp', category: 'Electronics', price: 1299, stock: 15, description: 'Dimmable color spectrum desk lamp with wireless charging pad.', image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=500' },
    { id: 17, name: 'Cybersecurity & Ethical Hacking Guide', category: 'Books', price: 799, stock: 8, description: 'Pen testing, network security, and vulnerability exploitation techniques.', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500' },
    { id: 18, name: 'ACM Chapter Cap', category: 'Apparel', price: 449, stock: 20, description: 'Adjustable snapback cap featuring minimalist embroidered ACM logo.', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500' },
    { id: 19, name: 'Dual Monitor Stand Desk Arm', category: 'Accessories', price: 2999, stock: 7, description: 'Fully adjustable gas spring desk mount for two screens up to 32 inches.', image: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=500' },
    { id: 20, name: 'Studio USB Condenser Microphone', category: 'Electronics', price: 3299, stock: 13, description: 'Plug-and-play cardioid mic with pop filter for crystal clear audio.', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500' },
    { id: 21, name: 'Large Extended Desk Pad (XXL)', category: 'Accessories', price: 699, stock: 35, description: 'Waterproof anti-slip rubber base desk pad with stitched edges.', image: 'https://images.unsplash.com/photo-1616440342855-484196144e05?w=500' },
    { id: 22, name: 'Hackathon Waterproof Laptop Backpack', category: 'Apparel', price: 1899, stock: 14, description: 'Travel laptop backpack with built-in TSA lock and USB charging port.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500' },
    { id: 23, name: 'Designing Data-Intensive Applications', category: 'Books', price: 1199, stock: 12, description: 'Deep dive into storage, computing, distributed systems, and reliability.', image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500' },
    { id: 24, name: 'Wi-Fi 6 Dual Band Router', category: 'Hardware', price: 4299, stock: 6, description: 'Whole-home wireless network coverage reaching speeds up to 1.8 Gbps.', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500' },
    { id: 25, name: 'Ergonomic Vertical Wireless Mouse', category: 'Electronics', price: 1199, stock: 19, description: 'Wireless ergonomic design reduces wrist strain during long coding sessions.', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500' },
    { id: 26, name: 'Cable Organizer Ties (Pack of 50)', category: 'Accessories', price: 299, stock: 50, description: 'Reusable microfiber straps for neat cable management.', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500' },
    { id: 27, name: 'Soldering Iron Kit 60W', category: 'Hardware', price: 899, stock: 15, description: 'Adjustable temperature soldering kit with multimeter and stand.', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500' },
    { id: 28, name: 'Developer Vinyl Sticker Pack (100 Pcs)', category: 'Accessories', price: 249, stock: 100, description: 'High-quality laptop stickers featuring Linux, Git, React, Python, and ACM badges.', image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=500' },
    { id: 29, name: 'Anti-Blue Light Glasses for Programmers', category: 'Accessories', price: 699, stock: 25, description: 'Anti-eyestrain glasses to protect eyes from monitor glare during late-night coding.', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500' },
    { id: 30, name: 'Artificial Intelligence: A Modern Approach', category: 'Books', price: 1499, stock: 7, description: 'Comprehensive guide to AI algorithms, machine learning, and neural networks.', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500' },
    { id: 31, name: 'ESP32 Wi-Fi + Bluetooth Microcontroller', category: 'Hardware', price: 499, stock: 30, description: 'Dual-core IoT development board ideal for embedded systems projects.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500' },
    { id: 32, name: 'Ergonomic Mesh Office & Gaming Chair', category: 'Accessories', price: 7999, stock: 6, description: 'Breathable back support chair with adjustable headrest for long coding hours.', image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=500' },
    { id: 33, name: 'System Design Interview Guide', category: 'Books', price: 950, stock: 15, description: 'Step-by-step framework to pass big-tech system design technical rounds.', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500' },
    { id: 34, name: 'True Wireless Noise-Canceling Earbuds', category: 'Electronics', price: 2499, stock: 22, description: 'IPX5 water resistance with ultra-low latency mode for mobile gaming.', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500' },
    { id: 35, name: 'ACM India Sweatshirt (Oversized Fit)', category: 'Apparel', price: 1199, stock: 18, description: 'Cozy streetwear style sweatshirt made for hackathon late-nighters.', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500' },
    { id: 36, name: 'Digital Multimeter with LCD Display', category: 'Hardware', price: 649, stock: 25, description: 'Precision measuring tool for voltage, current, resistance, and continuity.', image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=500' },
    { id: 37, name: 'Portable Laptop Stand (Aluminum Alloy)', category: 'Accessories', price: 799, stock: 40, description: 'Foldable ventilated desktop holder with 6 adjustable height levels.', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500' },
    { id: 38, name: 'Introduction to Quantum Computing', category: 'Books', price: 1250, stock: 8, description: 'Learn qubits, quantum gates, and qiskit programming from scratch.', image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500' },
    { id: 39, name: 'Full-Spectrum Web-Cam Ring Light', category: 'Electronics', price: 899, stock: 20, description: 'USB-powered selfie ring light for online interviews and video calls.', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500' },
    { id: 40, name: 'High-Speed Cat 6 Ethernet Cable (10m)', category: 'Accessories', price: 399, stock: 50, description: 'Gold-plated RJ45 connectors for stable high-speed Gigabit internet.', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500' }
];

let orders = [];

// JWT Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Authentication required' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// PRODUCT ENDPOINTS
app.get('/api/products', (req, res) => res.json(products));

app.post('/api/products', authenticateToken, (req, res) => {
    const newProd = { id: products.length + 1, ...req.body };
    products.push(newProd);
    res.status(201).json(newProd);
});

app.put('/api/products/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { id, ...req.body };
        res.json(products[index]);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.delete('/api/products/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    products = products.filter(p => p.id !== id);
    res.json({ message: 'Product removed' });
});

// AUTH ENDPOINTS
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Email already registered' });
    }
    const newUser = { id: users.length + 1, name, email, password, role: 'user' };
    users.push(newUser);
    res.status(201).json({ message: 'Account created' });
});

// ORDER ENDPOINTS
app.post('/api/orders', authenticateToken, (req, res) => {
    const { items, couponCode } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    let total = 0;
    items.forEach(item => {
        const p = products.find(prod => prod.id === item.id);
        if (p) {
            p.stock -= item.quantity;
            total += p.price * item.quantity;
        }
    });

    if (couponCode === 'ACM10') total *= 0.90;
    else if (couponCode === 'WELCOME20') total *= 0.80;

    const newOrder = {
        id: orders.length + 1001,
        user_id: req.user.id,
        items,
        total_amount: Math.round(total),
        status: 'Completed',
        created_at: new Date()
    };
    orders.push(newOrder);

    res.status(201).json({ message: 'Order placed', orderId: newOrder.id });
});

app.get('/api/orders/user', authenticateToken, (req, res) => {
    const userOrders = orders.filter(o => o.user_id === req.user.id);
    res.json(userOrders);
});

// ANALYTICS ENDPOINT
app.get('/api/admin/analytics', authenticateToken, (req, res) => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total_amount, 0);
    res.json({
        totalProducts: products.length,
        totalUsers: users.length,
        totalOrders: orders.length,
        totalRevenue
    });
});

// Dynamic Port Listener with Fallback
const INITIAL_PORT = parseInt(process.env.PORT, 10) || 3000;

const startServer = (port) => {
    const server = app.listen(port, () => {
        console.log(`🚀 Server live at http://localhost:${port}`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.warn(`⚠️ Port ${port} is occupied. Retrying on http://localhost:${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error('Server execution error:', err);
        }
    });
};

startServer(INITIAL_PORT);