
const config = {
  env: process.env.NODE_ENV || 'development',
  base_url: process.env.REACT_APP_BASE_URL || 'http://localhost:3000',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "knX0kNATQUn8ELhg9J_vUL4OOsI",
  mongoUri: process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' +
    (process.env.MONGO_PORT || '27017') +
    '/TDT_db' || process.env.DB_NAME,
  epayco_public_key: process.env.REACT_APP_EPAYCO_PUBLIC_KEY || '8fa70fda940c9a64645bac249727cc04',
}

export default config
