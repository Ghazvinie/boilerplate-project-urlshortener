function handleErrors(error) {
    let errorObject = { error: '' };

    if (error.keyPattern.hasOwnProperty('originalURL')) {
        errorObject.error = 'URL has already been shortened';
        return errorObject;
    }

    if (error.keyPattern.hasOwnProperty('shortURL')) {
        errorObject.error = 'shortURL already taken';
        return errorObject;
    }

    else {
        console.log(error);
        return;
    }
}

module.exports = handleErrors;