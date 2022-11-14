// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dataProducts from '../../../database/data.json'

export default function handler(req, res) {
  let productId = req.query.slug
  if (req.method === 'GET') {
    const product = dataProducts.products.find((product) => product.id === parseInt(productId))
    return res.status(200).send(product)
  } else if (req.method === 'PUT') {
    const name = req.body.name
    const quantity = req.body.quantity
    const category = req.body.category
    const price = req.body.price
    const description = req.body.description
    const image = req.body.image
    const editProduct = {
      id: parseInt(productId),
      name,
      quantity,
      category,
      price,
      description,
      image
    }

    const editproductCheck = dataProducts.products.find((product) => product.id === parseInt(productId))
    if (!editproductCheck) {
      res.status(404)
      res.end()
      return
    }
    const index = dataProducts.products.findIndex((product) => product.id === parseInt(productId))

    dataProducts.products.splice(index, 1, editProduct)
    return res.status(204).send(dataProducts.products[index])
  
  } else if (req.method === 'DELETE') {
    const deletedproduct = dataProducts.products.find((product) => product.id === parseInt(productId))
    if (!deletedproduct) {
      res.status(404)
      res.end()
      return
    }
    const index = dataProducts.products.findIndex((product) => product.id === parseInt(productId))
    dataProducts.products.splice(index, 1)
    return res.status(204).send(deletedproduct)
  } else {
    res.status(405).end()
  }
}
