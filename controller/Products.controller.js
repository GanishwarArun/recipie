const ProductsRouter = require('express').Router();

//fetches all the products 
ProductsRouter.get('/', (request, response) => {
    return response.status(200).json({
      message: 'Products fetched successfully'  
    });
});

//fetches order matches given OrderId
ProductsRouter.get('/:productId', (request, response) => {
    return response.status(200).json({
      message: 'Product fetched successfully'
    });
});

module.exports = ProductsRouter;