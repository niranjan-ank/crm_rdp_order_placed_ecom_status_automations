module.exports = {
  // Login Page
  loginIdInput: 'input[name="loginId"]',
  passwordInput: 'input[name="password"]',
  loginButton: 'button:has-text("Login")',

  // Dashboard / Orders Page
  searchInput: 'input[placeholder="Search"]',
  ordersView: '#orders',
  orderIdHeader: 'th:has-text("Order ID")',
  orderIdCell: (orderId) => `td div:text("${orderId}")`,

  // Change Status Flow
  changeStatusButton: 'button:has-text("Change Status")',
  statusDropdown: '.\\!min-h-\\[24px\\].\\!px-4.\\!w-full',
  pendingOption: 'role=option[name="PENDING"]',
  acceptedOption: 'role=option[name="ACCEPTED"]',
  pickerAssignedOption: 'role=option[name="PICKER ASSIGNED"]',
  pickingPackingOption: 'role=option[name="PICKING & PACKING"]',
  pickingCompletedOption: 'role=option[name="PICKING COMPLETED"]',
  readyForDeliveryOption: 'role=option[name="READY FOR DELIVERY"]',
  deliveryAssignedOption: 'role=option[name="DELIVERY ASSIGNED"]',
  inTransitOption: 'role=option[name="IN-TRANSIT"]',
  deliveredOption: 'role=option[name="DELIVERED"]',
  confirmButton: 'button:has-text("Confirm")',
  updateButton: 'button:has-text("Update")',
};
