/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ACCESS_KEY: process.env.ACCESS_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
    USER_POOL_ID: process.env.USER_POOL_ID,
    CLIENT_ID: process.env.CLIENT_ID,
    TEST: process.env.TEST,
  }
}

module.exports = nextConfig
