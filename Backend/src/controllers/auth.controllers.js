import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { isValidString, isValidBody, } from "../utils/validateObjID.js";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
}


export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access Denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid Token' });
    }
}


export async function signup(req, res, next) {
    try {
        const author = req.body;

        if (!isValidBody(author)) {
            return res.status(400).send({ message: "please provide Data" })
        }
        const { name, role, email, password } = author;

        if (!isValidString(name)) return res.status(400).send({ message: "Please enter a valid name" });

        if (!isValidString(email)) return res.status(400).send({ message: "Email is required" });

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) return res.status(400).send({ message: "Email id is invalid!" });

        if (!isValidString(password)) return res.status(400).send({ message: "Password is required" });

        if (password.length < 6) {
            return res.status(400).send({ message: "Password must be at least 6 characters long" });
        }

        if (!isValidString(role)) {
            return res.status(400).send({ message: "Role is required" });
        }
        if (role && role !== "user" && role !== "admin") {
            return res.status(400).send({ message: "Role must be either 'user' or 'admin'" });
        }


        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send({ message: "Email or Username already exists" })
        }

        let user = await User.create({
            name,
            email,
            password,
            role: role,
        });

        if (!user) {
            return res.status(500).send({ message: "Error creating user" });
        }
        let data = {
            id: user._id,
            email: user.email,
            role: user.role,
        }

        let token = generateToken(data);
        console.log(token);

        res.status(200).json({
            success: true,
            message: "Registration successful",
            token, 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (e) {
        next(e);
    }
}



export async function signin(req, res, next) {
    try {
        const author = req.body;
        if (!isValidBody(author)) return res.status(400).send({ message: "please provide credentials" });

        const { email, password } = author;

        if (!isValidString(email)) return res.status(400).send({ message: "Please enter a valid Email" });
        if (!isValidString(password)) return res.status(400).send({ message: "Password is required!" });

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ message: "Invalid email or password" })
        }

        if (await bcrypt.compare(password, user.password)) {
            let data = {
                id: user._id,
                email: user.email,
            }
          
            let token = generateToken(data);
            console.log(token);

            res.status(200).json({
                success: true,
                message: "Login successful",
                token, // 👈 your frontend will now get this
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            });
        } else {
            res.status(400).send({ message: "Invalid Email or Password" })
        }
    } catch (e) {
        next(e)
    }
}

export async function signout(req, res, next) {
    try {
        // Since JWTs are stateless, signout can be handled on the client side by simply deleting the token.
        res.status(200).json({ message: "Signout successful on client side. Please delete the token." });
    } catch (e) {
        next(e);
    }           
}