/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: { ...getAllowedEnvVariables() },
}

module.exports = nextConfig

function getAllowedEnvVariables() {
  return Object.entries(process.env).reduce(
    (vars, [name, value]) =>
      /^(?:__|NODE_)/.test(name) ? vars : { ...vars, [name]: value },
    {}
  )
}
