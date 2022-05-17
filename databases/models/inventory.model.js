const { model, Schema } = require("mongoose");

const inventorySchema = new Schema({
  itemName: {
    type: String,
    required: [true, "Item name is required"],
  },
  itemNumber: {
    type: Number,
    required: [true, "Number of items is required"]
  },
});

module.exports = new model('inventory', inventorySchema);
