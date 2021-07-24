const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]

  })
    .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No category found with this id'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.post('/', (req, res) => {
  // create a new category
  User.create({
    category_name: req.body.category_name
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    where: {
      id: req.params.id 
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
        res.status(404).json({ message: 'No category found with this id'})
        return;
    }
    res.json(dbUserData);
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id 
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
        res.status(404).json({ message: 'No category found with this id'})
        return;
    }
    res.json(dbUserData);
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;
