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
          res.render('detalle-producto.ejs', { products, product });
        })
      })   
  },

  productAdminList: (req, res) => {
    const { results } = dataBase;
    res.render('product-admin.ejs', { data: results });
  },

  productCreate: (req, res) => {
    res.render('product-create.ejs');
  },

  /** CREAR NUEVO PRODUCTO */

  productCreatePush: async (req, res) => {
    const { title, gender, description, price, category, sizes, cuidados } = req.body;

    //IMAGE PRINCIPAL

    const image1 = req.files['image1'][0]; // SOLO TRAE LA POSICIÓN 0
    const image1String = image1 ? `/img/productos/${image1.filename}` : 'sin-foto.png';

    // SUBIDA DE IMAGE DETAIL

    const imageDetailFiles = req.files['imageDetail'];
    
    let imageDetailString = 'sin-foto.png';
    
      if (imageDetailFiles.length > 0) {
           imageDetailString = imageDetailFiles.map(file => `/img/productos/${file.filename}`).join(', ');
       } // UN MAP QUE NOS MUESTRE LOS FILES Y AL FINAL UN JOIN PARA CONVERTIRLO EN STRING

    const sizesString = sizes.join(', ');

    try {
        await db.Product.create({
            Name: title,
            Description: description,
            Price: price,
            Image1: image1String,
            ImageDetail: imageDetailString,
            Care: cuidados,
            Category: category,
            Gender: gender,
            Size: sizesString,
        });

        res.redirect('/product/product-admin');
    } catch (error) {
        console.error(error);
    }
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
  
      try {
        await db.Product.update({
           Name: title,
           Description: description,
           Price: price,
           /* ImagePrincipal: image, */
           /* Image1: '',
           Image2: '',
           Image3: '', */
           OtherProperties: cuidados,
           /* Categories_Id: category,
           Gender_id: gender, */
          /*  Sizes: sizes, */
         },{
          where:{id}
         });
        
         /* for (const size of sizes) {
           await db.Size_Product.update({
             Size_Id: size,
             Product_Id: 3, // TA HARDCODEADO
           });
         }  */
     
         res.redirect('/product/product-edit/' + id);
       } catch (error) {
         console.error(error);
       }
      /* const product = results.find((prod) => prod.id === id);
      if (product) {
        product.title = title || product.title;
        product.price = precio || product.price;
 */
        /** ACA FILTRA EL ARRAY DE TALLES */
  
        /* if (Array.isArray(sizes)) {
          product.sizes = sizes.filter(size => size !== '');
 */
        /** EN CASO DE NO HABER OPCION, RELLENA CON ESPACIO VACIO PARA QUE ACTUE EL ELSE IF DEL DETALLE DE PRODUCTO */

       /*  } else {
          product.sizes = sizes ? [sizes] : [];
        }
  
        product.category = category || product.category;
        product.description = descripcion || product.description;
        product.cuidados = Cuidados || product.cuidados;
  
        if (req.files['image']) {
          if (product.image) {
            const oldImagePath = path.join(__dirname, '../../public', product.image);
            fs.unlinkSync(oldImagePath);
          }
          product.image = '/img/productos/' + req.files['image'][0].filename;
        }
  
        if (req.files['imageDetail']) {
          const newImages = req.files['imageDetail'].map(
            (file) => '/img/productos/' + file.filename
          );
          product.imageDetail = product.imageDetail.concat(newImages);
        }
  
        const filePath = path.join(__dirname, '../dataBase/productList.json');
        fs.writeFileSync(filePath, JSON.stringify(dataBase, null, 2));
  
        res.redirect(`/product/detail/${id}`);
      } else {
        res.status(404).send('Producto no encontrado');
      } */
    },
  
  
  
  /** BORRAR UN PRODUCTO */

  deleteProduct: async (req,res) => {
    await db.Product.destroy({ where: { id: req.params.id }});
    res.redirect('/product/product-admin'); 
  },
  

  //  deleteProduct: (req, res) => {
  //   const idProd = req.params.id; 
  //   const ind = dataBase.results.findIndex(product => product.id === idProd);

  //   if (ind !== -1) {
  //       dataBase.results.splice(ind, 1);
  //       const dbFilePath = path.join(__dirname, '../dataBase/productList.json');
  //       fs.writeFileSync(dbFilePath, JSON.stringify(dataBase, null, 4));
  //   }

  //   res.redirect('/product/product-admin'); 
  // },


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