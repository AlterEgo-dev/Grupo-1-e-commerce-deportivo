module.exports = (sequelize, DataTypes) => {
    let alias = "Size_Product";
    let cols = {
        Size_Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        Product_Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        }
    };
    let config = {
        tableName: "sizes_has_products",
        timestamps: false
    }

    const Size_Product = sequelize.define(alias, cols, config);


    // NO TE VOY A MENTIR QUE HACIENDO LA ASOCIACION ME MARIE, CAPAZ LA PIFIE ALGO POR ACÁ O POR LA RELACIÓN QUE HAY EN PRODUCT.JS
        Size_Product.associate = function (models) {
        Size_Product.belongsToMany(models.Product, {
            through: "sizes_has_products",
            foreignKey: 'Size_Id', 
            otherKey: 'Product_Id', 
            as: 'Products'
        });
    }

    return Size_Product;
}
