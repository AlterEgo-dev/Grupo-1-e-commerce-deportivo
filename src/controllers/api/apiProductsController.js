// ACÁ HAY QUE TRAER DE LA BD DE TODOS LOS PRODUCTOS Y HACER UN RES.JSON PARA VER SOLO EL JSON DEL MISMO
const path = require('path');
const db = require('../../dataBase/models');
const sequelize =db.sequelize;
const { Op } = require('sequelize');
const moment = require('moment');

const Product =db.Product

// const apiProductsController = {
//     "list": (req, res) => {
//         db.Product
//         .findAll({
//             attributes:['id', 'Name', 'Description' ]
//     })
//         .then(products => {
//             return res.json({
//                 meta: {url: 'http://localhost:8000/api/products'},
//                 total: products.length,
//                 data: products
//             })
//         })
//         .catch(error=>{res.send({result:"error", payload: error})})
//     }
// }
const apiProductsController = {
    "list": (req, res) => {
        db.Product
            .findAll({
                attributes: ['Id', 'Name', 'Description', 'Category'],
            })
            .then(products => {
                const count = products.length;

                const countByCategory = {};
                products.forEach(product => {
                    const category = product.Category;
                    countByCategory[category] = (countByCategory[category] || 0) + 1;
                });

                const productsArr = products.map(product => {
                    return {
                        id: product.Id,
                        name: product.Name,
                        description: product.Description,
                        detail: `http://localhost:8000/api/products/${product.Id}`,
                    };
                });

                res.json({
                    count,
                    countByCategory,
                    productsArr,
                });
            })
            .catch(error => {
                res.status(500).json({ result: "error", payload: error.message });
            });
    },
    productId: (req, res) => {
        const { id } = req.params;
        db.Product.findByPk(id)
        .then((product)=>{
            return res.status(200).json({
                data:product,
                detail: `http://localhost:8000/api/products/${id}`,

            })
        }).catch(error => {
            res.status(500).json({ result: "error", payload: error.message });
        });
    },
    "LastProduct": (req,res) => {
        db.Product.findAll({
            order: [["id", "DESC"]],
            limit: 1
        }).then(product => {
            return res.status(200).json({
                data:product,
            })
        }).catch(error => {
            res.status(500).json({ result: "error", payload: error.message });
        });
    }
    
};

module.exports = apiProductsController;
