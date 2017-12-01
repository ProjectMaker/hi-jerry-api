const User = require('../../shared/models/user-model');

class FriendController {

  static put(req, res) {
    User.update({ _id: req.user.id }, { $push: { friends: { _id: req.body._id, name: req.body.name }}})
      .then((result) => User.update({ _id: req.body._id }, { $push: { friends: { _id: req.user.id, name: req.user.name } } }))
      .then((result) => { res.json(result); console.log(result); })
      .catch((err) => {
        res.status(500).json({code: err.code, message: err.message});
      })
  }

}

module.exports = FriendController;