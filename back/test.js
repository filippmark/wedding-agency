const Rate = require('./models/rate');

( async () => {
    let rate1 =  new Rate({
        name: 'Эконом',
        coefficient: 1.2
    });

    let rate2 =  new Rate({
        name: 'Комфорт',
        coefficient: 1.5
    });

    let rate3 =  new Rate({
        name: 'Люкс',
        coefficient: 1.7
    });

    await rate1.save();

    await rate2.save();

    await rate3.save();

    console.log(rate1, rate2, rate3);
})()