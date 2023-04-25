// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/imgs/favicon.ico",
      },
    ];
  },
};
