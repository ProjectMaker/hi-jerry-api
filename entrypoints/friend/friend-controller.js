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

  static available(req, res) {
    User.findOne({ _id: req.user.id }, { friends: 1 })
      .then(user => {
        let friends = [req.user.id];
        if (user.friends) user.friends.forEach(friend => friends.push(friend._id));
        return User.find({ _id: { $nin: friends } }, { _id: 1, 'profile.name': 1})
      })
      .then(friends => {
        friends = friends.map(friend => { return { _id: friend._id, name: friend.profile.name }});
        return res.json(friends);
      })
      .catch((err) => {
        res.status(500).json({code: err.code, message: err.message});
      })
  }
}

module.exports = FriendController;