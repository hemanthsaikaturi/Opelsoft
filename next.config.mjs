/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  // Keep nodemailer out of the server bundle so it's required from real
  // node_modules at runtime.
  serverExternalPackages: ['nodemailer'],
};

export default nextConfig;
