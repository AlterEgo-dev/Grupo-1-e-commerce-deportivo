const path = require('path');
const fs = require('fs');
const dataBase = require('../dataBase/productList.json');// hay que borrar cuando pasemos todo a base de datos
const {results} = require('../dataBase/productList.json');// hay que borrar cuando pasemos todo a base de datos
const db = require('../dataBase/models'); //este hay que usar para usar la base de datos
const { Op } = require('sequelize');//para utilizar los operadores de sequalize (ej:like,etc)
const multer = require('multer');
const { log } = require('console');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/img/productos')); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'Z1-' + uniqueSuffix + path.extname(file.originalname));
  }
});

/** AQUI ACABA MULTER */

/** CONTROLADORES  */

const productController = {
  productDetail: (req, res) => {
    db.Product.findAll()
    .then((products) => {
      db.Product.findByPk(req.params.id) // Espera a que se resuelva la promesa
        .then((product) => {
          let sizes = product.Size.split(",");
          res.render('detalle-producto.ejs', { products, product, sizes });
        })
      })   
  },

  productAdminList: async (req, res) => {
    try{
        const data = await db.Product.findAll()
        return res.render('product-admin.ejs', {data})
      }catch(error){
        res.status(404).redirect('error-404');
      }
  },

  productCreate: (req, res) => {
    res.render('product-create.ejs');
  },

  /** CREAR NUEVO PRODUCTO */

  productCreatePush: (req, res) => { 
        res.redirect('/product/product-admin');
},
  /** RENDERIZACION DE LA VISTA  */
  
  productEditForm: async(req, res) => {
    const { id } = req.params;
    try{
      const producto = await db.Product.findOne({
        where: {id},
      })
      if(producto){

      res.render('product-edit.ejs', { producto });
    } else {
      res.status(404).redirect('error-404')
    }
    } catch(error) {
      console.log(error)
    }
    
  },

  /** BORRAR LA IMAGEN DE UN PRODUCTO */
  
  deleteImage: (req, res) => {
    const { id, index } = req.params;
    const product = dataBase.results.find((prod) => prod.id === id);
  
    if (product) {
      if (index >= 0 && index < product.imageDetail.length) {
        product.imageDetail.splice(index, 1);
        const filePath = path.join(__dirname, '../dataBase/productList.json');
        fs.writeFileSync(filePath, JSON.stringify(dataBase, null, 2), 'utf-8');
      }
    }
  
    res.redirect(`/product/product-edit/${id}`);
  },

  /** EDICIÓN DE PRODUCTO / ACTUALIZAR IMG PRINCIPAL */

  saveEditedProduct: async (req, res) => {
      const { id } = req.params;
      const { title, gender, description, price, category, sizes, cuidados } = req.body;
      const image1 = req.files.image1[0].filename; // SOLO TRAE LA POSICIÓN 0
      const imageDetail = req.files.imageDetail;

     
      const imagenes = imageDetail.map(function(imagen){
        return "/img/productos/" + imagen.filename;
      })

      const imageDetailString = imagenes.join(', ')

      try {
        await db.Product.update({
          Name: title,
          Description: description,
          Price: price,
          Image1: "/img/productos/" + image1,
          ImageDetail: imageDetailString,
          Care: cuidados,
          Category: category,
          Gender: gender,
          Sizes: sizes
         },{
          where:{id}
         });
         res.redirect('/product/detail/' + id);
       } catch (error) {
         console.error(error);
       }
    },
  
  
  
  /** BORRAR UN PRODUCTO */

  deleteProduct: async (req,res) => {
    try{
      await db.Product.destroy({ where: { id: req.params.id }});
      res.redirect('/product/product-admin'); 
    }catch(error){
      res.status(404).redirect('error-404');
    }
  },

  /** BORRAR LAS IMAGENES DE DETALLE  */
  
  deleteProductImage: (req, res) => {
    const { id, index } = req.params;
    const product = dataBase.results.find(prod => prod.id === id);
  
    if (product) {
      if (index >= 0 && index < product.imageDetail.length) {

        if (product.imageDetail.length > 1) {
          product.imageDetail.splice(index, 1);
  
          const filePath = path.join(__dirname, '../dataBase/productList.json');
          fs.writeFileSync(filePath, JSON.stringify(dataBase, null, 2), 'utf-8');
        }
      }
    }
  
    res.redirect(`/product/product-edit/${id}`);
  },
  genero: (req, res) => {
    const generoSelect = req.params.genero;
    db.Product.findAll({
        where: {
            Gender: generoSelect
        }
    })
    .then((result) => {
        return res.render("product-category.ejs", { result });
    })
  },
  //Buscar por genero
  category: (req, res) => {
    const categoryId = req.params.category;
    db.Product.findAll({
        where: {
          Category: categoryId
        }
    })
    .then((result) => {
        return res.render("product-category.ejs", { result });
    })
  },
  //Buscar por categoría
  search: (req, res) =>{
    const busqueda = req.query.search;
    db.Product.findAll({
        where: {
          Name: { [Op.like]: `%${busqueda}%` },
        }
    })
    .then((arrBusqueda) => {
      return res.render("product-search", { arrBusqueda })
    })
  }
  //Buscador del navBar
};

const upload = multer({ storage: storage });

module.exports = { upload, productController }; // EXPORTE EL UPLOAD PARA REQUERIRLO DIRECTAMENTE EN LA RUTA SEGUN LAS NECESIDADES, SI ES FIELD O SINGLE