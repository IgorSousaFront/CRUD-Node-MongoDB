const router = require('express').Router();

const Provider = require('../models/Provider')

// Create
router.post('/', async (req, res) => {

  const {
    name,
    corporateName,
    cnpj,
    segment,
    address,
    phone,
    email,
  } = req.body;

  if(!req.body) {
    res.status(422).json({error: 'Os campos estão vazios.'})
    return
  }

  const provider = {
    name,
    corporateName,
    cnpj,
    segment,
    address,
    phone,
    email,
  }

  try {
    await Provider.create(provider)

    res.status(201).json({message: 'Fornecedor cadastrado no sistema com sucesso.'})
  } catch (error) {
    res.status(500).json({error: error})
  }
})

// Read
router.get('/', async (req, res) => {
  try {
    const provider = await Provider.find()
    res.status(200).json(provider)
  } catch (error) {
    res.status(500).json({error: error})
  }
})

// Read by ID
router.get('/:id', async (req, res) => {
  const {id} = req.params

  try {
    const provider = await Provider.findOne({_id: id})

    if(!provider) {
      res.status(424).json({
        message: 'O usuário não foi encontrado'
      })
      return
    }

    res.status(200).json(provider)
  } catch (error) {
    res.status(500).json({error: error})
  }
})

// Update
router.patch('/:id', async (req, res) => {
  const {id} = req.params
  const {name, salary, approved} = req.body

  const provider = {
    name,
    corporateName,
    cnpj,
    segment,
    address,
    phone,
    email,
  }

  try {
    const updatedProvider = await Provider.updateOne({_id: id}, provider)

    if(updatedProvider.matchedCount === 0) {
      res.status(424).json({
        message: 'O usuário não foi encontrado'
      })

      return
    }

    res.status(200).json(provider)
  } catch (error) {
    res.status(500).json({error: error})
  }
})

router.delete('/:id', async (req, res) => {
  const {id} = req.params

  const provider = await Provider.findOne({_id: id})

  if(!provider) {
    res.status(422).json({message: 'O usuário não foi encontrado'})
    return
  }

  try {
    await Provider.deleteOne({_id: id})

    res.status(200).json({message: 'usuário removido com sucesso'})
  } catch (error) {
    res.status(500).json({error: error})
  }
})

module.exports = router