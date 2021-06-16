# URL Shortener app based on the FCC [URL Shortener Microservice](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/url-shortener-microservice)

### App functionality: 
- Add a URL to the database
- Recieve a shortened version of the URL
- Use the short URL to access the original URL
- Invalid URLs return an error

### Although based on a FCC project, the app has been extended:
- Shortened URLs are presented in a readable form to user
- If a URL has already been shortened, then this is returned instead of shortening again
- The short URL string is a small, randomly generated string

### Built with:

- JavaScript
- NodeJs 16.1.0 / Express 4.17.1
- HTML / CSS
- MongoDB / Mongoose 5.12.12

### To run:

```
$ npm install
```

```
$ npm run start
```

The app is now accessible from localhost:[YOUR_PORT]

You will need to provide your own MongoDB URI in environmental variables (process.env.MONG_URI).
