const Order = require("../models/order");
const Basket = require("../models/basket");
const BasketItem = require("../models/basketItem");
const OrderItem = require("../models/orderItem");

exports.getOrders = async (req, res, next) => {
  try {
    let orders = await Order.find({ userId: req.user.id });

    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send();
  }
};

exports.createNewOrder = async (req, res, next) => {

  const { basketId } = req.body;

  try {

    let basket = await Basket.findById(basketId);

    let order = new Order({
        price: basket.price,
        amountOfItems: basket.amountOfItems,
        placeId: basket.placeId,
        userId: basket.userId,
        rate: basket.rate
    });

    order = await order.save();

    let basketItems = await BasketItem.find({basketId: basket._id});

    await Promise.all(basketItems.map(async (basketItem) => {

        let orderItem = new OrderItem({
            orderId: order._id,
            competitionId: basketItem.competitionId
        });

        orderItem = await orderItem.save();

        await BasketItem.findOneAndDelete({competitionId: basketItems.competitionId});
    }));

    res.status(200).send();

  } catch (error) {
    res.status(500).send();
  }
};