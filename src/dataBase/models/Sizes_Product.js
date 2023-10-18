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

    return Size_Product;
}
