const User = require('../../shared/models/user-model');
const FriendTransaction = require('../../shared/models/friend-transaction-model');

class FriendController {

  static approuv(req, res) {

    User.update({ _id: req.user.id }, {
      $push: { friends: { _id: req.body._id, name: req.body.name }},
      $pull: { friendsRequest: { _id: req.body._id } }
    }).then((result) => User.update({ _id: req.body._id }, {
        $push: { friends: { _id: req.user.id, name: req.user.name } },
        $pull: { friendsWaiting: { _id: req.user.id } }
      }))
      .then((result) => {
        return FriendTransaction.collection.insert(
          {approuv: true, source: { _id: req.user.id, name: req.user.name }, target: { _id: req.body._id, name: req.body.name } }
        );
      })
      .then((result) => {
        console.log('Friend, approuv done');
        res.json(result); console.log(result);
      })
      .catch((err) => {
        console.log('Friend, approuv catch err', err);
        res.status(500).json({code: err.code, message: err.message});
      })
  }

  static list(req, res) {
    User.findOne({ _id: req.user.id }, { friends: 1, friendsWaiting: 1, friendsRequest: 1 })
      .then(user => {
        console.log('Friend, list done');
        res.json(user);
      })
      .catch((err) => {
        console.log('Friend, list catch err', err);
        res.status(500).json({code: err.code, message: err.message});
      })
  }

  static invit(req, res) {
    User.update({ _id: req.user.id }, { $push: { friendsWaiting: { _id: req.body._id, name: req.body.name } }})
      .then((r) => {
        return User.update({ _id: req.body._id }, { $push: { friendsRequest: { _id: req.user.id, name: req.user.name } } })
      })
      .then(() => {
        return FriendTransaction.collection.insert(
          { request: true, source: { _id: req.user.id, name: req.user.name }, target: { _id: req.body._id, name: req.body.name } }
        );
      })
      .then((r) => {
        console.log('Friend, invit done');
        res.status(200).json({})
      })
      .catch((err) => {
        console.log('Friend, invit catch err', err);
        res.status(500).json({code: err.code, message: err.message});
      });
  }

  static available(req, res) {
    User.findOne({ _id: req.user.id }, { friends: 1 })
      .then(user => {
        let friends = [req.user.id];
        if (user.friends) user.friends.forEach(friend => friends.push(friend._id));
        return User.find({ _id: { $nin: friends } }, { _id: 1, 'profile.name': 1})
      })
      .then(friends => {
        console.log('Friend, available done');
        friends = friends.map(friend => { return { _id: friend._id, name: friend.profile.name }});
        return res.json(friends);
      })
      .catch((err) => {
        console.log('Friend, available catch err', err);
        res.status(500).json({code: err.code, message: err.message});
      })
  }

  static requestTransactions(req, res) {
    FriendTransaction.find({ 'target._id': req.user.id, request: true})
      .then(transactions => res.json(transactions))
      .catch((err) => {
        res.status(500).json({code: err.code, message: err.message});
      })
  }

  static approuvTransactions(req, res) {
    FriendTransaction.find({ 'target._id': req.user.id, approuv: true})
      .then(transactions => res.json(transactions))
      .catch((err) => {
        res.status(500).json({code: err.code, message: err.message});
      })
  }

  static removeTransactions(req, res) {
    FriendTransaction.remove({ _id: { $in: req.body } })
      .then(result => res.json({}))
      .catch((err) => {
        res.status(500).json({code: err.code, message: err.message});
      })
  }
}

module.exports = FriendController;