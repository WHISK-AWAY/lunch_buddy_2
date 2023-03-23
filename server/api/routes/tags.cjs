const router = require('express').Router();
const { Tag, Category } = require('../../db/index.cjs');
const { isAdmin, requireToken } = require('../authMiddleware.cjs');

// Route - api/tags
// Get ALL tags
router.get('/', requireToken, async (req, res, next) => {
  try {
    const allTags = await Tag.findAll({ include: Category });
    res.json(allTags);
  } catch (error) {
    console.error(
      'Server issue when trying to retrieve tags, please try again later.'
    );
    next(error);
  }
});

// Route - api/tags/:tagId
// Get a single tag
router.get('/:tagId', requireToken, async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.tagId);
    res.json(tag);
  } catch (error) {
    console.error(
      'Server issue when trying to retrieve this tag, please try again later.'
    );
    next(error);
  }
});

router.put('/:tagId', requireToken, isAdmin, async (req, res, next) => {
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

router.delete('/:tagId', requireToken, isAdmin, async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.tagId);
    if (!tag) {
      return res.status(404).send(`No tag found to delete`);
    }
    await tag.destroy();
    res.status(204).json(tag);
  } catch (error) {
    console.error(
      `Server issue when trying to delete tag: ${req.params.tagId}. Please try again later`
    );
    next(error);
  }
});

router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const [newTag, wasCreated] = await Tag.findOrCreate({
      where: { tagName: req.body.tagName },
      defaults: req.body,
    });
    if (!wasCreated) {
      return res.status(409).send('Tag already exists.');
    } else {
      res.status(201).json(newTag);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
