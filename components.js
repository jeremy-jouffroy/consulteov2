// Consulteo Components and Shared Functionality

// Initialize dataLayer if not exists
window.dataLayer = window.dataLayer || [];

// Analytics Helper Functions
class AnalyticsManager {
  constructor() {
    this.country = 'fr';
    this.language = 'fr-fr';
  }

// Utility functions

  // Hash email function (simple hash for demo purposes)
  hashEmail(email) {
    if (!email) return null;
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  }

  // Get user login status and email
  getUserData() {
    const user = userManager.getUser();
    return {
      user_logged_in: !!user,
      email: user ? this.hashEmail(user.email) : null
    };
  }

  // Convert product to GA4 item format
  productToItem(product, quantity = 1) {
    return {
      item_id: product.id,
      item_name: `${product.firstName} ${product.lastName}`,
      category: consulteoData.categories[product.category],
      quantity: quantity,
      price: product.price,
      item_brand: 'Consulteo',
      item_category: consulteoData.categories[product.category],
      item_variant: product.sku
    };
  }

  // Push page data ready event
  pushPageDataReady(pageName, pageCategory, additionalData = {}) {
    const userData = this.getUserData();
    
    window.dataLayer.push({
      event: 'page_data_ready',
      country: this.country,
      language: this.language,
      page_name: pageName,
      page_category: pageCategory,
      user_logged_in: userData.user_logged_in,
      email: userData.email,
      ...additionalData
    });
  }

  // Push view_item_list event
  pushViewItemList(itemListName, items) {
    const userData = this.getUserData();
    
    window.dataLayer.push({
      event: 'view_item_list',
      item_list_name: itemListName,
      items: items,
      country: this.country,
      language: this.language,
      user_logged_in: userData.user_logged_in,
      email: userData.email
    });
  }

  // Push view_item event
  pushViewItem(product) {
    const userData = this.getUserData();
    const item = this.productToItem(product);
    
    window.dataLayer.push({
      event: 'view_item',
      currency: 'EUR',
      value: product.price,
      items: [item],
      country: this.country,
      language: this.language,
      user_logged_in: userData.user_logged_in,
      email: userData.email
    });
  }

  // Push select_item event
  pushSelectItem(product, itemListName = '') {
    const userData = this.getUserData();
    const item = this.productToItem(product);
    
    window.dataLayer.push({
      event: 'select_item',
      item_list_name: itemListName,
      items: [item],
      country: this.country,
      language: this.language,
      user_logged_in: userData.user_logged_in,
      email: userData.email
    });
  }

  // Push add_to_cart event
  pushAddToCart(product, quantity = 1) {
    const userData = this.getUserData();
    const item = this.productToItem(product, quantity);
    
    window.dataLayer.push({
      event: 'add_to_cart',
      currency: 'EUR',
      value: product.price * quantity,
      items: [item],
      country: this.country,
      language: this.language,
      user_logged_in: userData.user_logged_in,
      email: userData.email
    });
  }

  // Push begin_checkout event
  pushBeginCheckout(cartItems, totalValue) {
    const userData = this.getUserData();
    
    window.dataLayer.push({
      event: 'begin_checkout',
      currency: 'EUR',
      value: totalValue,
      items: cartItems,
      country: this.country,
      language: this.language,
      user_logged_in: userData.user_logged_in,
      email: userData.email
    });
  }

  // Push purchase event
  pushPurchase(orderData) {
    const userData = this.getUserData();
    
    window.dataLayer.push({
      event: 'purchase',
      transaction_id: orderData.orderNumber,
      value: orderData.finalTotal,
      currency: 'EUR',
      items: orderData.cart.map(cartItem => {
        const product = consulteoData.getProductById(cartItem.productId);
        return this.productToItem(product, cartItem.quantity);
      }),
      country: this.country,
      language: this.language,
      user_logged_in: userData.user_logged_in,
      email: userData.email
    });
  }

  // Push sign_up event
  pushSignUp(method = 'email') {
    const userData = this.getUserData();
    
    window.dataLayer.push({
      event: 'sign_up',
      method: method,
      country: this.country,
      language: this.language,
      user_logged_in: userData.user_logged_in,
      email: userData.email
    });
  }

  // Push view_cart event
  pushViewCart(cartItems, totalValue) {
    const userData = this.getUserData();
    
    window.dataLayer.push({
      event: 'view_cart',
      currency: 'EUR',
      value: totalValue,
      items: cartItems,
      country: this.country,
      language: this.language,
      user_logged_in: userData.user_logged_in,
      email: userData.email
    });
  }
}

// Global analytics instance
const analyticsManager = new AnalyticsManager();

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

  addToCart(productId, quantity = 1) {
    const existingItem = this.cart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem = { productId, quantity };
      this.cart.push(newItem);
    }
    
    this.saveCart();
    return true;
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.productId !== productId);
    this.saveCart();
  }

  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      if (quantity <= 0) {
        this.removeFromCart(productId);
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
      const product = consulteoData.getProductById(item.productId);
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
          <a href="checkout.html" class="btn-cart" onclick="handleCartClick(event)">
            Cart
            <span class="cart-count" style="display: ${cartCount > 0 ? 'inline-block' : 'none'}">${cartCount}</span>
          </a>
        </div>
      </div>
    </header>
  `;
}

// Handle cart click with analytics
function handleCartClick(event) {
  const cart = cartManager.getCart();
  const cartItems = cart.map(item => {
    const product = consulteoData.getProductById(item.productId);
    return analyticsManager.productToItem(product, item.quantity);
  });
  const totalValue = cartManager.getCartTotal();
  
  analyticsManager.pushViewCart(cartItems, totalValue);
  
  // Allow normal navigation to continue
  return true;
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
function createProductCard(product, showPrice = true, itemListName = '') {
  return `
    <div class="product-card">
      <img src="${product.image}" alt="${product.firstName} ${product.lastName}" class="product-image">
      <h3 class="product-title">${product.firstName} ${product.lastName}</h3>
      <p class="product-description">${product.shortDescription}</p>
      ${showPrice ? `<div class="product-price">€${product.price}/day</div>` : ''}
      <a href="product.html?id=${product.id}" class="btn-view-profile" onclick="handleProductClick('${product.id}', '${itemListName}')">View Profile</a>
    </div>
  `;
}

// Handle product click with analytics
function handleProductClick(productId, itemListName) {
  const product = consulteoData.getProductById(productId);
  if (product) {
    analyticsManager.pushSelectItem(product, itemListName);
  }
  return true;
}

function renderProductGrid(products, containerId, itemListName = '') {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = products.map(product => createProductCard(product, true, itemListName)).join('');
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
  renderProductGrid(products, 'products-grid', `${categoryTitle} Category`);
  
  // Push analytics events
  analyticsManager.pushPageDataReady(`category ${category}`, 'PLP');
  
  // Push view_item_list event
  const items = products.map(product => analyticsManager.productToItem(product));
  analyticsManager.pushViewItemList(`${categoryTitle} Category`, items);
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
  
  // Set category if element exists
  const categoryElement = document.getElementById('product-category');
  if (categoryElement) {
    categoryElement.textContent = consulteoData.categories[product.category];
  }
  
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
    addToCartBtn.onclick = () => addProductToCart(product.id);
  }
  
  // Render related products
  const relatedProducts = consulteoData.getRandomProducts(3, productId);
  renderProductGrid(relatedProducts, 'related-products-grid', 'Related Consultants');
  
  // Push analytics events
  analyticsManager.pushPageDataReady(`product ${product.firstName} ${product.lastName}`, 'PDP');
  analyticsManager.pushViewItem(product);
}

// Add product to cart functionality
function addProductToCart(productId) {
  console.log('=== ADD TO CART DEBUG ===');
  console.log('Product ID:', productId);
  
  const product = consulteoData.getProductById(productId);
  console.log('Product found:', product);
  
  if (!product) {
    showAlert('Product not found', 'error');
    return;
  }

  console.log('Cart before add:', cartManager.getCart());
  const success = cartManager.addToCart(productId, 1);
  console.log('Add to cart success:', success);
  console.log('Cart after add:', cartManager.getCart());
  console.log('localStorage cart:', localStorage.getItem('consulteo_cart'));
  
  if (success) {
    showAlert('Product added to cart!', 'success');
    cartManager.updateCartCount();
    
    // Push analytics event
    analyticsManager.pushAddToCart(product, 1);
  } else {
    showAlert('Error adding product to cart', 'error');
  }
}

// Homepage initialization
function initializeHomepage() {
  const topPicks = consulteoData.getTopPicks();
  renderProductGrid(topPicks, 'top-picks-grid', 'Top Picks');
  
  // Push analytics events
  analyticsManager.pushPageDataReady('homepage', 'home');
  
  // Push view_item_list event for top picks
  const items = topPicks.map(product => analyticsManager.productToItem(product));
  analyticsManager.pushViewItemList('Top Picks', items);
}

// Checkout page initialization
function initializeCheckoutPage() {
  const cart = cartManager.getCart();
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalElement.textContent = '€0';
    
    // Push analytics event for empty cart
    analyticsManager.pushPageDataReady('checkout', 'checkout');
    return;
  }
  
  let cartHTML = '';
  let total = 0;
  const cartItems = [];
  
  cart.forEach(item => {
    const product = consulteoData.getProductById(item.ean);
    if (product) {
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      
      // Add to analytics items array
      cartItems.push(analyticsManager.productToItem(product, item.quantity));
      
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
  
  // Push analytics events
  analyticsManager.pushPageDataReady('checkout', 'checkout');
  analyticsManager.pushBeginCheckout(cartItems, total);
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
  
  // Push analytics events
  analyticsManager.pushPageDataReady('purchase confirmation', 'checkout');
  analyticsManager.pushPurchase(orderData);
  
  // Clean up order data
  localStorage.removeItem('consulteo_last_order');
}

// Account creation functionality
function initializeAccountCreation() {
  const accountForm = document.getElementById('account-form');
  if (accountForm) {
    accountForm.onsubmit = handleAccountCreation;
  }
  
  // Push analytics event
  analyticsManager.pushPageDataReady('account creation', 'account');
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
  
  // Push analytics event
  analyticsManager.pushSignUp('email');
  
  // Redirect after a short delay
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 2000);
}

// Account page initialization  
function initializeAccountPage() {
  const user = userManager.getUser();
  if (!user) {
    window.location.href = 'account-creation.html';
    return;
  }

  // Display user information
  const welcomeElement = document.getElementById('user-welcome');
  if (welcomeElement) {
    welcomeElement.textContent = `Welcome back! Manage your consulting projects and account settings.`;
  }

  // Load user profile
  loadUserProfile(user);
  
  // Push analytics event
  analyticsManager.pushPageDataReady('account', 'account');
}

function loadUserProfile(user) {
  const profileContainer = document.getElementById('user-profile');
  if (profileContainer) {
    profileContainer.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
        <div>
          <strong>Email:</strong><br>
          <span style="color: #666;">${user.email}</span>
        </div>
        <div>
          <strong>Phone:</strong><br>
          <span style="color: #666;">${user.phone}</span>
        </div>
        <div>
          <strong>Member Since:</strong><br>
          <span style="color: #666;">${new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    `;
  }
}
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
document.addEventListener('DOMContentLoaded', function() {
  initializePage();
  
  // Auto-detect checkout page and initialize it
  if (window.location.pathname.includes('checkout.html') || document.getElementById('cart-items')) {
    console.log('🛒 Checkout page detected, initializing...');
    setTimeout(initializeCheckoutPage, 100);
  }
});

// Working checkout initialization function
function workingCheckoutInit() {
  console.log('🚀 Working checkout init started');
  window.pageAnalyticsInitialized = true;
  
  const cart = cartManager.getCart();
  console.log('Cart retrieved:', cart);
  
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  
  if (!cartItemsContainer || !cartTotalElement) {
    console.error('DOM elements not found');
    return;
  }
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalElement.textContent = '€0';
    analyticsManager.pushPageDataReady('checkout', 'checkout');
    return;
  }
  
  let cartHTML = '';
  let total = 0;
  const cartItems = [];
  
  cart.forEach(item => {
    const product = consulteoData.products[item.productId];
    
    if (product) {
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      
      cartItems.push({
        item_id: product.ean,
        item_name: `${product.firstName} ${product.lastName}`,
        item_category: product.category,
        price: product.price,
        quantity: item.quantity
      });
      
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
  
  console.log('Updating DOM with cart:', cartItems);
  cartItemsContainer.innerHTML = cartHTML;
  cartTotalElement.textContent = `€${total}`;
  
  // Set up form submission
  const orderForm = document.getElementById('order-form');
  if (orderForm) {
    orderForm.onsubmit = handleOrderSubmission;
  }
  
  console.log('Pushing analytics...');
  analyticsManager.pushPageDataReady('checkout', 'checkout');
  analyticsManager.pushBeginCheckout(cartItems, total);
  
  console.log('✅ Working checkout init completed!');
}

// Replace the broken function
function initializeCheckoutPage() {
  workingCheckoutInit();
}

// Test function to force checkout initialization
window.forceCheckoutInit = function() {
  console.log('🔧 Forcing checkout initialization...');
  workingCheckoutInit();
};
