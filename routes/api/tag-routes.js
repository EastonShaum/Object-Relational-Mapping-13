const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'productsWithTags'
      }
    ]
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
        through: ProductTag,
        as: 'productsWithTags'
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
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbUserData => res.json(dbUserData))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id 
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
        res.status(404).json({ message: 'No tag found with this id'})
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
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
        res.status(404).json({ message: 'No tag found with this id'})
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
