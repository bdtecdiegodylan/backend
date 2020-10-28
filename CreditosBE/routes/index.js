// require others
const express = require("express");

const router = express.Router();
const apiRoutes = express.Router();

// require custom routes
const TestRoutes = require("./test.route");


//default middlewares
apiRoutes.use(express.json());

// Custom Routes
apiRoutes.use("/test", TestRoutes);


// Context
router.use("/api", apiRoutes)

// Export all routes
module.exports = router;