const config = {
    ATLAS_URI: process.env.ATLAS_URI,
    APP_URL: process.env.APP_URL || "http://localhost:5050",
    PORT: process.env.PORT || 5050,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY

  };
  
  module.exports = config;