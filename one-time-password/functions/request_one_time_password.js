// Request a One-Time Password from Twilio

const admin = require('firebase-admin');
const twilio = require('./twilio');  // local file!!

module.exports = function (req, res) {
    // 1 - validate Phone
    if (!req.body.phone) {
        return res.send(422).send({ error: 'You must provide a phone number' });
    }

    // 2 - Ensure Phone number is a string
    const phone = String(req.body.phone).replace(/[^\d]/g, '');  // remove non-digit
    // console.log('RECV phone', phone);

    // 3 - Find User model in Firebase
    admin.auth().getUser(phone)
        .then(userRecord => {   // 3a. Found the User in Firebase
            // 3b - Gen a 4-digit random code
            const code = Math.floor((Math.random() * 8999 + 1000));  // 4-digit code

            // 3c - Text the User via Twilio
            twilio.messages.create({
                body:   'Baggy says: 🐷 Your code is ' + code,
                to:     phone,
                from:   '+14085965744'  // My Twilio Send-out Number
            }, (err) => {
                if (err) { // 3d - if twilio error
                    console.log('Error from Twilio:', err); // debug
                    return res.send(422).send(err);
                }
                // 3e - else, Successful send from Twilio: save code in Firebase
                admin.database().ref('users/' + phone)  // get handle to User model in Firebase
                    // create a 'codeValid' prop which tells if this code is good to use
                    .update({ code: code, codeValid: true }, () => {     // save the OneTime code
                        res.send({ success: true });    // respond OK to 
                    });
            })
        })
        .catch((err) => {       // 3f. Didn't find the User in Firebase
            res.status(422).send({ error: err }); // in Prod env, send a better err msg
        });
};
