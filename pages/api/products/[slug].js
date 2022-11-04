// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dataProducts from '../../../data.json'

export default function handler(req, res) {
    let id = req.query.slug
    let data = dataProducts.products.find(product => product.id == id)
    res.send(data)
}
  