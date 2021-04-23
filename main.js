//install the client library!
//npm install @google-cloud/vision

//const express = require('express');
//const app = express();
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: 'APIKey.json'
});

// Performs label detection on the image
client
  .objectLocalization('gs://seeingi2/Object.jpeg')
  .then(results => {
    const objects = results[0].localizedObjectAnnotations;

    objects.forEach(object => myConsole.log(`${object.name}`));
    objects.forEach(object => console.log(`${object.name}`));
    
  })

  //catches if there is any error
  .catch(err => {
    console.error('ERROR:', err);
  });

//app.listen(5000, '127.0.0.1', () => console.log('Server running'));







