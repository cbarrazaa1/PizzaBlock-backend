exports.DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost/backend-pizzablock";
exports.PORT = process.env.PORT || 8080;
exports.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
exports.STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;