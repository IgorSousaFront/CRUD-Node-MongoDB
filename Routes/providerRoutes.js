const router = require('express').Router();

const Provider = require('../models/Provider')

const cors = require('cors');

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

router.use(cors(corsOptions))

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
    res.status(422).json({error: "Campos vazios"})
    return
  }

  if(!name) {
    res.status(422).json({error: "Campo de 'name' vazio"})
    return
  }

  if(!corporateName) {
    res.status(422).json({error: "Campo de 'corporateName' vazio"})
    return
  }

  if(!cnpj) {
    res.status(422).json({error: "Campo de 'cnpj' vazio"})
    return
  }

  if(!segment) {
    res.status(422).json({error: "Campo de 'segment' vazio"})
    return
  }

  if(!phone) {
    res.status(422).json({error: "Campo de 'phone' vazio"})
    return
  }

  if(!email) {
    res.status(422).json({error: "Campo de 'email' vazio"})
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
  const {
    name,
    corporateName,
    cnpj,
    segment,
    address,
    phone,
    email,
  } = req.body

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