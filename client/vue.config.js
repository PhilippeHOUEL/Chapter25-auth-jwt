// Gestion du proxy entre le serveur et le client
module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: "http://localhost:3000"
  },
  outputDir: "../client-build"
};
