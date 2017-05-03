// Verify the One-time Password we already sent to the User

const admin = require('firebase-admin');
const twilio = require('./twilio');  // local file!!

module.exports = function (req, res) {
    // 1 - validate Phone and Code
    if (!req.body.phone || !req.body.code) {
        return res.send(422).send({ error: 'You must provide a phone number and a code' });
    }

    // 2 - Ensure Phone number is a string
    const phone = String(req.body.phone).replace(/[^\d]/g, '');  // remove non-digit
    const code  = parseInt(req.body.code);

    // 3 - Find User in Firebase by his/her Phone number
    admin.auth().getUser(phone)
        .then(() => {
            // 3a - ...Look at the User collection,
            const ref = admin.database().ref('users/' + phone);
            console.log('Verify: found user:', phone);  // DEBUG ONLY
            ref.on('value', snapshot => {
                // 3a.2 ... Tell Firebase to not listen to this val anymore
                ref.off();
                // 3b - ...find the 'code' from snapshot...
                const user = snapshot.val();
                // 3c - ...if codes do not match, or invalid code
                if (user.code !== code || !user.codeValid) {
                    return res.status(422).send({ error: 'Code not valid' });
                }
                // 3d - ...codes match, so invalidate the code (so it cant be used anymore)
                console.log('Verify: phone/code verified:', phone, code); // DEBUG ONLY
                ref.update({ codeValid: false });

                // 4 - Create a JWT Json Web Token for the User, and send it
                admin.auth().createCustomToken(phone)
                    .then(token => res.send({ token: token }));
                console.log('Verify: good code, sent token');  // DEBUG ONLY
            });
        })
        .catch((err) => {
            console.log('Firebase/Verify error:', err); // debug
            res.status(422).send({ error: err });
        });
};
