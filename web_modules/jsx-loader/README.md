To debug, make sure you debug nodeJS with Javascript file: node_modules\webpack\bin\webpack.js

To use:

1. have json config files setup for [nconf](https://www.npmjs.com/package/nconf) in ```configDir``` (here webapp/config)
2. configure the loader for the ```.jsx``` extension in webpack.config.js to provide ```configDir``` as a query parameter like in ```{ test: /\.jsx/, loader: 'jsx?config=webapp/config' },``` 
3. set NODE_ENV environment variable to produce code for targeted environment. NODE_ENV determines the json config file loaded from configDir. 
