const config = require('config');

const buildShortUrl = (urlCode) => {
    const baseUrl = config.get('baseUrl');
    const shortUrl = [baseUrl,urlCode].join('/');
    return shortUrl;
}

module.exports = {
    buildShortUrl,
}
