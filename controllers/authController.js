import user from "../module/Auth.js";
import CryptoJs from "crypto-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

export const userRegister = (req, res) => {
  const { username, email, password, phone, country,profilePicture } = req.body;
 
  const newUser = new user({
    username: username,
    email: email,
    password: CryptoJs.AES.encrypt(
      password,
      process.env.CRYPTO_PASS
    ).toString(),
    phone: phone,
    country: country,
   profilePicUrl:profilePicture
   
  })
    .save()
    .then(() =>
      res
        .status(200)
        .json({ success: true, message: "user registered successfully" })
    )
    .catch((err) => console.log(err));
};
export const userLogin = (req, res) => {
  const { email } = req.body;
  user
    .findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(400).json("Oops,wrong user email!.");
      }
      const cryptopassword = CryptoJs.AES.decrypt(
        user.password,
        process.env.CRYPTO_PASS
      );
      const actualpassword = cryptopassword.toString(CryptoJs.enc.Utf8);
      const inputpassword = req.body.password;
      if (actualpassword != inputpassword) {
        res.status(400).json("wrong password");
      }
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_PASS
      );
      const { password, ...others } = user._doc;
      return res
        .status(200)
        .json({ message: "success", ...others, accessToken });
    })
    .catch((error) => {
      return res.status(500).json("An error occurred");
    });
};
