-- Sample Products Data (100 products)
-- Category: AAA (Premium), AA (Standard), A (Basic)
-- Using INSERT IGNORE to skip duplicates on restart

INSERT IGNORE INTO products (name, description, price, category, stock, image_url) VALUES
-- Electronics - Premium (AAA)
('MacBook Pro 16" M3 Max', 'Apple MacBook Pro with M3 Max chip, 36GB RAM, 1TB SSD', 3499.99, 'AAA', 25, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'),
('iPhone 15 Pro Max 256GB', 'Apple iPhone 15 Pro Max with A17 Pro chip, Titanium design', 1199.99, 'AAA', 50, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500'),
('Sony WH-1000XM5', 'Premium wireless noise-cancelling headphones', 399.99, 'AAA', 75, 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500'),
('Samsung Galaxy S24 Ultra', 'Samsung flagship with S Pen, 200MP camera', 1299.99, 'AAA', 40, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500'),
('iPad Pro 12.9" M2', 'Apple iPad Pro with M2 chip, Liquid Retina XDR display', 1099.99, 'AAA', 35, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500'),
('Dell XPS 15 OLED', 'Premium laptop with Intel i9, 32GB RAM, 4K OLED', 2199.99, 'AAA', 20, 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500'),
('Apple Watch Ultra 2', 'Rugged smartwatch with titanium case, GPS + Cellular', 799.99, 'AAA', 60, 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500'),
('Bose QuietComfort Ultra', 'Premium earbuds with spatial audio', 299.99, 'AAA', 80, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500'),
('Canon EOS R5', 'Full-frame mirrorless camera, 45MP, 8K video', 3899.99, 'AAA', 15, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500'),
('Sony PlayStation 5 Pro', 'Next-gen gaming console with 8K support', 699.99, 'AAA', 30, 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500'),

-- Electronics - Standard (AA)
('Samsung Galaxy A54', 'Mid-range smartphone with 5G, 128GB', 449.99, 'AA', 100, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'),
('Apple AirPods Pro 2', 'Active noise cancellation, MagSafe charging', 249.99, 'AA', 150, 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500'),
('Nintendo Switch OLED', 'Handheld gaming console with OLED screen', 349.99, 'AA', 70, 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500'),
('Kindle Paperwhite', 'E-reader with 6.8" display, waterproof', 139.99, 'AA', 200, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500'),
('JBL Flip 6', 'Portable Bluetooth speaker, waterproof', 129.99, 'AA', 180, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'),
('Logitech MX Master 3S', 'Premium wireless mouse for productivity', 99.99, 'AA', 120, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'),
('Samsung Galaxy Buds 2 Pro', 'Wireless earbuds with ANC', 179.99, 'AA', 140, 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500'),
('GoPro Hero 12', 'Action camera with 5.3K video', 399.99, 'AA', 55, 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500'),
('Fitbit Charge 6', 'Advanced fitness tracker with GPS', 159.99, 'AA', 90, 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500'),
('Anker PowerCore 26800', 'High-capacity portable charger', 79.99, 'AA', 250, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500'),

-- Electronics - Basic (A)
('Echo Dot 5th Gen', 'Smart speaker with Alexa', 49.99, 'A', 300, 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=500'),
('Fire TV Stick 4K', 'Streaming device with Alexa voice remote', 39.99, 'A', 400, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500'),
('Logitech K380 Keyboard', 'Multi-device Bluetooth keyboard', 39.99, 'A', 200, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'),
('SanDisk 256GB microSD', 'High-speed memory card', 29.99, 'A', 500, 'https://images.unsplash.com/photo-1618171880956-f6b46e45cf96?w=500'),
('USB-C Hub 7-in-1', 'Multiport adapter for laptops', 34.99, 'A', 350, 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=500'),

-- Fashion - Premium (AAA)
('Gucci Leather Belt', 'Genuine leather with GG buckle', 450.00, 'AAA', 30, 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500'),
('Ray-Ban Aviator Classic', 'Iconic sunglasses with gold frame', 169.00, 'AAA', 85, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500'),
('Burberry Cashmere Scarf', 'Classic check pattern, 100% cashmere', 530.00, 'AAA', 25, 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500'),
('Rolex Submariner Watch', 'Luxury diving watch, stainless steel', 9550.00, 'AAA', 5, 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500'),
('Louis Vuitton Neverfull', 'Iconic tote bag, Monogram canvas', 1960.00, 'AAA', 10, 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500'),

-- Fashion - Standard (AA)
('Nike Air Max 270', 'Running shoes with Air Max unit', 150.00, 'AA', 120, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'),
('Levi''s 501 Original Jeans', 'Classic straight fit, button fly', 89.99, 'AA', 200, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'),
('The North Face Puffer', 'Water-resistant down jacket', 229.00, 'AA', 75, 'https://images.unsplash.com/photo-1544923246-77307dd628b7?w=500'),
('Adidas Ultraboost 23', 'Performance running shoes', 190.00, 'AA', 100, 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500'),
('Calvin Klein Cotton Tee 3-Pack', 'Essential cotton t-shirts', 49.99, 'AA', 300, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'),
('Tommy Hilfiger Polo', 'Classic fit polo shirt', 69.99, 'AA', 180, 'https://images.unsplash.com/photo-1625910513413-5fc6c8e5b6c9?w=500'),
('Coach Crossbody Bag', 'Leather crossbody with signature canvas', 295.00, 'AA', 60, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'),
('Fossil Leather Watch', 'Classic analog watch with leather strap', 139.00, 'AA', 90, 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500'),

-- Fashion - Basic (A)
('Hanes Cotton Socks 12-Pack', 'Everyday comfort socks', 19.99, 'A', 500, 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=500'),
('Amazon Essentials Hoodie', 'Fleece pullover hoodie', 29.99, 'A', 400, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500'),
('Gildan Basic Tee 5-Pack', 'Cotton crew neck t-shirts', 24.99, 'A', 600, 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500'),
('Canvas Tote Bag', 'Reusable shopping tote', 14.99, 'A', 700, 'https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=500'),
('Baseball Cap', 'Adjustable cotton cap', 16.99, 'A', 450, 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500'),

-- Home & Kitchen - Premium (AAA)
('Dyson V15 Detect', 'Cordless vacuum with laser dust detection', 749.99, 'AAA', 40, 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500'),
('KitchenAid Stand Mixer', 'Artisan 5-quart tilt-head mixer', 449.99, 'AAA', 35, 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=500'),
('Nespresso Vertuo Plus', 'Premium coffee machine with milk frother', 249.99, 'AAA', 65, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500'),
('Le Creuset Dutch Oven', 'Enameled cast iron, 5.5 quart', 380.00, 'AAA', 30, 'https://images.unsplash.com/photo-1585442245963-97b354b28c4c?w=500'),
('Vitamix A3500', 'Smart blender with touchscreen', 649.99, 'AAA', 25, 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500'),
('Breville Barista Express', 'Espresso machine with grinder', 699.99, 'AAA', 20, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500'),

-- Home & Kitchen - Standard (AA)
('Instant Pot Duo 8-Quart', 'Multi-use pressure cooker', 89.99, 'AA', 150, 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=500'),
('Ninja Air Fryer Max XL', 'Large capacity air fryer', 149.99, 'AA', 100, 'https://images.unsplash.com/photo-1648145856916-e38562f6e9c9?w=500'),
('Cuisinart Food Processor', '14-cup capacity, multiple blades', 199.99, 'AA', 75, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500'),
('iRobot Roomba i3', 'Robot vacuum with smart mapping', 349.99, 'AA', 55, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'),
('Keurig K-Elite', 'Single serve coffee maker', 149.99, 'AA', 120, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500'),
('Philips Sonicare 9900', 'Electric toothbrush with AI', 299.99, 'AA', 80, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500'),
('Calphalon Cookware Set', '10-piece nonstick set', 249.99, 'AA', 45, 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=500'),

-- Home & Kitchen - Basic (A)
('Glass Food Containers 10-Pack', 'Meal prep containers with lids', 34.99, 'A', 300, 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=500'),
('Bamboo Cutting Board Set', '3-piece cutting board set', 24.99, 'A', 250, 'https://images.unsplash.com/photo-1605598989565-9f3c2e9f5769?w=500'),
('Stainless Steel Water Bottle', 'Insulated 32oz bottle', 19.99, 'A', 400, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500'),
('Kitchen Utensil Set 12-Piece', 'Silicone cooking utensils', 29.99, 'A', 350, 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500'),
('Pour Over Coffee Maker', 'Glass carafe with filter', 24.99, 'A', 200, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500'),

-- Sports & Outdoors - Premium (AAA)
('Peloton Bike+', 'Indoor cycling with 24" rotating screen', 2495.00, 'AAA', 10, 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500'),
('Yeti Tundra 65 Cooler', 'Rotomolded hard cooler', 375.00, 'AAA', 30, 'https://images.unsplash.com/photo-1513013899512-60f7f3acf2af?w=500'),
('Trek Domane SL 6', 'Carbon road bike, Shimano 105', 3999.99, 'AAA', 8, 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500'),
('Bowflex SelectTech 552', 'Adjustable dumbbells 5-52.5 lbs', 549.00, 'AAA', 25, 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500'),
('Garmin Fenix 7X', 'Premium multisport GPS watch', 899.99, 'AAA', 35, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500'),

-- Sports & Outdoors - Standard (AA)
('NordicTrack Treadmill', 'Folding treadmill with iFit', 999.99, 'AA', 20, 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500'),
('Coleman 6-Person Tent', 'Instant cabin tent, weatherproof', 179.99, 'AA', 60, 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500'),
('Osprey Atmos AG 65', 'Backpacking pack, anti-gravity system', 290.00, 'AA', 45, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'),
('Hydro Flask 40oz', 'Insulated water bottle', 44.95, 'AA', 180, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500'),
('Manduka PRO Yoga Mat', 'Professional-grade 6mm mat', 120.00, 'AA', 100, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500'),
('TRX Suspension Trainer', 'Home suspension training system', 179.95, 'AA', 75, 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500'),

-- Sports & Outdoors - Basic (A)
('Resistance Bands Set', '5-pack exercise bands', 19.99, 'A', 400, 'https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?w=500'),
('Jump Rope Speed Cable', 'Adjustable speed rope', 14.99, 'A', 500, 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=500'),
('Foam Roller 18"', 'High-density muscle roller', 24.99, 'A', 300, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'),
('Yoga Block 2-Pack', 'EVA foam yoga blocks', 16.99, 'A', 350, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500'),
('Camping Hammock', 'Portable nylon hammock with straps', 29.99, 'A', 200, 'https://images.unsplash.com/photo-1520823562405-36d84d8dd66c?w=500'),

-- Books & Office - Premium (AAA)
('Herman Miller Aeron Chair', 'Ergonomic office chair, Size B', 1395.00, 'AAA', 15, 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500'),
('Apple Magic Keyboard', 'Full-size with Touch ID', 199.00, 'AAA', 80, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'),
('LG 27" 4K Monitor', 'UltraFine USB-C display', 699.99, 'AAA', 40, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500'),
('Montblanc Meisterstück Pen', 'Classic fountain pen', 625.00, 'AAA', 20, 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500'),

-- Books & Office - Standard (AA)
('Autonomous SmartDesk', 'Electric standing desk', 499.00, 'AA', 35, 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500'),
('Moleskine Classic Notebook', 'Hardcover ruled journal', 24.95, 'AA', 200, 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500'),
('Brother Laser Printer', 'Wireless monochrome printer', 149.99, 'AA', 70, 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500'),
('Bostitch Electric Stapler', 'Anti-jam desktop stapler', 49.99, 'AA', 120, 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500'),
('Desk Organizer Set', 'Mesh desk accessories 5-piece', 34.99, 'AA', 180, 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500'),

-- Books & Office - Basic (A)
('BIC Cristal Pens 12-Pack', 'Classic ballpoint pens', 6.99, 'A', 800, 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=500'),
('Post-it Notes 12-Pack', '3x3 inch sticky notes', 14.99, 'A', 600, 'https://images.unsplash.com/photo-1598791318878-10e76d178023?w=500'),
('Scotch Magic Tape 6-Pack', 'Invisible tape refills', 12.99, 'A', 500, 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500'),
('File Folders 100-Pack', 'Manila letter size folders', 18.99, 'A', 400, 'https://images.unsplash.com/photo-1568667256549-094345857637?w=500'),
('Composition Notebooks 5-Pack', 'College ruled notebooks', 9.99, 'A', 700, 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=500'),

-- Beauty & Personal Care - Premium (AAA)
('Dyson Airwrap Complete', 'Multi-styler with attachments', 599.99, 'AAA', 30, 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500'),
('La Mer Crème de la Mer', 'Luxury moisturizing cream 2oz', 380.00, 'AAA', 25, 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500'),
('Chanel No. 5 Parfum', 'Iconic fragrance 3.4oz', 150.00, 'AAA', 50, 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500'),
('ghd Platinum+ Styler', 'Smart flat iron with predictive tech', 279.00, 'AAA', 45, 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500'),

-- Beauty & Personal Care - Standard (AA)
('Olaplex Hair Repair Set', 'No. 3, 4, 5, 6 bundle', 99.00, 'AA', 120, 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=500'),
('Clinique 3-Step System', 'Complete skincare routine', 89.50, 'AA', 100, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500'),
('Oral-B iO Series 9', 'Smart electric toothbrush', 299.99, 'AA', 65, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500'),
('TheraGun Prime', 'Percussion massage device', 299.00, 'AA', 55, 'https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?w=500'),

-- Beauty & Personal Care - Basic (A)
('CeraVe Moisturizing Cream', 'Daily face and body moisturizer', 16.99, 'A', 350, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500'),
('Neutrogena Sunscreen SPF 70', 'Ultra Sheer dry-touch', 12.99, 'A', 400, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500'),
('Dove Body Wash 3-Pack', 'Moisturizing body wash', 19.99, 'A', 500, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500'),
('Gillette Razor Refills 8-Pack', 'Fusion5 cartridges', 32.99, 'A', 300, 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=500'),
('Maybelline Mascara', 'Lash Sensational Sky High', 13.99, 'A', 450, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500');

