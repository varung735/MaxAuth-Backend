const app = require('./app');;
const env_config = require('./src/configurations/env_config');

app.listen(env_config.port, () => {
    console.log(`The server is listening on ${env_config.port}`);
})

