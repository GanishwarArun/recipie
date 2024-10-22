const OrdersRouter = require('express').Router();

//fetches all the orders
OrdersRouter.get('/', (request, response) => {
    return response.status(200).json({
      message: 'Orders fetched successfully'  
    });
});

//Fetches order matches given orderId
OrdersRouter.get('/:orderId', (request, response) => {
    return response.status(200).json({
      message: 'Order fetched successfully'
    });
});

module.exports = OrdersRouter;