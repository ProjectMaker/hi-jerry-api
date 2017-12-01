const User = require('../../shared/models/user-model');

class UserController {

  static index(req, res) {
    User.find({})
      .then(users => {
        const result = users.map(user => { return { _id: user._id, name: user.profile.name } })
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log('save err', err)
        res.status(500).json({code: err.code, message: err.message});
      })
  };
  
  
}

module.exports = UserController;