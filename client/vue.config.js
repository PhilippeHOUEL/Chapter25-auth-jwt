// Gestion du proxy entre le serveur et le client
module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: "http://localhost:3000"
  },
  // définir le dossier d'éxécution du build
  outputDir: "../client-build"
};
