// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dataProducts from '../../../database/data.json'

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).send(dataProducts)
  } else if (req.method === 'POST') {
    const name = req.body.name
    const quantity = req.body.quantity
    const category = req.body.category
    const price = req.body.price
    const description = req.body.description
    const image = req.body.image
    const newProduct = {
      id: Date.now(),
      name,
      quantity,
      category,
      price,
      description,
      image
    }
    dataProducts.products.push(newProduct)
    res.status(201).json(newProduct)
  }
}


