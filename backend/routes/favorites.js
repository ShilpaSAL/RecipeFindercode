const express = require('express');
const Favorite = require('../models/Favorite');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all favorites for current user
router.get('/', auth, async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    
    const query = { user: req.user._id };
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const favorites = await Favorite.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Favorite.countDocuments(query);

    res.json({
      favorites,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get a single favorite
router.get('/:id', auth, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new favorite
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, url, category, tags, isPublic } = req.body;

    const favorite = new Favorite({
      user: req.user._id,
      title,
      description,
      url,
      category: category || 'general',
      tags: tags || [],
      isPublic: isPublic || false
    });

    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a favorite
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, url, category, tags, isPublic } = req.body;

    const favorite = await Favorite.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        title,
        description,
        url,
        category,
        tags,
        isPublic
      },
      { new: true, runValidators: true }
    );

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a favorite
router.delete('/:id', auth, async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.json({ message: 'Favorite deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get categories for current user
router.get('/categories/list', auth, async (req, res) => {
  try {
    const categories = await Favorite.distinct('category', { user: req.user._id });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get tags for current user
router.get('/tags/list', auth, async (req, res) => {
  try {
    const tags = await Favorite.distinct('tags', { user: req.user._id });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
