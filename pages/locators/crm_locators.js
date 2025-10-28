module.exports = {
  loginIdInput: 'input[name="loginId"]',
  passwordInput: 'input[name="password"]',
  loginButton: 'button:has-text("Login")',
  searchInput : 'input[placeholder="Search"]',
  ordersView : '#orders',
  orderIdHeader: 'th:has-text("Order ID")',
  orderIdCell: (orderId) => `td div:text("${orderId}")`, 
    
};  
