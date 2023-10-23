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
        Image1:{
            type: DataTypes.STRING(200),
            allowNull: false
        },
        ImageDetail:{
            type: DataTypes.STRING(200),
            allowNull: true
        },
        Care:{
            type: DataTypes.STRING(150),
            allowNull: true
        },
        Category:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
        },
        Gender:{
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        Size:{
            type: DataTypes.STRING(500),
            allowNull: false,
        }
    };
    let config = {
        tableName: "Products",
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config)
   
    return Product;
}