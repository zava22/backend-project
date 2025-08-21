const express = require('express');
const router = express.Router();
const userModel = require("../models/auth.model");
const bcrypt = require("bcrypt"); 

// get all users
router.get("/all", async (req, res) => {
    try {
        const allUsers = await userModel.find({});
        res.status(200).json(allUsers);
    } catch (e) {
        console.log("serverda hatolik: ", e);
        res.status(500).json({ message: "Server xatosi" });
    }
});

// register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;

        if (!phone || !email || !password) {
            return res.status(400).json({ message: "Email, phone va password kiritilishi shart" });
        }

        // Agar email yoki phone allaqachon mavjud bo‘lsa
        const existingUser = await userModel.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: "Bunday foydalanuvchi mavjud" });
        }

        // Parolni hashlash
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            phone
        });

        await newUser.save();
        res.status(201).json({ message: "Ro'yxatdan o'tish muvaffaqiyatli", user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server xatosi" });
    }
});

// login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email va password kiritilishi kerak" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }

        // Parolni tekshirish
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Noto'g'ri parol" });
        }

        res.status(200).json({ message: "Muvaffaqiyatli login", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server xatosi" });
    }
});

// delete : /user/68a595240b90bbdbb11e4e9e

router.delete("/:id", async (req, res) => {
    try{
        const { id } = req.params
        const user = userModel.find

    } catch(error) {
         console.log(error);
        res.status(500).json({ message: "Server xatosi" });
    }
})

// get simple user by id
router.get("/:id", async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server xatosi" });
    }
});

module.exports = router;
