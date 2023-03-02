const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const {BitlyClient} = require("bitly");

const bitLy = new BitlyClient(functions.config().bitLy.access_token);


exports.shortenURL = functions.database.ref("/links/{linkId}").onCreate(async (snap)=>{
  const originalUrl = snap.val();
  const response = await bitLy.shorten(originalUrl);
  const shortUrl = response.long_url;
  
  return snap.ref.set({
    original: originalUrl,
    short: shortUrl,
  });
});
