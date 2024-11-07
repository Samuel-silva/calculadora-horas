/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: "/calculadora-horas",
  output: "export",
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
