module.exports = (sequelize, DataTypes) =>{
    let alias = "Product";
    let cols = {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        Name: {
            type: DataTypes.STRING(),
            allowNull: true // le di un TRUE para que name, description y price pueda ser NULL, porque sino me tiraba un error de que "Product.Name cannot be null" y lo mismo con el resto
        },
        Description: {
            type: DataTypes.STRING(2000),
            allowNull: true
        },
        Price: {
            type: DataTypes.DECIMAL(20,2),
            allowNull: true
        },
        ImagePrincipal:{
            type: DataTypes.STRING(150),
            allowNull: false
        },
        Image1:{
            type: DataTypes.STRING(150),
            allowNull: true
        },
        Image2:{
            type: DataTypes.STRING(150),
            allowNull: true
        },
        Image3:{
            type: DataTypes.STRING(150),
            allowNull: true
        },
        OtherProperties:{
            type: DataTypes.STRING(150),
            allowNull: true
        },
        Categories_Id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
        },
        Gender_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
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