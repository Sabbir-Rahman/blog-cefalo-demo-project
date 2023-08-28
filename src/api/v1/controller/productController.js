/* eslint-disable import/extensions */
import db from '../model/index.js'

// create man models
const Product = db.products

// main work

// 1. create product
const addProduct = async(req, res) => {
  const info = {
    title: req.body.title,
    description: req.body.description,
  }

  const product = await Product.create(info)
  res.status(201).send(product)
  console.log(product)
}

// 2. get all products
const getAllProducts = async(req, res) => {
  const products = await Product.findAll()
  res.status(200).send(products)
}

// 3. get single product
const getOneProduct = async(req, res) => {
  const { id } = req.params
  const product = await Product.findOne({ where: { id } })
  res.status(200).send(product)
}

// edit product
const updateProduct = async(req, res) => {
  const { id } = req.params
  const product = await Product.update(req.body, { where: { id } })
  res.status(200).send(product)
}

// delet product
const deleteProduct = async(req, res) => {
  const { id } = req.params
  await Product.destroy({ where: { id } })
  res.status(204).json({ message: 'Product is deleted' })
}

export default {
  getAllProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
}
