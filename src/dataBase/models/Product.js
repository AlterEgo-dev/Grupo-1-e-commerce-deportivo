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

    // Product.associate = function (models) {

    //     Product.belongsTo(models.Size, {
    //         as: "Sizes",
    //         foreignKey: 'Size_id1',
    //     })
    // },
    // Product.associate = function (models) {
    //     Product.belongsTo(models.Gender,{
    //         as: "Genders",
    //         foreignKey: "Genders_id1",
    //     })
    // },
    // Product.associate = function (models) {
    //     Product.belongsTo(models.Category,{
    //         as: "Category",
    //         foreignKey: "Categories_Id",
    //     })
    // }

    //lo dejo comentado porque faltan las tablas para hacer el associate

    
    return Product;
}