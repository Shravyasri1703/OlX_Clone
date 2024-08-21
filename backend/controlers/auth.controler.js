import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'

export const SignUp = async (req, res)=>{
   try{
        const { username, email, password } = req.body
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid Email Format" });
        }

        const existingUser = await User.findOne({ username })
        if(existingUser){
            return res.status(400).json({
                error : "User already Exists"
            })
        }

        const existingEmail = await User.findOne({ email })
        if(existingEmail){
            return res.status(400).json({
                error: "Email Already Exists"
            })
        }

        if (!password || password.length < 6) {
            return res.status(400).json({
                error: "Password must be at least 6 characters long."
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                itemforSale: newUser.itemforSale,
                purchasedItem: newUser.purchasedItem,
                balance: newUser.balance
            })
        }
        else{
            res.status(400).send("Invalid Data")
        }
   }
   catch(err){
       console.log(err)
       res.status(500).send(err)
   }
}

export const Login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: "Invalid Username" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid Password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            itemforSale: user.itemforSale,
            purchasedItem: user.purchasedItem,
            balance: user.balance
        });
    } catch (err) {
        console.log("Error in login:", err);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const Logout = async (req, res)=>{
    try{
        res.cookie("jwt","",{maxAge: 0})
        res.status(200).json({ message: "Logout Successfull"})
   }
   catch(err){
          res.status(500).send("Internal Server Error")
   }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('itemforSale')
            .populate('purchasedItem')
            .select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.log("Error in getMe function", err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const addBalance = async (req, res) => {
    try {
        const userId = req.user._id;
        const { amount } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        user.balance += amount;

        await user.save();

        res.status(200).json({ message: "Balance updated successfully", balance: user.balance });
    } catch (err) {
        console.log("Error in addBalance:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
