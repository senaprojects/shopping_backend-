import { verifyAuth, verifyAdmin, verifyToken } from "../route/tokenVerify.js";
import Cart from "../module/Cart.js";
export const getAllusercart =
  (verifyAuth,
  (req, res) => {
    Cart.find()
      .then((products) =>
        res.status(200).json({ message: "success", products })
      )
      .catch((err) => res.status(404).json(err));
  });

export const createCart =
  (verifyToken,
  (req, res) => {
    const newCart = new Cart(req.body)
      .save()
      .then(() =>
        res.status(200).json({ message: "successfully added the user cart" })
      )
      .catch((err) => res.status(400).json(err));
  });

export const getUsercart =
  (verifyAuth,
  (req, res) => {
    const userId = req.params.id;
    Cart.find(userId)
      .then((product) => res.status(200).json({ message: "success", product }))
      .catch((err) => res.status(400).json(err));
  });

export const updateCart =
  (verifyAuth,
  (req, res) => {
    const { id } = req.params;
    Cart.findByIdAndUpdate(id, { $set: req.body }, { new: true })
      .then((updatedCart) => res.status(200).json(updatedCart))
      .catch((err) => res.status(404).json(err));
  });

export const cartDelete =
  (verifyAuth,
  (req, res) => {
    const { userId, productId  } = req.params;
    // console.log(id);
    Cart.find(userId,productId).findOneAndDelete()
      .then(() => res.status(200).json({ message: "cart deleted success" }))
      .catch((err) => res.status(404).json(err));
  });
export const checkoutDelete=(req,res)=>{
  const {userId}=req.params;
  try {
    // Delete all cart items associated with the user
    Cart.deleteMany({ userId: userId });

    res.status(204).json({message:"success"}); // Respond with a 204 No Content status if successful
  } catch (error) {
    console.error("Error clearing the cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}