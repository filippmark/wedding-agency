const Order = require("../models/order");
const Basket = require("../models/basket");
const BasketItem = require("../models/basketItem");
const OrderItem = require("../models/orderItem");

exports.getOrders = async (req, res, next) => {
  try {
    let orders = await Order.find({ userId: req.user.id }).populate('placeId rateId');

    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send();
  }
};

exports.createNewOrder = async (req, res, next) => {
  try {
    let basket = await Basket.findOneAndUpdate({ userId: req.user.id }).populate(
      "placeId rateId"
    );

    console.log(basket);

    let price = basket.placeId.price;
    let coefficient = basket.rateId.coefficient;

    let basketItems = await BasketItem.find({ basketId: basket._id }).populate(
      "competitionId"
    );



    basketItems.map(async (basketItem) => {
      price += basketItem.competitionId.price;
    });

    let order = new Order({
      placeId: basket.placeId,
      userId: basket.userId,
      rateId: basket.rateId,
      price: price * coefficient,
      amountOfItems: basketItems.length,
    });

    await order.save();


    await Promise.all(
      basketItems.map(async (basketItem) => {
        let orderItem = new OrderItem({
          orderId: order._id,
          competitionId: basketItem.competitionId._id,
        });

        orderItem = await orderItem.save();

        await BasketItem.findOneAndDelete({
          competitionId: basketItem.competitionId._id,
        });
      })
    );

    await Basket.findOneAndUpdate({ userId: req.user.id }, {$set: {placeId: null, rateId: null}})

    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};
