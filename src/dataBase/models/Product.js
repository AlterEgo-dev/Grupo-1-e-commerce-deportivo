module.exports = (sequelize, DataTypes) =>{
    let alias = "Product";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        Descripcion: {
            type: DataTypes.STRING(2000),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(20,2),
            allowNull: false
        },
        imagePrincipal:{
            type: DataTypes.STRING(150),
            allowNull: false
        },
        image1:{
            type: DataTypes.STRING(150),
            allowNull: true
        },
        image2:{
            type: DataTypes.STRING(150),
            allowNull: true
        },
        image3:{
            type: DataTypes.STRING(150),
            allowNull: true
        },
        otherProperties:{
            type: DataTypes.STRING(150),
            allowNull: true
        }
    };
    let config = {
        tableName: "Products",
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = function (models) {

        Product.belongsToMany(models.Size, {
            as: "Sizes",
            through: "sizes_has_products", 
            foreignKey: 'Product_Id',
            otherKey: "Size_Id"
        })
    },
    Product.associate = function (models) {
        Product.belongsTo(models.Gender,{
            as: "Genders",
            foreignKey: "Gender_id",
        })
    },
    Product.associate = function (models) {
        Product.belongsTo(models.Category,{
            as: "Category",
            foreignKey: "Categories_Id",
        })
    }

    
    return Product;
}