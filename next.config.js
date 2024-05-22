/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/tabela-fipe",
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
