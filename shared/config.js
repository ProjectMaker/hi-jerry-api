module.exports = {
  jwtKey: process.env.JWT_KEY || "hi-jerry",
  mongo: {
    user: process.env.MONGO_USER || "dev",
    password: process.env.MONGO_PASSWORD || "Rudeboy77"
  },
  port: process.env.PORT || 8080
};