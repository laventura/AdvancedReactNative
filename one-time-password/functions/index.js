const admin = require('firebase-admin');
const functions = require('firebase-functions');
// local imports
const createUser = require('./create_user');
const serviceAccount = require('./service_account.json');   // handle to PRIVATE KEY
const requestOneTimePassword = require('./request_one_time_password'); 
const verifyOneTimePassword = require('./verify_one_time_password');

// from Firebase Project Settings
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-106aa.firebaseio.com"
});

// CLOUD FUNCTIONS
exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword);
exports.verifyOneTimePassword  = functions.https.onRequest(verifyOneTimePassword);
