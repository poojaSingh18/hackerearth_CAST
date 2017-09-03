var config = {
   entry: __dirname+'/app.jsx',
   output: {
      filename: __dirname+'/bundle.js',
   },
   devServer: {
      inline: true,
      port: 8081
   },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: __dirname+'/node_modules',
            loader: 'babel',
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
};

module.exports = config;
