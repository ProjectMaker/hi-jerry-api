const Place = require('../../shared/models/place-model');

class PlaceController {

  static index(req, res) {
    Place.find({ 'user._id': req.user.id }, (err, places) => {
      res.json(places);
    });
  };

  static save(place, res) {
    place.validate((err) => {
      if (err) {
        console.log('List, save validate err', err);
        const errors = [];
        for (const errorName in err.errors) errors.push({field: errorName, type: err.errors[errorName].properties.type})
        res.status(400).json(errors);
      } else place.save()
        .then((result) => {
          console.log('List, save done');
          res.json({ _id: result._id, createdAt: result.createdAt });
        })
        .catch((err) => {
          console.log('List, save catch err', err)
          res.status(500).json({code: err.code, message: err.message});
        })

    });
  }

  static getById(req, res) {
    Place.findOne({_id: req.params.id})
      .then(place => res.json(place))
      .catch(err => res.status(500).json({code: err.code, message: err.message}));
  }

  static post(req, res) {
    const place = new Place(req.body);
    PlaceController.save(place, res);
  };

  static put(req, res) {
    const place = new Place(req.body);

    PlaceController.save(place, res);
  }

  static delete(req, res) {
    Place.remove({_id: req.params.id})
      .then((result) => res.status(200).json({_id: req.params.id }))
      .catch(err => res.json({code: err.code, message: err.message}, 500));
  }
}

module.exports = PlaceController;