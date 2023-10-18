const path = require('path');
const fs = require('fs');
const dataBase = require('../dataBase/productList.json');// hay que borrar cuando pasemos todo a base de datos
const {results} = require('../dataBase/productList.json');// hay que borrar cuando pasemos todo a base de datos
const db = require('../dataBase/models'); //este hay que usar para usar la base de datos
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
    const { id } = req.params;
    const { results } = dataBase;
    const product = results.find((prod) => prod.id === id);
    res.render('detalle-producto.ejs', { product, products: results });
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
    const image = req.file ? `/img/productos/${req.file.filename}` : 'sin-foto.png';

    console.log(req.body)
  
    try {
     await db.Product.create({
        Name: title,
        Description: description,
        Price: price,
        ImagePrincipal: image,
        Image1: '',
        Image2: '',
        Image3: '',
        OtherProperties: cuidados,
        Categories_Id: category,
        Gender_id: gender,
        Sizes: sizes,
      });
     
      for (const size of sizes) {
        await db.Size_Product.create({
          Size_Id: size,
          Product_Id: 3, // TA HARDCODEADO
        });
      } 
  
      res.redirect('/product/product-admin');
    } catch (error) {
      console.error(error);
    }
  },
  /** RENDERIZACION DE LA VISTA  */
  
  productEditForm: (req, res) => {
    const { id } = req.params;
    const { results } = dataBase;
    const product = results.find((prod) => prod.id === id);
    res.render('product-edit.ejs', { product, products: results });
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

  saveEditedProduct: 
    (req, res) => {
      const { id } = req.params;
      const { title, precio, sizes, category, descripcion, Cuidados } = req.body;
      const { results } = dataBase;
  
      const product = results.find((prod) => prod.id === id);
      if (product) {
        product.title = title || product.title;
        product.price = precio || product.price;

        /** ACA FILTRA EL ARRAY DE TALLES */
  
        if (Array.isArray(sizes)) {
          product.sizes = sizes.filter(size => size !== '');

        /** EN CASO DE NO HABER OPCION, RELLENA CON ESPACIO VACIO PARA QUE ACTUE EL ELSE IF DEL DETALLE DE PRODUCTO */

        } else {
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
      }
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
    const selectedGenero = req.params.genero;
    const { results } = dataBase;
    const result = results.filter((e)=>{
      return e.genero == selectedGenero
    })
    res.render("product-category.ejs", { result })
  },
  category: (req, res) => {
    const selectedCategory = req.params.category;
    const { results } = dataBase;
    const result = results.filter((e)=>{
      return e.category == selectedCategory
    })
    res.render("product-category.ejs", { result })
  },
  search: (req, res) =>{
    const busqueda = req.query.search
    const arrBusqueda = results.filter((e)=>{ 
      return e.title.includes(busqueda)})
    res.render('product-search.ejs', { arrBusqueda })
  }
};

const upload = multer({ storage: storage });

module.exports = { upload, productController }; // EXPORTE EL UPLOAD PARA REQUERIRLO DIRECTAMENTE EN LA RUTA SEGUN LAS NECESIDADES, SI ES FIELD O SINGLE