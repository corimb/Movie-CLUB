import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

const secret = 'secret';

export const signin = async (req, res) => {

    try {
        const { email, password } = req.body; // data from the frontend side.
        const existingUser = await User.findOne({ email }); //find in the dataBase the user that matches with the email

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credencials" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: "1h" });

        const {_id, name} = existingUser;

        res.status(200).json({ "id": _id, "name": name, "imageUrl": null, "token": token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });

        console.log(error)
    }
}

export const signup = async (req, res) => {
   const { email, password, confirmPassword, firstName, lastName } = req.body;

   try {
       //find in the dataBase if there are a user with that email:
    const existingUser = await User.findOne({ email }); 

    if(existingUser) return res.status(400).json({ message: "User already exists." }); 

    if(password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });

    // before we create the user we need to hash the password, 12 is the salt (security level);
    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` }); 
    
    const token = jwt.sign( { email: createdUser.email, id: createdUser._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ "id": createdUser._id, "name": createdUser.name, "imageUrl": null, "token": token });
   } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    
        console.log(error);
   }
}