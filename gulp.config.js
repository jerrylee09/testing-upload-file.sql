module.exports = function() {
    var server = './server';
    var client = './server/public';
    var config = {
        alljs: [
            './server/public/scripts/**/*',
            './server/public'
         ],
        server: server,
        client: client,
        defaultPort: 3000,
        BrowserReloadDelay: 1000,
        nodeServer: './server/app'
    };
    return config;
}