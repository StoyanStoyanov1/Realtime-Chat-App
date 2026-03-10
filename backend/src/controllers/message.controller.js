import Message from '../models/Message.js';
import User from '../models/User.js';
import cloudinary from "../lib/cloudinary.js";

export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select('-password');

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error(`Error fetching contacts: ${error.message}`);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const {id: userToCharId} = req.params;

        const message = await Message.find({
            $or: [
                {sender: myId, receiverId: userToCharId},
                {sender: userToCharId, receiverId: myId},
            ]
        })

        res.status(200).json(message);

    } catch (error) {
        console.error(`Error in getMessages controller: ${error.message}`);
        res.status(500).json({message: "Internal server error"});
    }
};
export const sendMessage = async (req, res) => {
    try {
        const {text, image } = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error(`Error in sendMessage controller: ${error.message}`);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or: [
                {sender: loggedInUserId},
                {receiverId: loggedInUserId},
            ]
        })

        const chatPartnerIds = [...new Set(messages.map(msg => msg.senderId.toString() === loggedInUserId ? msg.receiverId.toString() : msg.senderId.toString()))];

        const chatPartners = await User.find({_id: {$in: chatPartnerIds}}).select('-password');

        res.status(200).json(chatPartners);
    } catch (error) {
    }
}