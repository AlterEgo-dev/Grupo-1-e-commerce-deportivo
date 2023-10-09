module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UserName: DataTypes.STRING,
      Email: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Avatar: DataTypes.STRING,
      Role: DataTypes.STRING,
      CreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {
      timestamps: false,
    });
  
    return User;
};
