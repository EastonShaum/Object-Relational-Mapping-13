const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({

  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    }, 
    include: [
      {
        model: Product,
        // Need to get the right products here
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
      .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No tag found with this id'})
            return;
        }
        res.json(dbUserData);
      })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
