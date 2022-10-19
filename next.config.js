module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://3.110.93.64:3000/:path*',
          },
        ]
      },
};