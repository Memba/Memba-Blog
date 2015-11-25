# Debugging Child Processes

[db.js](./db.js) forks [db_child.js](./db_child.js) as a child process.

In order to debug ```db_child.js```:

1. Set a breakpoint in db.js on line 39, ```indexer = require('child_process').fork(...);```
2. Set a breakpoint in db_child.js on line 149, ```module.exports = {...};```
3. Run the WebApp in debug mode
4. Webstorm automatically detects both processes and displays two tabs in the Debug panel
5. Switch between those tabs to step into the code
