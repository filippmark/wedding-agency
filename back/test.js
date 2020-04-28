const Basket = require('./models/basket');

( async () => {
    let result = await Basket.find({});
    console.log(result);
})()