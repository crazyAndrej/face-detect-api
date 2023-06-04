const Clarifai = require('clarifai');
//   const raw = JSON.stringify({
//     user_app_id: {
//       user_id: 'andrejluk',
//       app_id: 'face_detection',
//     },
//     inputs: [
//       {
//         data: {
//           image: {
//             url: req.body.input,
//           },
//         },
//       },
//     ],
//   });

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       Authorization: 'Key ' + '200a0a1dbcbe48ee8ee02925b3db2ac8',
//     },
//     body: raw,
//   };

//   fetch(
//     `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
//     requestOptions
//   )
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => res.status(400).json('unable to work with API'));
// };

const handleApiCall = (req, res) => {
  const raw = JSON.stringify({
    user_app_id: {
      user_id: 'andrejluk',
      app_id: 'face_detection',
    },
    inputs: [
      {
        data: {
          image: {
            url: req.body.input,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Key ' + '200a0a1dbcbe48ee8ee02925b3db2ac8',
    },
    body: raw,
  };

  fetch(
    `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json('unable to work with API');
    });
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json('unable to get entries'));
};

module.exports = {
  handleImage,
  handleApiCall,
};
