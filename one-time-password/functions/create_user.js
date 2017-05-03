const admin = require('firebase-admin');

module.exports = function (req, res) {
    // 1 - Verify User sent in a phone number
    if (!req.body.phone) {
        return res.status(422).send({ error: 'Bad Input - no phone provided' });
    }
    // 2 - Format number to remove all punctuations etc (dash/paren/dots/etc)
    const phone = String(req.body.phone).replace(/[^\d]/g, '');  // remove non-digit
    console.log('RECV phone', phone);

    // 3 - Create new User account in Firebase; using phone number as the unique id
    admin.auth().createUser({ uid: phone })
        .then(user => res.send(user))
        .catch(err => res.status(422).send({ error: err }));

    // 4 - Respond to this request, saying account was made
}