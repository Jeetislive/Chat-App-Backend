import User from "../model/userAuthSchema.js";

export const getUsersForSidebar = async(req,res) => {
    // Fetch users from the server
    // and return them in a format suitable for the sidebar
    try {
        // Fetch users from the server
        const loggedInUserId = req.user._id;
        
        const allUsersExceptLoggedIn = await User.find({
            _id: { $ne: loggedInUserId }  // Exclude the currently logged-in user from the results
        });
        
        // Format users for the sidebar
        const formattedUsers = allUsersExceptLoggedIn.map(user => ({
            _id: user._id,
            name: user.name,
            username: user.username,
            profilePic: user.profilePic
        }));
        
        res.json(formattedUsers);
        
    } catch (error) {
        console.error("Error fetching users for sidebar:", error.message);
        res.status(500).json({ error: "Server error" });
    }
}