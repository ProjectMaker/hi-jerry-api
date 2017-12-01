const Experience = require('../../shared/models/experience-model');
const ExperienceWaiting = require('../../shared/models/experience-waiting-model');
const Place = require('../../shared/models/place-model');

class ExperienceController {

  static index(req, res) {
    Place.find({}, (err, places) => {
      res.json(places);
    });
  };

  static save(experience, res) {
    experience.validate((err) => {
      if (err) {
        const errors = [];
        for (const errorName in err.errors) errors.push({field: errorName, type: err.errors[errorName].properties.type})
        res.status(400).json(errors);
      } else experience.save()
        .then((result) => {
          return Place.find({ placeId: experience.place.placeId, 'user._id': { $ne: experience.user._id } })
            .then(places => {
              const promises = places.map(place => {
                const expWaiting = new ExperienceWaiting(Object.assign({}, experience.toObject(), { user: place.user }));
                return expWaiting.save();
              });
              return Promise.all(promises);
            });
        })
        .then(result => { res.json(experience.toObject()); })
        .catch((err) => {
          res.status(500).json({code: err.code, message: err.message});
        })

    });
  }

  static put(req, res) {
    const experience = new Experience(req.body);
    //place.isNew = false;
    ExperienceController.save(experience, res);
  }

}

module.exports = ExperienceController;