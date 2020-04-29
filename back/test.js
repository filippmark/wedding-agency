const Rate = require('./models/rate');
const User = require('./models/user');

( async () => {
    
    let user = await User.findOneAndUpdate({email: 'phil@mail.com'}, {$set: {isAdmin: true}});

    console.log(user);
})()