/** @type {import('next').NextConfig} */

const nextConfig = {};

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

module.exports =
  process.env.NODE_ENV === "development" ? nextConfig : withPWA(nextConfig);
