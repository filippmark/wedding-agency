const Rate = require('./models/rate');
const User = require('./models/user');

( async () => {
    
    let rate1 = new Rate({
        name: 'эконом',
        coefficient: 1.1
    });

    let rate2 = new Rate({
        name: 'комфорт',
        coefficient: 1.1
    });

    let rate3 = new Rate({
        name: 'супер',
        coefficient: 1.1
    });

    await rate1.save();
    await rate2.save();
    await rate3.save();
})()