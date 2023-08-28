const productSchema = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  })

  return Product
}

export default productSchema
