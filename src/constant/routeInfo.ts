export const routesJson = {
  message: "Welcome to the API! Here are the available routes:",
  userRoutes: {
    createUser: "/api/user (POST)",
    getUserById: "/api/user/:id (GET)",
    updateUser: "/api/user/:id (PUT)",
    deleteUser: "/api/user/:id (DELETE)",
    getAllUsers: "/api/users (GET)",
  },
  productRoutes: {
    createProduct: "/api/product (POST)",
    getProductById: "/api/product/:id (GET)",
    updateProduct: "/api/product/:id (PUT)",
    deleteProduct: "/api/product/:id (DELETE)",
    getAllProducts: "/api/products (GET)",
    getTotalStock: "/api/products/stock (GET)",
    getUsersByProductId: "/api/product/users/:id (GET)",
  },
  orderRoutes: {
    createOrder: "/api/order (POST)",
    getOrderById: "/api/order/:id (GET)",
    updateOrder: "/api/order/:id (PUT)",
    deleteOrder: "/api/order/:id (DELETE)",
    getAllOrders: "/api/orders (GET)",
    getOrdersByUser: "/api/orders/users/:id (GET)",
    getLastSevenOrders: "/api/orders/lastOrders (GET)",
  },
};
