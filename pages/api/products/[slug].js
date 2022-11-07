// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dataProducts from '../../../database/data.json'

export default function handler(req, res) {
  let productId = req.query.slug
  if (req.method === 'GET') {
    const product = dataProducts.products.find((product) => product.id === parseInt(productId))
    res.status(200).json(product)
  } else if (req.method === 'DELETE') {
    const deletedproduct = dataProducts.products.find((product) => product.id === parseInt(productId))
    const index = dataProducts.products.findIndex((product) => product.id === parseInt(productId))
    dataProducts.products.splice(index, 1)
    res.status(204).json(deletedproduct)
  } else {
    res.status(405).end()
  }
}
