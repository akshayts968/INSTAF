/*const mongoose = require('mongoose');
const User = require('../model/User'); // Adjust the path as necessary

async function Reset() {
    try {
        // Find all users
        const users = await User.find();

        // Iterate over each user and reset the counts
        for (const user of users) {
            user.followers = [];
            user.followings = [];
            user.nFollowers = 0;
            user.nFollowing = 0;

            await user.save();
        }

        console.log('All user counts have been reset successfully');
    } catch (error) {
        console.error('Error resetting user counts for all users:', error.message);
    }
}

// Example usage:
// resetAllUserCounts();
module.exports=Reset;*/
const resetPassword = (user, newPassword) => {
    user.password = newPassword;
    user.save();
  };
  
  module.exports = { resetPassword };
  