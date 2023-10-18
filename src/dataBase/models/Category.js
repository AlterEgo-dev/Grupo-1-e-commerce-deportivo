module.exports = (sequelize, dataTypes) => {
    let Category = sequelize.define(
        'Category',
        {id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
            },
            Category: {
                type: dataTypes.STRING(100),
            }
        },
        {
            tableName: 'categories',
            timestamps: false,
        });
       Category.associate = function (models) {
           Category.hasMany(models.Product, {
                as: "products",
               foreignKey: "Categories_id"
        })
        }
        return Category
    };