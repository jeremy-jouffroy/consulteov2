// Consulteo Components and Shared Functionality

// Cart Management
class CartManager {
  constructor() {
    this.cart = this.loadCart();
  }

  loadCart() {
    const saved = localStorage.getItem('consulteo_cart');
    return saved ? JSON.parse(saved) : [];
  }

  saveCart() {
    localStorage.setItem('consulteo_cart', JSON.stringify(this.cart));
    this.updateCartCount();
  }

  addToCart(ean, quantity = 1) {
    const existingItem = this.cart.find(item => item.ean === ean);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ ean, quantity });
    }
    this.saveCart();
    return true;
  }

  removeFromCart(ean) {
    this.cart = this.cart.filter(item => item.ean !== ean);
    this.saveCart();
  }

  updateQuantity(ean, quantity) {
    const item = this.cart.find(item => item.ean === ean);
    if (item) {
      item.quantity = quantity;
      if (quantity <= 0) {
        this.removeFromCart(ean);
      } else {
        this.saveCart();
      }
    }
  }

  getCart() {
    return this.cart;
  }

  getCartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
      const count = this.getCartCount();
      cartCountElement.textContent = count;
      cartCountElement.style.display = count > 0 ? 'inline-block' : 'none';
    }
  }

  getCartTotal() {
    let total = 0;
    this.cart.forEach(item => {
      const product = consulteoData.getProductById(item.ean);
      if (product) {
        total += product.price * item.quantity;
      }
    });
    return total;
  }
}

// User Management
class UserManager {
  constructor() {
    this.user = this.loadUser();
  }

  loadUser() {
    const saved = localStorage.getItem('consulteo_user');
    return saved ? JSON.parse(saved) : null;
  }

  saveUser(userData) {
    this.user = userData;
    localStorage.setItem('consulteo_user', JSON.stringify(userData));
  }

  isLoggedIn() {
    return this.user !== null;
  }

  getUser() {
    return this.user;
  }

  logout() {
    this.user = null;
    localStorage.removeItem('consulteo_user');
  }
}

// Global instances
const cartManager = new CartManager();
const userManager = new UserManager();

// Header Component
function createHeader() {
  const cartCount = cartManager.getCartCount();
  const isLoggedIn = userManager.isLoggedIn();
  
  return `
    <header class="header">
      <div class="header-container">
        <a href="index.html" class="logo">Consulteo</a>
        
        <nav>
          <ul class="nav-categories">
            <li><a href="managers.html">Managers</a></li>
            <li><a href="lead.html">Lead</a></li>
            <li><a href="consultant.html">Consultant</a></li>
            <li><a href="interns.html">Interns</a></li>
          </ul>
        </nav>
        
        <div class="header-actions">
          <a href="${isLoggedIn ? 'account.html' : 'account-creation.html'}" class="btn-account">
            ${isLoggedIn ? 'My Account' : 'Account'}
          </a>
          <a href="checkout.html" class="btn-cart">
            Cart
            <span class="cart-count" style="display: ${cartCount > 0 ? 'inline-block' : 'none'}">${cartCount}</span>
          </a>
        </div>
      </div>
    </header>
  `;
}

// Footer Component
function createFooter() {
  return `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-links">
          <a href="#cgv">CGV</a>
          <a href="#privacy">Privacy</a>
          <a href="#cookies">Cookie Policy</a>
          <a href="#blog">Blog</a>
        </div>
        <p>&copy; 2025 Consulteo. Training platform by Converteo.</p>
      </div>
    </footer>
  `;
}

// Initialize page components
function initializePage() {
  // Insert header
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = createHeader();
  }

  // Insert footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = createFooter();
  }

  // Update cart count
  cartManager.updateCartCount();
}

// Product rendering functions
function createProductCard(product, showPrice = true) {
  return `
    <div class="product-card">
      <img src="${product.image}" alt="${product.firstName} ${product.lastName}" class="product-image">
      <h3 class="product-title">${product.firstName} ${product.lastName}</h3>
      <p class="product-description">${product.shortDescription}</p>
      ${showPrice ? `<div class="product-price">€${product.price}/day</div>` : ''}
      <a href="product.html?id=${product.id}" class="btn-view-profile">View Profile</a>
    </div>
  `;
}

function renderProductGrid(products, containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = products.map(product => createProductCard(product)).join('');
  }
}

// Category page initialization
function initializeCategoryPage(category) {
  const products = consulteoData.getProductsByCategory(category);
  const categoryTitle = consulteoData.categories[category];
  
  // Set page title
  document.title = `${categoryTitle} - Consulteo`;
  
  // Set category header
  const categoryHeader = document.querySelector('.category-title');
  if (categoryHeader) {
    categoryHeader.textContent = categoryTitle;
  }
  
  // Render products
  renderProductGrid(products, 'products-grid');
}

// Product detail page initialization
function initializeProductPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  if (!productId) {
    window.location.href = 'index.html';
    return;
  }
  
  const product = consulteoData.getProductById(productId);
  if (!product) {
    window.location.href = 'index.html';
    return;
  }
  
  // Set page title
  document.title = `${product.firstName} ${product.lastName} - Consulteo`;
  
  // Populate product details
  document.getElementById('product-image').src = product.image;
  document.getElementById('product-image').alt = `${product.firstName} ${product.lastName}`;
  document.getElementById('product-name').textContent = `${product.firstName} ${product.lastName}`;
  document.getElementById('product-short-description').textContent = product.shortDescription;
  document.getElementById('product-ean').textContent = product.ean;
  document.getElementById('product-sku').textContent = product.sku;
  document.getElementById('product-price').textContent = `€${product.price}`;
  document.getElementById('product-long-description').textContent = product.longDescription;
  
  // Render skills
  const skillsContainer = document.getElementById('product-skills');
  if (skillsContainer && product.skills) {
    skillsContainer.innerHTML = product.skills.map(skill => 
      `<span class="skill-tag">${skill}</span>`
    ).join('');
  }
  
  // Set up add to cart functionality
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.onclick = () => addProductToCart(product.ean);
  }
  
  // Render related products
  const relatedProducts = consulteoData.getRandomProducts(3, productId);
  renderProductGrid(relatedProducts, 'related-products-grid');
}

// Add product to cart functionality
function addProductToCart(ean) {
  const success = cartManager.addToCart(ean, 1);
  if (success) {
    showAlert('Product added to cart!', 'success');
    cartManager.updateCartCount();
  } else {
    showAlert('Error adding product to cart', 'error');
  }
}

// Homepage initialization
function initializeHomepage() {
  const topPicks = consulteoData.getTopPicks();
  renderProductGrid(topPicks, 'top-picks-grid');
}

// Checkout page initialization
function initializeCheckoutPage() {
  const cart = cartManager.getCart();
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalElement.textContent = '€0';
    return;
  }
  
  let cartHTML = '';
  let total = 0;
  
  cart.forEach(item => {
    const product = consulteoData.getProductById(item.ean);
    if (product) {
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      
      cartHTML += `
        <div class="cart-item">
          <div>
            <h4>${product.firstName} ${product.lastName}</h4>
            <p>EAN: ${product.ean}</p>
            <p>Quantity: ${item.quantity}</p>
          </div>
          <div class="item-total">€${itemTotal}</div>
        </div>
      `;
    }
  });
  
  cartItemsContainer.innerHTML = cartHTML;
  cartTotalElement.textContent = `€${total}`;
  
  // Set up form submission
  const orderForm = document.getElementById('order-form');
  if (orderForm) {
    orderForm.onsubmit = handleOrderSubmission;
  }
}

// Handle order submission
function handleOrderSubmission(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const orderData = {
    cart: cartManager.getCart(),
    total: cartManager.getCartTotal(),
    customer: {
      email: formData.get('email'),
      password: formData.get('password')
    },
    delivery: {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      address: formData.get('address'),
      city: formData.get('city'),
      postalCode: formData.get('postalCode'),
      phone: formData.get('phone')
    },
    shipping: formData.get('shipping'),
    payment: formData.get('payment'),
    orderNumber: generateOrderNumber()
  };
  
  // Calculate shipping cost
  let shippingCost = 0;
  if (orderData.shipping === 'office') {
    shippingCost = 100;
  }
  
  orderData.finalTotal = orderData.total + shippingCost;
  
  // Save order data for confirmation page
  localStorage.setItem('consulteo_last_order', JSON.stringify(orderData));
  
  // Clear cart
  cartManager.clearCart();
  
  // Redirect to confirmation
  window.location.href = 'confirmation.html';
}

// Generate random order number
function generateOrderNumber() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Confirmation page initialization
function initializeConfirmationPage() {
  const orderData = JSON.parse(localStorage.getItem('consulteo_last_order'));
  
  if (!orderData) {
    window.location.href = 'index.html';
    return;
  }
  
  document.getElementById('order-number').textContent = orderData.orderNumber;
  document.getElementById('order-total').textContent = `€${orderData.finalTotal}`;
  
  // Display order items
  const orderItemsContainer = document.getElementById('order-items');
  let itemsHTML = '';
  
  orderData.cart.forEach(item => {
    const product = consulteoData.getProductById(item.ean);
    if (product) {
      itemsHTML += `
        <div class="cart-item">
          <div>
            <h4>${product.firstName} ${product.lastName}</h4>
            <p>Quantity: ${item.quantity}</p>
          </div>
          <div>€${product.price * item.quantity}</div>
        </div>
      `;
    }
  });
  
  orderItemsContainer.innerHTML = itemsHTML;
  
  // Clean up order data
  localStorage.removeItem('consulteo_last_order');
}

// Account creation functionality
function initializeAccountCreation() {
  const accountForm = document.getElementById('account-form');
  if (accountForm) {
    accountForm.onsubmit = handleAccountCreation;
  }
}

function handleAccountCreation(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const userData = {
    email: formData.get('email'),
    phone: formData.get('phone'),
    password: formData.get('password'),
    createdAt: new Date().toISOString()
  };
  
  userManager.saveUser(userData);
  showAlert('Account created successfully!', 'success');
  
  // Redirect after a short delay
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 2000);
}

// Utility functions
function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;
  
  // Insert at top of main content
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.insertBefore(alertDiv, mainContent.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
      alertDiv.remove();
    }, 5000);
  }
}

function formatPrice(price) {
  return `€${price.toLocaleString()}`;
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);
