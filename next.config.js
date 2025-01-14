/** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: true,
// };

const withPWA = require('next-pwa')

module.exports = withPWA({
    swcMinify: true,
    pwa: {
        dest: 'public',
        disable: process.env.NODE_ENV === 'development'
    },
    compiler: {
        // removeConsole: true,
    }
})
