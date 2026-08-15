import mongoose from 'mongoose';
import User from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const TOKEN_EXPIRES_IN = '24h';
const JWT_SECRET = 'your_jwt_secret_here';

//REGISTER

export async function register(req,res) {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({
                success:false,
                message:'All fields are required.'
            })
        }
        if(!validator.isEmail(email)) {
            return res.status(400).json({
                success:false,
                message:'Invalid email.'
            })
        }
        const exists = await User.findOne({email}).lean();
        if(exists) return res.status(409).json({success:false,message:'User already exists.'})

            const newID = new mongoose.Types.ObjectId();
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({
                _id: newID,
                name,
                email,
                password: hashedPassword 
                
            });
            await user.save();

            if(!JWT_SECRET) throw new Error('JWT_SECRET IS NOT FOUND ON SERVER');

            const token = jwt.sign({ id: newID.toString() }, JWT_SECRET,{ expiresIn: TOKEN_EXPIRES_IN });

            return res.status(201).json({
                success: true,
                message: 'Account created successfully',
                token,
                user: {id: user._id.toString(), name: user.name, email: user.email }
            });
    }
    catch(error){
        console.error('Register Error', error);
        return res.status(500).json({
            success:false,
            message: 'Server Error'
        });
    }
}

//login

export async function login(req,res) {
    try{
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message: 'All fields are required.'
            });
        }

        const user = await User.findOne({email});
        if(!user) return res.status(401).json({
            success:false,
            message: 'Invalid Email or Password.'
        });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({
            success:false,
            message: 'Invalid Email or Password.'
        });
        
        const token = jwt.sign({ id: user._id.toString() },JWT_SECRET,{ expiresIn: TOKEN_EXPIRES_IN });
        return res.status(201).json({
            success: true,
            message: 'Login successfully',
            token,
            user: {id: user._id.toString(), name: user.name, email: user.email }
        });

    }
    catch(error){
        console.error('Login Error', error);
        return res.status(500).json({
            success:false,
            message: 'Server Error'
        });
    }
    
}

