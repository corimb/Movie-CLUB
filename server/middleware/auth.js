import jwt from 'jsonwebtoken';

// wants to like a post
// click the like button --> auth middleware (next) => like controller

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // GET THE TOKEN FROM THE FRONTEND:  after a user is signed up or in it gets a specific token (controllers / auth. If wants to like or delete a post we have to check if that token is valid) / THE TOKEN IS ON THE FIRST POSITION IN THE ARRAY. 

        // WE WILL HAVE 2 TOKENS: 
        // - App token
        // - google token
        const isCustomAuth = token.length < 500; // our own

        let decodedData; // the data we want to take from the token itself

        if(token && isCustomAuth) {
            // App token
            decodedData = jwt.verify(token, 'secret'); // we assign the email and id & secret to decodedData
            // Now we know wich user is loged in

            req.userId = decodedData?.id; // store the id in the req.userId.
        } else {
            // google auth token:
            decodedData = jwt.decode(token)

            req.userId = decodedData?.sub; // sub is the name of the variable that google uses to differenciate the users (the google id)
        }

        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({"status":"KO", "error":"No authorization header found"})
    }
}

export default auth;