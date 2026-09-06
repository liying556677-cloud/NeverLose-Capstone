// controllers/itemsController.js
// Handles item creation and listing. Photo upload is handled separately.

const { ItemService } = require("../services/itemService");

exports.createItem = async (req, res) => {
  try {
    const ownerId = req.user.uid;

    // photoUrl now comes from frontend after upload
    const item = await ItemService.createItem(ownerId, req.body);

    res.status(201).json({
      itemId: item.id,
      token: item.token,
      status: item.status,
      createdAt: item.createdAt,
      photoUrl: item.photoUrl,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listItems = async (req, res) => {
  try {
    const ownerId = req.user.uid;
    const items = await ItemService.listItems(ownerId);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to list items" });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await ItemService.getItemById(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (err) {
    console.error("Get item error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.updateItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const ownerId = req.user.uid;
    const updates = req.body;

    const updated = await ItemService.updateItem(itemId, ownerId, updates);

    if (!updated) {
      return res.status(403).json({ error: "Item not found or access denied" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Update item error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteItem =async (req, res)=> {
  try {
    const { itemId } = req.params;
     const ownerId = req.user.uid;

    await ItemService.deleteItem(itemId);

    return res.json({ ok: true, message: "Item deleted successfully" });
  } catch (err) {
    console.error("Delete item error:", err);
    return res.status(500).json({ error: "INTERNAL_ERROR" });
  }
};

exports.getItemByIdForOwner = async (req, res, next) => {
  try {
    const { itemId } = req.params;
const ownerId = req.user.uid;
    const item = await ItemService.getItemByIdForOwner(itemId,ownerId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }   
   res.json(item);
  } catch (err) {
    console.error("Get item error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

