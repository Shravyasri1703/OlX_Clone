import Item from "../models/item.model.js";
import User from "../models/user.model.js";
import multer from 'multer';



export const Sell = async (req, res) => {
    try {
        const { name, price } = req.body;
       const image = req.file ? `${req.protocol}://${req.get('host')}/${req.file.path}` : null; 

        
        if (!name || !price) {
            return res.status(400).json({ error: "Please provide name and price" });
        }

        
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

       
        const newItem = new Item({
            name,
            price,
            image,
            seller: req.user._id 
        });

        
        await newItem.save();

        user.itemforSale = user.itemforSale || []; 
        user.itemforSale.push(newItem._id);
        user.balance += 50;
        await user.save();

        res.status(201).json(newItem);
    } catch (err) {
        console.log("Error creating item:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getAllItems = async (req, res) => {
    try {
        
        const items = await Item.find()
            .populate('seller', 'username') 
            .exec();

      
        res.status(200).json(items);
    } catch (err) {
        console.log('Error fetching items:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const buyItem = async (req, res) => {
    try {
        const userId = req.user._id;  
        const { itemId } = req.body;

        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        if (item.status === 'sold') {
            return res.status(400).json({ error: "Item has already been sold" });
        }

        const buyer = await User.findById(userId);
        if (!buyer) {
            return res.status(404).json({ error: "User not found" });
        }

        if (buyer.balance < item.price) {
            return res.status(400).json({ error: "Insufficient balance" });
        }

        if (item.seller.equals(userId)) {
            return res.status(400).json({ error: "You cannot buy an item you have sold" });
        }

       
        buyer.balance -= item.price;

        // Find the seller and add the item price to their balance
        const seller = await User.findById(item.seller);
        if (!seller) {
            return res.status(404).json({ error: "Seller not found" });
        }
        seller.balance += item.price;

       
        item.status = 'sold';
        item.buyer = userId;
        buyer.purchasedItem.push(item._id);

        
        await buyer.save();
        await seller.save();
        await item.save();

        res.status(200).json({
            message: "Purchase successful",
            balance: buyer.balance,
            item: {
                _id: item._id,
                status: item.status,
                buyer: item.buyer,
            },
        });
    } catch (err) {
        console.log("Error in buyItem:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const addFavorite = async (req, res) => {
    try {
        const userId = req.user._id;
        const { itemId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.favorites.includes(itemId)) {
            user.favorites.push(itemId);
            await user.save();
            res.status(200).json({ message: "Item added to favorites" });
        } else {
            res.status(400).json({ error: "Item already in favorites" });
        }
    } catch (err) {
        console.log("Error in addFavorite:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const removeFavorite = async (req, res) => {
    try {
        const userId = req.user._id;
        const { itemId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.favorites.includes(itemId)) {
            user.favorites = user.favorites.filter(fav => fav.toString() !== itemId);
            await user.save();
            res.status(200).json({ message: "Item removed from favorites" });
        } else {
            res.status(400).json({ error: "Item not found in favorites" });
        }
    } catch (err) {
        console.log("Error in removeFavorite:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getFavorites = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).populate('favorites');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user.favorites);
    } catch (err) {
        console.log("Error in getFavorites:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


