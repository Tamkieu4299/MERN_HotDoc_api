const customerController = require("../controllers/customerController");
const router = require("express").Router();

// Register a customer
router.post("/register", customerController.registerCustomer)
// Login with customer
// router.post("/login", customerController.loginCustomer);
// Update a customer
router.put("/:id", customerController.updateCustomer);
// Get a customer
router.get("/", customerController.getCustomer);

module.exports = router;