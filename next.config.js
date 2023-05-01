// next.config.js
module.exports = {
  async rewrites() {
    return {
      fallback: [
        {
          source: "/favicon.ico",
          destination: "/imgs/favicon.ico",
        },
      ],
    };
  },
};
