const { StatusCodes } = require('http-status-codes');
const User = require('./user_model');

// Add a new user - POST
const addUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(StatusCodes.CREATED).json({ msg: "User added successfully", user });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
};

// Read all users - GET
const readAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(StatusCodes.OK).json(users);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
};

// Read single user - GET
const readSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
        res.status(StatusCodes.OK).json(user);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
};

// Update user - PUT
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
        res.status(StatusCodes.OK).json({ msg: "User updated successfully", user });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
};

// Delete user - DELETE
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
        res.status(StatusCodes.OK).json({ msg: "User deleted successfully" });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
};

module.exports = { addUser, readAllUsers, readSingleUser, updateUser, deleteUser };
