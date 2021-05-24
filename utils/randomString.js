// Generate random string for short URL
function createRandomString() {
    const randomString = Math.random().toString(16).substr(2, 5);
    return randomString;
}

module.exports = createRandomString;