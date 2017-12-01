const _ = require('underscore');
const ExperienceWaiting = require('../../shared/models/experience-model');
const User = require('../../shared/models/user-model');
const Place = require('../../shared/models/place-model');

class ExperienceWaitingController {
  static index(req,res) {
    ExperienceWaiting.find({'place._id': req.params.placeId, 'targetUser._id': req.user.id})
      .then(experiences => res.json(experiences))
      .catch(err => res.status(500).json({code: err.code, message: err.message}));
  }

  static removeWaiting(placeId, userId) {
    ExperienceWaiting.remove({'place._id': placeId, 'targetUser._id': userId})
  }

  static add(experience) {
    Place.find({ placeId: experience.place.placeId, 'user._id': { $ne: experience.user._id } })
      .then(places => {
        const promises = places.map(place => {
          const expWaiting = new ExperienceWaiting(Object.assign({}, experience, { user: place.user }));
          return expWaiting.save();
        });
        return Promise.all(promises);
      });
  }
}

module.exports = ExperienceWaitingController;