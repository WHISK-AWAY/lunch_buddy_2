const router = require('express').Router();
const { Tag } = require('../../db/index.cjs');
const { isAdmin } = require('../authMiddleware.cjs');

// Route - api/tags
router.get('/', async (req, res, next) => {
  try {
    const allTags = await Tag.findAll();
    res.json(allTags);
  } catch (error) {
    console.error(
      'Server issue when trying to retrieve tags, please try again later.'
    );
    next(error);
  }
});

// This will require the isAdmin middleware
// Route - api/tags/:tagId
router.put('/:tagId', isAdmin, async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.tagId);

    if (!tag) {
      return res.status(404).send('No tag found to update');
    } else {
      const updatedTag = await tag.update(req.body);
      res.json(updatedTag);
    }
  } catch (error) {
    console.error(
      `Server issue when trying to update tag: ${req.params.tagId}. Please try again later.`
    );
    next(error);
  }
});

router.delete('/:tagId', async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.tagId);
    if (!tag) {
      return res.status(404).send(`No tag found to delete`);
    }
    await tag.destroy();
    res.json(tag);
  } catch (error) {
    console.error(
      `Server issue when trying to delete tag: ${req.params.tagId}. Please try again later`
    );
    next(error);
  }
});

module.exports = router;
