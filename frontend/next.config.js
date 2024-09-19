module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://tgk2bg9p32.execute-api.us-east-1.amazonaws.com/prod/:path*', // Replace with your API endpoint
        },
      ];
    },
  };