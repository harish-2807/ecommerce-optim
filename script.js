// E-Commerce Platform JavaScript
class ECommercePlatform {
    constructor() {
        this.currentUser = null;
        this.userRole = null;
        this.products = [];
        this.cart = [];
        this.orders = [];
        this.vendorOrders = [];
        this.init();
    }

    init() {
        this.loadData();
        this.checkLoginState();
        this.setupEventListeners();
        this.renderProducts();
        this.updateCartCount();
        this.updateVendorStats();
        this.initHeroAnimations();
    }

    checkLoginState() {
        const savedUser = localStorage.getItem('currentUser');
        const savedRole = localStorage.getItem('userRole');
        
        if (savedUser && savedRole) {
            this.currentUser = JSON.parse(savedUser);
            this.userRole = savedRole;
            this.updateUIForRole(savedRole);
            
            // Hide login section and show appropriate section
            document.getElementById('loginSection').classList.remove('active');
            
            if (savedRole === 'vendor') {
                this.switchToVendorMode();
            } else if (savedRole === 'admin') {
                this.switchToAdminMode();
            } else {
                this.switchToUserMode();
            }
        }
    }

    initHeroAnimations() {
        // Animate statistics counters
        this.animateCounters();
        
        // Add interactive hover effects
        this.addHeroInteractions();
        
        // Add parallax effect on mouse move
        this.addParallaxEffect();
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const animate = () => {
                const target = +counter.getAttribute('data-target');
                const current = +counter.innerText;
                const increment = target / speed;

                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(animate, 10);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            animate();
        });
    }

    addHeroInteractions() {
        // Add ripple effect to hero buttons
        const heroButtons = document.querySelectorAll('.btn-hero');
        heroButtons.forEach(button => {
            button.addEventListener('mouseenter', function(e) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add floating card interactions
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.zIndex = '1';
            });
        });
    }

    addParallaxEffect() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = hero;
            const centerX = offsetWidth / 2;
            const centerY = offsetHeight / 2;
            
            const moveX = (clientX - centerX) / 25;
            const moveY = (clientY - centerY) / 25;

            const floatingCards = document.querySelectorAll('.floating-card');
            floatingCards.forEach((card, index) => {
                const depth = (index + 1) * 0.5;
                card.style.transform = `translateX(${moveX * depth}px) translateY(${moveY * depth}px)`;
            });
        });

        hero.addEventListener('mouseleave', () => {
            const floatingCards = document.querySelectorAll('.floating-card');
            floatingCards.forEach(card => {
                card.style.transform = '';
            });
        });
    }

    // Data Storage Methods
    loadData() {
        const savedProducts = localStorage.getItem('products');
        const savedCart = localStorage.getItem('cart');
        const savedOrders = localStorage.getItem('orders');
        const savedVendorOrders = localStorage.getItem('vendorOrders');

        this.products = savedProducts ? JSON.parse(savedProducts) : this.getDefaultProducts();
        this.cart = savedCart ? JSON.parse(savedCart) : [];
        this.orders = savedOrders ? JSON.parse(savedOrders) : [];
        this.vendorOrders = savedVendorOrders ? JSON.parse(savedVendorOrders) : [];

        this.saveData();
    }

    saveData() {
        localStorage.setItem('products', JSON.stringify(this.products));
        localStorage.setItem('cart', JSON.stringify(this.cart));
        localStorage.setItem('orders', JSON.stringify(this.orders));
        localStorage.setItem('vendorOrders', JSON.stringify(this.vendorOrders));
    }

    getDefaultProducts() {
        return [
            {
                id: 1,
                title: 'Wireless Headphones',
                description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
                price: 14999.99,
                category: 'electronics',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
                stock: 15,
                vendor: 'TechStore'
            },
            {
                id: 2,
                title: 'Smart Watch',
                description: 'Fitness tracking smartwatch with heart rate monitor and GPS.',
                price: 22999.99,
                category: 'electronics',
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
                stock: 8,
                vendor: 'TechStore'
            },
            {
                id: 3,
                title: 'Laptop Pro 15"',
                description: 'High-performance laptop with 16GB RAM and 512GB SSD for professionals.',
                price: 89999.99,
                category: 'electronics',
                image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
                stock: 12,
                vendor: 'ComputerWorld'
            },
            {
                id: 4,
                title: '4K Webcam',
                description: 'Ultra HD webcam with auto-focus and noise cancellation for streaming.',
                price: 7999.99,
                category: 'electronics',
                image: 'https://images.unsplash.com/photo-1596468138836-4fd5b8a0d9c3?w=400&h=300&fit=crop',
                stock: 25,
                vendor: 'StreamGear'
            },
            {
                id: 5,
                title: 'Wireless Mouse',
                description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
                price: 2499.99,
                category: 'electronics',
                image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
                stock: 30,
                vendor: 'TechStore'
            },
            {
                id: 6,
                title: 'Running Shoes',
                description: 'Comfortable running shoes with advanced cushioning technology.',
                price: 6999.99,
                category: 'sports',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
                stock: 25,
                vendor: 'SportsGear'
            },
            {
                id: 7,
                title: 'Yoga Mat',
                description: 'Non-slip exercise yoga mat with carrying strap.',
                price: 2299.99,
                category: 'sports',
                image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop',
                stock: 20,
                vendor: 'SportsGear'
            },
            {
                id: 8,
                title: 'Dumbbells Set',
                description: 'Adjustable dumbbells set from 5kg to 25kg for home workouts.',
                price: 8999.99,
                category: 'sports',
                image: 'https://images.unsplash.com/photo-1517963879193-52a74383959a?w=400&h=300&fit=crop',
                stock: 15,
                vendor: 'FitnessPro'
            },
            {
                id: 9,
                title: 'Tennis Racket',
                description: 'Professional tennis racket with vibration dampening technology.',
                price: 4999.99,
                category: 'sports',
                image: 'https://images.unsplash.com/photo-1614632537193-23e1a0f91d4a?w=400&h=300&fit=crop',
                stock: 18,
                vendor: 'SportsGear'
            },
            {
                id: 10,
                title: 'Fitness Tracker',
                description: 'Waterproof fitness tracker with sleep monitoring and step counting.',
                price: 3999.99,
                category: 'sports',
                image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop',
                stock: 35,
                vendor: 'FitTech'
            },
            {
                id: 11,
                title: 'Winter Jacket',
                description: 'Warm and stylish winter jacket with water-resistant material.',
                price: 11999.99,
                category: 'clothing',
                image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
                stock: 12,
                vendor: 'FashionHub'
            },
            {
                id: 12,
                title: 'Denim Jeans',
                description: 'Classic fit denim jeans with comfortable stretch fabric.',
                price: 3499.99,
                category: 'clothing',
                image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop',
                stock: 40,
                vendor: 'DenimWorld'
            },
            {
                id: 13,
                title: 'Cotton T-Shirt',
                description: '100% organic cotton t-shirt available in multiple colors.',
                price: 1299.99,
                category: 'clothing',
                image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
                stock: 60,
                vendor: 'EcoWear'
            },
            {
                id: 14,
                title: 'Formal Shirt',
                description: 'Premium cotton formal shirt perfect for business meetings.',
                price: 2999.99,
                category: 'clothing',
                image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop',
                stock: 25,
                vendor: 'OfficeWear'
            },
            {
                id: 15,
                title: 'Sports Shoes',
                description: 'Lightweight sports shoes with breathable mesh and arch support.',
                price: 4499.99,
                category: 'clothing',
                image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
                stock: 30,
                vendor: 'SportStyle'
            },
            {
                id: 16,
                title: 'JavaScript Guide',
                description: 'Comprehensive guide to modern JavaScript programming.',
                price: 2999.99,
                category: 'books',
                image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop',
                stock: 30,
                vendor: 'BookWorld'
            },
            {
                id: 17,
                title: 'Python Programming',
                description: 'Learn Python from basics to advanced concepts with practical examples.',
                price: 3499.99,
                category: 'books',
                image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop',
                stock: 25,
                vendor: 'TechBooks'
            },
            {
                id: 18,
                title: 'Digital Marketing',
                description: 'Complete guide to digital marketing strategies and techniques.',
                price: 2499.99,
                category: 'books',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
                stock: 20,
                vendor: 'BusinessBooks'
            },
            {
                id: 19,
                title: 'Novel Collection',
                description: 'Best-selling fiction novel collection for leisure reading.',
                price: 1899.99,
                category: 'books',
                image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
                stock: 35,
                vendor: 'BookWorld'
            },
            {
                id: 20,
                title: 'Cookbook Deluxe',
                description: 'International cuisine cookbook with 500+ recipes and photos.',
                price: 2799.99,
                category: 'books',
                image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400&h=300&fit=crop',
                stock: 22,
                vendor: 'FoodBooks'
            },
            {
                id: 21,
                title: 'Garden Tool Set',
                description: 'Complete 5-piece garden tool set with wooden handles and metal heads.',
                price: 3499.99,
                category: 'home',
                image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&h=300&fit=crop',
                stock: 18,
                vendor: 'GreenThumb'
            },
            {
                id: 22,
                title: 'Kitchen Blender',
                description: 'High-power blender with multiple speed settings for smoothies and soups.',
                price: 5999.99,
                category: 'home',
                image: 'https://images.unsplash.com/photo-1502741126161-b048600d289a?w=400&h=300&fit=crop',
                stock: 14,
                vendor: 'KitchenPro'
            },
            {
                id: 23,
                title: 'LED Desk Lamp',
                description: 'Adjustable LED desk lamp with USB charging port and touch control.',
                price: 2499.99,
                category: 'home',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
                stock: 28,
                vendor: 'HomeLight'
            },
            {
                id: 24,
                title: 'Wall Clock',
                description: 'Modern minimalist wall clock with silent sweep movement.',
                price: 1899.99,
                category: 'home',
                image: 'https://images.unsplash.com/photo-1564399580075-5dfe19c205f3?w=400&h=300&fit=crop',
                stock: 32,
                vendor: 'TimePieces'
            },
            {
                id: 25,
                title: 'Throw Pillows Set',
                description: 'Set of 4 decorative throw pillows with removable covers.',
                price: 2999.99,
                category: 'home',
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
                stock: 20,
                vendor: 'HomeDecor'
            }
        ];
    }

    getSampleData() {
        return [
            {
                "id": 1,
                "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                "price": 8199.99,
                "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
                "stock": 25,
                "vendor": "Fjallraven Store"
            },
            {
                "id": 2,
                "title": "Mens Casual Premium Slim Fit T-Shirts",
                "price": 1669.99,
                "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
                "stock": 50,
                "vendor": "Fashion Hub"
            },
            {
                "id": 3,
                "title": "Mens Cotton Jacket",
                "price": 4199.99,
                "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing.",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
                "stock": 30,
                "vendor": "Outdoor Gear"
            },
            {
                "id": 4,
                "title": "Mens Casual Slim Fit",
                "price": 1199.99,
                "description": "The color could be slightly different between on the screen and in practice. Please note that body builds vary by person.",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
                "stock": 40,
                "vendor": "Style Zone"
            },
            {
                "id": 5,
                "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Bracelet",
                "price": 51999.99,
                "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.",
                "category": "jewelery",
                "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
                "stock": 15,
                "vendor": "Luxury Jewels"
            },
            {
                "id": 6,
                "title": "Solid Gold Petite Micropave",
                "price": 12599.99,
                "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center.",
                "category": "jewelery",
                "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png",
                "stock": 20,
                "vendor": "Gold Palace"
            },
            {
                "id": 7,
                "title": "White Gold Plated Princess Ring",
                "price": 749.99,
                "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts for Engagement, Wedding, Anniversary.",
                "category": "jewelery",
                "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png",
                "stock": 35,
                "vendor": "Diamond Store"
            },
            {
                "id": 8,
                "title": "Rose Gold Plated Steel Earrings",
                "price": 824.99,
                "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
                "category": "jewelery",
                "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png",
                "stock": 45,
                "vendor": "Body Art"
            },
            {
                "id": 9,
                "title": "WD 2TB Elements Portable External Hard Drive",
                "price": 4799.99,
                "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity",
                "category": "electronics",
                "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png",
                "stock": 60,
                "vendor": "Tech World"
            },
            {
                "id": 10,
                "title": "SanDisk SSD PLUS 1TB Internal SSD",
                "price": 8199.99,
                "description": "Easy upgrade for faster boot up, shutdown, application load and response. The perfect balance of performance and reliability.",
                "category": "electronics",
                "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png",
                "stock": 55,
                "vendor": "Storage Pro"
            },
            {
                "id": 11,
                "title": "Silicon Power 256GB SSD 3D NAND",
                "price": 8199.99,
                "description": "3D NAND flash are applied to deliver high transfer speeds. The advanced SLC Cache Technology allows performance boost.",
                "category": "electronics",
                "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png",
                "stock": 70,
                "vendor": "Memory Masters"
            },
            {
                "id": 12,
                "title": "WD 4TB Gaming Drive for PS4",
                "price": 8549.99,
                "description": "Expand your PS4 gaming experience, Play anywhere Fast and easy setup Sleek design with high capacity.",
                "category": "electronics",
                "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png",
                "stock": 40,
                "vendor": "Gaming Zone"
            },
            {
                "id": 13,
                "title": "Acer SB220Q bi 21.5 inches Full HD IPS Monitor",
                "price": 44999.99,
                "description": "21.5 inches Full HD widescreen IPS display with Radeon free Sync technology. No compatibility for VESA Mount.",
                "category": "electronics",
                "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png",
                "stock": 25,
                "vendor": "Display Hub"
            },
            {
                "id": 14,
                "title": "Samsung 49-Inch Curved Gaming Monitor",
                "price": 74999.99,
                "description": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT TECHNOLOGY.",
                "category": "electronics",
                "image": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png",
                "stock": 15,
                "vendor": "Samsung Store"
            },
            {
                "id": 15,
                "title": "Women's 3-in-1 Snowboard Jacket Winter Coats",
                "price": 4299.99,
                "description": "Note: The Jackets is US standard size. Material: 100% Polyester with Detachable Liner Fabric: Warm Fleece.",
                "category": "women's clothing",
                "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png",
                "stock": 35,
                "vendor": "Winter Wear"
            },
            {
                "id": 16,
                "title": "Women's Removable Hooded Faux Leather Jacket",
                "price": 2249.99,
                "description": "100% POLYURETHANE shell with 100% POLYESTER lining. Faux leather material for style and comfort.",
                "category": "women's clothing",
                "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png",
                "stock": 30,
                "vendor": "Leather Boutique"
            },
            {
                "id": 17,
                "title": "Rain Jacket Women Windbreaker Striped",
                "price": 2999.99,
                "description": "Lightweight perfect for trip or casual wear with hooded, adjustable drawstring waist design.",
                "category": "women's clothing",
                "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png",
                "stock": 50,
                "vendor": "Rain Gear"
            },
            {
                "id": 18,
                "title": "Women's Solid Short Sleeve Boat Neck",
                "price": 749.99,
                "description": "95% RAYON 5% SPANDEX, Made in USA. Lightweight fabric with great stretch for comfort.",
                "category": "women's clothing",
                "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png",
                "stock": 80,
                "vendor": "Comfort Wear"
            },
            {
                "id": 19,
                "title": "Women's Short Sleeve Moisture T-Shirt",
                "price": 599.99,
                "description": "100% Polyester, Machine wash. Lightweight fabric with comfortable V-neck collar and a slimmer fit.",
                "category": "women's clothing",
                "image": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png",
                "stock": 90,
                "vendor": "Active Wear"
            },
            {
                "id": 20,
                "title": "Women's T Shirt Casual Cotton Short",
                "price": 999.99,
                "description": "95%Cotton,5%Spandex. Features: Casual, Short Sleeve, Letter Print, V-Neck, Fashion Tees.",
                "category": "women's clothing",
                "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png",
                "stock": 75,
                "vendor": "Casual Corner"
            }
        ];
    }

    showImportModal() {
        document.getElementById('importModal').classList.add('show');
    }

    importJsonData() {
        const jsonData = document.getElementById('jsonImportData').value.trim();
        
        if (!jsonData) {
            this.showMessage('Please paste JSON data first', 'error');
            return;
        }

        try {
            const products = JSON.parse(jsonData);
            this.processImportedProducts(products);
        } catch (error) {
            this.showMessage('Invalid JSON format. Please check your data.', 'error');
        }
    }

    loadSampleData() {
        const sampleProducts = this.getSampleData();
        this.processImportedProducts(sampleProducts);
    }

    processImportedProducts(products) {
        if (!Array.isArray(products)) {
            this.showMessage('Data must be an array of products', 'error');
            return;
        }

        let importedCount = 0;
        const maxId = Math.max(...this.products.map(p => p.id), 0);

        products.forEach((product, index) => {
            if (product.title && product.price && product.description) {
                const newProduct = {
                    id: maxId + index + 1,
                    title: product.title,
                    description: product.description || '',
                    price: parseFloat(product.price) || 0,
                    category: product.category || 'other',
                    image: product.image || `https://picsum.photos/seed/product-${maxId + index + 1}/400/300`,
                    stock: parseInt(product.stock) || 10,
                    vendor: product.vendor || 'Imported Store'
                };

                this.products.push(newProduct);
                importedCount++;
            }
        });

        this.saveData();
        this.renderProducts();
        this.renderVendorProducts();
        this.updateVendorStats();
        
        document.getElementById('importModal').classList.remove('show');
        document.getElementById('jsonImportData').value = '';
        
        this.showMessage(`Successfully imported ${importedCount} products!`, 'success');
    }

    // Login Methods
    handleLogin(role) {
        this.userRole = role;
        this.currentUser = {
            role: role,
            name: role.charAt(0).toUpperCase() + role.slice(1) + ' User',
            loginTime: new Date().toISOString()
        };
        
        // Save login state
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        localStorage.setItem('userRole', role);
        
        // Show welcome message
        const roleNames = {
            'user': 'Customer',
            'vendor': 'Vendor',
            'admin': 'Administrator'
        };
        
        this.showMessage(`Welcome ${roleNames[role]}! Access granted.`, 'success');
        
        // Navigate based on role
        setTimeout(() => {
            if (role === 'vendor') {
                this.switchToVendorMode();
            } else if (role === 'admin') {
                this.switchToAdminMode();
            } else {
                this.switchToUserMode();
            }
        }, 1000);
    }

    switchToAdminMode() {
        this.userRole = 'admin';
        document.getElementById('userModeBtn').style.display = 'none';
        document.getElementById('vendorModeBtn').style.display = 'none';
        
        // Show admin-specific elements
        this.showSection('vendorSection');
        this.updateUIForRole('admin');
        
        // Show admin message
        this.showMessage('Administrator mode activated. Full system access granted.', 'info');
    }

    updateUIForRole(role) {
        const header = document.querySelector('header');
        const roleBadge = document.createElement('div');
        roleBadge.className = 'role-badge';
        roleBadge.innerHTML = `<i class="fas fa-user-circle"></i> ${role.charAt(0).toUpperCase() + role.slice(1)}`;
        
        // Remove existing badge
        const existingBadge = header.querySelector('.role-badge');
        if (existingBadge) {
            existingBadge.remove();
        }
        
        // Add new badge
        header.querySelector('.user-actions').appendChild(roleBadge);
        
        // Show logout button and hide mode switchers
        document.getElementById('logoutBtn').style.display = 'block';
        document.getElementById('userModeBtn').style.display = 'none';
        document.getElementById('vendorModeBtn').style.display = 'none';
        
        // Update navigation visibility based on role
        if (role === 'admin') {
            document.getElementById('vendorLink').style.display = 'block';
            document.getElementById('ordersLink').style.display = 'block';
        } else if (role === 'vendor') {
            document.getElementById('vendorLink').style.display = 'block';
            document.getElementById('ordersLink').style.display = 'none';
        } else {
            document.getElementById('vendorLink').style.display = 'none';
            document.getElementById('ordersLink').style.display = 'block';
        }
    }

    logout() {
        this.currentUser = null;
        this.userRole = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userRole');
        
        // Remove role badge
        const roleBadge = document.querySelector('.role-badge');
        if (roleBadge) {
            roleBadge.remove();
        }
        
        // Reset UI
        document.getElementById('userModeBtn').style.display = 'block';
        document.getElementById('vendorModeBtn').style.display = 'block';
        
        // Show login section
        this.showSection('loginSection');
        this.showMessage('Logged out successfully.', 'info');
    }

    // Navigation Methods
    setupEventListeners() {
        // Navigation - use correct IDs from HTML
        const homeLink = document.getElementById('homeLink');
        if (homeLink) homeLink.addEventListener('click', () => this.showSection('home'));
        
        const productsLink = document.getElementById('productsLink');
        if (productsLink) productsLink.addEventListener('click', () => this.showSection('products'));
        
        const cartLink = document.getElementById('cartLink');
        if (cartLink) cartLink.addEventListener('click', () => this.showSection('cart'));
        
        const ordersLink = document.getElementById('ordersLink');
        if (ordersLink) ordersLink.addEventListener('click', () => this.showSection('orders'));
        
        const vendorLink = document.getElementById('vendorLink');
        if (vendorLink) vendorLink.addEventListener('click', () => this.showSection('vendor'));
        
        // Also add click listeners to nav links with data-section attributes
        document.querySelectorAll('.nav-link[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.getAttribute('data-section');
                this.showSection(section);
            });
        });
        
        // Mode switching
        const userModeBtn = document.getElementById('userModeBtn');
        if (userModeBtn) userModeBtn.addEventListener('click', () => this.switchToUserMode());
        
        const vendorModeBtn = document.getElementById('vendorModeBtn');
        if (vendorModeBtn) vendorModeBtn.addEventListener('click', () => this.switchToVendorMode());
        
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.addEventListener('click', () => this.logout());
        
        // Login role selection
        document.querySelectorAll('.role-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const role = e.currentTarget.getAttribute('data-role');
                this.handleLogin(role);
            });
        });
        
        // Cart functionality
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) cartBtn.addEventListener('click', () => this.showSection('cart'));
        
        // Product form
        const addProductBtn = document.getElementById('addProductBtn');
        if (addProductBtn) addProductBtn.addEventListener('click', () => this.showProductForm());
        
        const productForm = document.getElementById('productForm');
        if (productForm) productForm.addEventListener('submit', (e) => this.handleProductSubmit(e));
        
        // Import functionality
        const importProductsBtn = document.getElementById('importProductsBtn');
        if (importProductsBtn) importProductsBtn.addEventListener('click', () => this.showImportModal());
        
        const importJsonBtn = document.getElementById('importJsonBtn');
        if (importJsonBtn) importJsonBtn.addEventListener('click', () => this.importJsonData());
        
        const loadSampleDataBtn = document.getElementById('loadSampleDataBtn');
        if (loadSampleDataBtn) loadSampleDataBtn.addEventListener('click', () => this.loadSampleData());
        
        // Checkout
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) checkoutBtn.addEventListener('click', () => this.showCheckout());
        
        const checkoutForm = document.getElementById('checkoutForm');
        if (checkoutForm) checkoutForm.addEventListener('submit', (e) => this.handleCheckout(e));
        
        const cancelCheckoutBtn = document.getElementById('cancelCheckoutBtn');
        if (cancelCheckoutBtn) cancelCheckoutBtn.addEventListener('click', () => this.closeModal('checkoutModal'));
        
        // Modals
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.closeModal(modal.id);
            });
        });
        
        // Search and filter
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) categoryFilter.addEventListener('change', (e) => this.handleCategoryFilter(e.target.value));
        
        const sortFilter = document.getElementById('sortFilter');
        if (sortFilter) sortFilter.addEventListener('change', (e) => this.handleSort(e.target.value));
        
        // Hero buttons
        const startShoppingBtn = document.getElementById('startShoppingBtn');
        if (startShoppingBtn) startShoppingBtn.addEventListener('click', () => this.showSection('products'));
        
        const startSellingBtn = document.getElementById('startSellingBtn');
        if (startSellingBtn) startSellingBtn.addEventListener('click', () => this.switchToVendorMode());
        
        // Add to cart buttons (delegated event handling)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
                e.preventDefault();
                e.stopPropagation();
                const btn = e.target.classList.contains('add-to-cart-btn') ? e.target : e.target.closest('.add-to-cart-btn');
                const productId = parseInt(btn.getAttribute('data-product-id'));
                this.addToCart(productId);
            }
            
            if (e.target.classList.contains('modal-add-to-cart-btn') || e.target.closest('.modal-add-to-cart-btn')) {
                e.preventDefault();
                e.stopPropagation();
                const btn = e.target.classList.contains('modal-add-to-cart-btn') ? e.target : e.target.closest('.modal-add-to-cart-btn');
                const productId = parseInt(btn.getAttribute('data-product-id'));
                this.addToCart(productId);
                document.getElementById('productModal').classList.remove('show');
            }
            
            if (e.target.closest('.product-card') && !e.target.closest('.add-to-cart-btn')) {
                const productCard = e.target.closest('.product-card');
                const productId = parseInt(productCard.getAttribute('data-product-id'));
                if (productId) {
                    this.showProductDetails(productId);
                }
            }
        });
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the selected section
        const targetSection = document.getElementById(sectionName + 'Section');
        if (targetSection) {
            targetSection.classList.add('active');
        } else {
            console.error(`Section ${sectionName}Section not found`);
            return;
        }

        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Find and activate the corresponding nav link
        const navLink = document.getElementById(sectionName + 'Link') || 
                       document.querySelector(`[data-section="${sectionName}"]`);
        if (navLink) {
            navLink.classList.add('active');
        }

        // Handle section-specific logic
        if (sectionName === 'cart') {
            this.renderCart();
        } else if (sectionName === 'orders') {
            this.renderOrders();
        } else if (sectionName === 'vendor') {
            this.renderVendorProducts();
            this.renderVendorOrders();
            this.updateVendorStats();
        } else if (sectionName === 'products') {
            this.renderProducts();
        } else if (sectionName === 'home') {
            this.initHeroAnimations();
        }
    }

    switchToUserMode() {
        this.userRole = 'user';
        this.currentUser = {
            role: 'user',
            name: 'Customer User',
            loginTime: new Date().toISOString()
        };
        
        // Save login state
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        localStorage.setItem('userRole', 'user');
        
        // Update UI
        this.updateUIForRole('user');
        
        // Show products section
        this.showSection('products');
        this.showMessage('Switched to Customer mode', 'success');
    }

    switchToVendorMode() {
        this.userRole = 'vendor';
        this.currentUser = {
            role: 'vendor',
            name: 'Vendor User',
            loginTime: new Date().toISOString()
        };
        
        // Save login state
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        localStorage.setItem('userRole', 'vendor');
        
        // Update UI
        this.updateUIForRole('vendor');
        
        // Show vendor section
        this.showSection('vendor');
        this.showMessage('Switched to Vendor mode', 'success');
    }

    // Product Methods
    renderProducts(productsToRender = this.products) {
        const grid = document.getElementById('productsGrid');
        
        if (productsToRender.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <i class="fas fa-box-open"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = productsToRender.map(product => `
            <div class="product-card" data-product-id="${product.id}">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">₹${product.price.toFixed(2)}</div>
                    <span class="product-category">${product.category}</span>
                    <div class="product-actions">
                        <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    filterProducts() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const category = document.getElementById('categoryFilter').value;
        const sortBy = document.getElementById('sortFilter').value;

        let filtered = this.products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm) || 
                                 product.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !category || product.category === category;
            return matchesSearch && matchesCategory;
        });

        // Sort products
        filtered.sort((a, b) => {
            switch(sortBy) {
                case 'name':
                    return a.title.localeCompare(b.title);
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                default:
                    return 0;
            }
        });

        this.renderProducts(filtered);
    }

    showProductDetails(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.getElementById('productModal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = `
            <div style="text-align: center;">
                <img src="${product.image}" alt="${product.title}" style="width: 100%; max-width: 400px; border-radius: 10px; margin-bottom: 1rem;">
                <h3>${product.title}</h3>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Price:</strong> ₹${product.price.toFixed(2)}</p>
                <p><strong>Stock:</strong> ${product.stock} units</p>
                <p><strong>Vendor:</strong> ${product.vendor}</p>
                <p>${product.description}</p>
                <button class="btn btn-primary modal-add-to-cart-btn" data-product-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        
        modal.classList.add('show');
    }

    // Cart Methods
    addToCart(productId) {
        console.log('Adding to cart:', productId);
        const product = this.products.find(p => p.id === productId);
        if (!product) {
            console.error('Product not found:', productId);
            return;
        }

        console.log('Product found:', product);

        if (product.stock === 0) {
            this.showMessage('Product is out of stock', 'error');
            return;
        }

        const existingItem = this.cart.find(item => item.productId === productId);
        
        if (existingItem) {
            if (existingItem.quantity >= product.stock) {
                this.showMessage('Cannot add more items than available stock', 'error');
                return;
            }
            existingItem.quantity++;
        } else {
            this.cart.push({
                productId: productId,
                quantity: 1
            });
        }

        console.log('Cart updated:', this.cart);
        this.saveData();
        this.updateCartCount();
        this.showMessage('Product added to cart', 'success');
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.productId !== productId);
        this.saveData();
        this.updateCartCount();
        this.renderCart();
    }

    updateCartQuantity(productId, change) {
        const item = this.cart.find(item => item.productId === productId);
        const product = this.products.find(p => p.id === productId);
        
        if (!item || !product) return;

        const newQuantity = item.quantity + change;
        
        if (newQuantity <= 0) {
            this.removeFromCart(productId);
        } else if (newQuantity <= product.stock) {
            item.quantity = newQuantity;
            this.saveData();
            this.renderCart();
            this.updateCartCount();
        } else {
            this.showMessage('Cannot exceed available stock', 'error');
        }
    }

    updateCartCount() {
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        console.log('Updating cart count to:', count);
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            cartCountElement.textContent = count;
            console.log('Cart count updated successfully');
        } else {
            console.error('Cart count element not found');
        }
    }

    renderCart() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Start shopping to add items to your cart</p>
                    <button class="btn btn-primary" onclick="platform.showSection('products')">Browse Products</button>
                </div>
            `;
            cartTotal.textContent = '0.00';
            return;
        }

        let total = 0;
        cartItems.innerHTML = this.cart.map(item => {
            const product = this.products.find(p => p.id === item.productId);
            if (!product) return '';

            const itemTotal = product.price * item.quantity;
            total += itemTotal;

            return `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.title}" class="cart-item-image">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${product.title}</h4>
                        <div class="cart-item-price">₹${product.price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="platform.updateCartQuantity(${product.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="platform.updateCartQuantity(${product.id}, 1)">+</button>
                            <button class="btn btn-danger" onclick="platform.removeFromCart(${product.id})" style="margin-left: 1rem;">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <strong>₹${itemTotal.toFixed(2)}</strong>
                    </div>
                </div>
            `;
        }).join('');

        cartTotal.textContent = total.toFixed(2);
    }

    // Checkout Methods
    showCheckout() {
        if (this.cart.length === 0) {
            this.showMessage('Your cart is empty', 'error');
            return;
        }

        const modal = document.getElementById('checkoutModal');
        const checkoutItems = document.getElementById('checkoutItems');
        const checkoutTotal = document.getElementById('checkoutTotal');

        let total = 0;
        checkoutItems.innerHTML = this.cart.map(item => {
            const product = this.products.find(p => p.id === item.productId);
            if (!product) return '';

            const itemTotal = product.price * item.quantity;
            total += itemTotal;

            return `
                <div class="checkout-item">
                    <span>${product.title} x ${item.quantity}</span>
                    <span>₹${itemTotal.toFixed(2)}</span>
                </div>
            `;
        }).join('');

        checkoutTotal.textContent = total.toFixed(2);
        modal.classList.add('show');
    }

    closeCheckout() {
        document.getElementById('checkoutModal').classList.remove('show');
    }

    handleCheckout(e) {
        e.preventDefault();

        const customerName = document.getElementById('customerName').value;
        const customerEmail = document.getElementById('customerEmail').value;
        const customerAddress = document.getElementById('customerAddress').value;

        const orderId = 'ORD' + Date.now();
        const orderDate = new Date().toISOString();
        const estimatedDays = Math.floor(Math.random() * 3) + 4; // 4-6 days
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + estimatedDays);

        let total = 0;
        const orderItems = this.cart.map(item => {
            const product = this.products.find(p => p.id === item.productId);
            const itemTotal = product.price * item.quantity;
            total += itemTotal;

            // Update stock
            product.stock -= item.quantity;

            return {
                productId: item.productId,
                title: product.title,
                price: product.price,
                quantity: item.quantity,
                total: itemTotal
            };
        });

        const order = {
            id: orderId,
            date: orderDate,
            customerName,
            customerEmail,
            customerAddress,
            items: orderItems,
            total: total,
            status: 'processing',
            estimatedDelivery: estimatedDays + '-' + (estimatedDays + 1) + ' days',
            deliveryDate: deliveryDate.toLocaleDateString()
        };

        this.orders.push(order);
        this.vendorOrders.push(order);

        // Clear cart
        this.cart = [];

        this.saveData();
        this.closeCheckout();
        this.showSection('orders');
        this.updateCartCount();
        
        // Show order confirmation popup
        this.showOrderConfirmation(order);

        // Reset form
        document.getElementById('checkoutForm').reset();
    }

    showOrderConfirmation(order) {
        const estimatedDays = Math.floor(Math.random() * 3) + 4; // 4-6 days
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + estimatedDays);
        
        const confirmationHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center;">
                <div style="background: white; padding: 2rem; border-radius: 10px; max-width: 500px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                    <div style="color: #28a745; font-size: 3rem; margin-bottom: 1rem;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2 style="color: #2c3e50; margin-bottom: 1rem;">Order Placed Successfully!</h2>
                    <div style="background: #f8f9fa; padding: 1rem; border-radius: 5px; margin-bottom: 1rem; text-align: left;">
                        <p><strong>Order ID:</strong> ${order.id}</p>
                        <p><strong>Order Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
                        <p><strong>Total Amount:</strong> ₹${order.total.toFixed(2)}</p>
                        <p><strong>Estimated Delivery:</strong> ${estimatedDays}-${estimatedDays + 1} days</p>
                        <p><strong>Delivery by:</strong> ${deliveryDate.toLocaleDateString()}</p>
                    </div>
                    <div style="color: #6c757d; margin-bottom: 1.5rem;">
                        <p>Your order has been confirmed and will be delivered to your shipping address.</p>
                        <p>You will receive a confirmation email shortly.</p>
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" style="background: #007bff; color: white; border: none; padding: 0.75rem 2rem; border-radius: 5px; cursor: pointer; font-size: 1rem;">
                        OK
                    </button>
                </div>
            </div>
        `;
        
        const confirmationDiv = document.createElement('div');
        confirmationDiv.innerHTML = confirmationHTML;
        document.body.appendChild(confirmationDiv);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (confirmationDiv.firstChild) {
                confirmationDiv.remove();
            }
        }, 10000);
    }

    // Order Methods
    renderOrders() {
        const ordersList = document.getElementById('ordersList');

        if (this.orders.length === 0) {
            ordersList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-receipt"></i>
                    <h3>No orders yet</h3>
                    <p>Start shopping to place your first order</p>
                </div>
            `;
            return;
        }

        ordersList.innerHTML = this.orders.sort((a, b) => new Date(b.date) - new Date(a.date)).map(order => `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <div class="order-id">Order ID: ${order.id}</div>
                        <div class="order-date">${new Date(order.date).toLocaleDateString()}</div>
                        ${order.estimatedDelivery ? `<div class="order-delivery"><strong>Estimated Delivery:</strong> ${order.estimatedDelivery}</div>` : ''}
                        ${order.deliveryDate ? `<div class="order-delivery-date"><strong>Delivery by:</strong> ${order.deliveryDate}</div>` : ''}
                    </div>
                    <span class="order-status ${order.status === 'delivered' ? 'status-delivered' : 'status-processing'}">
                        ${order.status === 'processing' ? '📦 Processing' : '✅ Delivered'}
                    </span>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <span>${item.title} x ${item.quantity}</span>
                            <span>₹${item.total.toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">
                    Total: ₹${order.total.toFixed(2)}
                </div>
            </div>
        `).join('');
    }

    // Vendor Methods
    renderVendorProducts() {
        const grid = document.getElementById('vendorProductsGrid');
        
        if (this.products.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <i class="fas fa-box"></i>
                    <h3>No products yet</h3>
                    <p>Add your first product to start selling</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">₹${product.price.toFixed(2)}</div>
                    <span class="product-category">${product.category}</span>
                    <div style="margin: 0.5rem 0;">
                        <small>Stock: ${product.stock} units</small>
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-outline" onclick="platform.editProduct(${product.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger" onclick="platform.deleteProduct(${product.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderVendorOrders() {
        const ordersList = document.getElementById('vendorOrdersList');

        if (this.vendorOrders.length === 0) {
            ordersList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-receipt"></i>
                    <h3>No orders yet</h3>
                    <p>Orders will appear here when customers make purchases</p>
                </div>
            `;
            return;
        }

        ordersList.innerHTML = this.vendorOrders.sort((a, b) => new Date(b.date) - new Date(a.date)).map(order => `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <div class="order-id">Order ID: ${order.id}</div>
                        <div class="order-date">${new Date(order.date).toLocaleDateString()}</div>
                        <div><strong>Customer:</strong> ${order.customerName}</div>
                    </div>
                    <span class="order-status ${order.status === 'delivered' ? 'status-delivered' : 'status-processing'}">
                        ${order.status}
                    </span>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <span>${item.title} x ${item.quantity}</span>
                            <span>₹${item.total.toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">
                    Total: ₹${order.total.toFixed(2)}
                </div>
            </div>
        `).join('');
    }

    updateVendorStats() {
        const totalProducts = this.products.length;
        const totalSales = this.vendorOrders.reduce((total, order) => total + order.total, 0);
        const totalOrders = this.vendorOrders.length;

        document.getElementById('totalProducts').textContent = totalProducts;
        document.getElementById('totalSales').textContent = `₹${totalSales.toFixed(2)}`;
        document.getElementById('totalOrders').textContent = totalOrders;
    }

    showProductForm(product = null) {
        const modal = document.getElementById('productFormModal');
        const form = document.getElementById('productForm');
        const title = document.getElementById('formModalTitle');

        if (product) {
            title.textContent = 'Edit Product';
            document.getElementById('productTitle').value = product.title;
            document.getElementById('productDescription').value = product.description;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productImage').value = product.image;
            document.getElementById('productStock').value = product.stock;
            form.dataset.editId = product.id;
        } else {
            title.textContent = 'Add New Product';
            form.reset();
            delete form.dataset.editId;
        }

        modal.classList.add('show');
    }

    closeProductForm() {
        document.getElementById('productFormModal').classList.remove('show');
    }

    handleProductSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const editId = form.dataset.editId;
        const productData = {
            title: document.getElementById('productTitle').value,
            description: document.getElementById('productDescription').value,
            price: parseFloat(document.getElementById('productPrice').value),
            category: document.getElementById('productCategory').value,
            image: document.getElementById('productImage').value || `https://picsum.photos/seed/${Date.now()}/400/300`,
            stock: parseInt(document.getElementById('productStock').value),
            vendor: 'Your Store'
        };

        if (editId) {
            // Edit existing product
            const index = this.products.findIndex(p => p.id == editId);
            if (index !== -1) {
                this.products[index] = { ...this.products[index], ...productData };
                this.showMessage('Product updated successfully', 'success');
            }
        } else {
            // Add new product
            const newProduct = {
                id: Date.now(),
                ...productData
            };
            this.products.push(newProduct);
            this.showMessage('Product added successfully', 'success');
        }

        this.saveData();
        this.closeProductForm();
        this.renderVendorProducts();
        this.renderProducts();
        this.updateVendorStats();
    }

    editProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            this.showProductForm(product);
        }
    }

    deleteProduct(productId) {
        if (confirm('Are you sure you want to delete this product?')) {
            this.products = this.products.filter(p => p.id !== productId);
            this.saveData();
            this.renderVendorProducts();
            this.renderProducts();
            this.updateVendorStats();
            this.showMessage('Product deleted successfully', 'success');
        }
    }

    // Utility Methods
    showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '20px';
        messageDiv.style.right = '20px';
        messageDiv.style.zIndex = '9999';
        messageDiv.style.maxWidth = '300px';

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

// Initialize the platform when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.platform = new ECommercePlatform();
});
