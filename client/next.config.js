/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: "http://localhost:5000",
    IMAGE_URL: "http://localhost:5000/api/user/profile-image",
  },
};
