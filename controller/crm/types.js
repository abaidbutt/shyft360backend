const db = require("../../middleware/db");
const dotenv = require("dotenv");
dotenv.config();
exports.createTypes = async (req, res) => {
  const { name, position } = req.body;
  try {
    const result = await db.types.create({
      data: {
        name,
        position,
      },
    });
    if (!result) throw { message: "Data not created" };
    res.json({
      result: result,
      message: "Create Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
exports.fetchTypes = async (req, res) => {
  try {
    const data = await db.types.findMany();
    if (!data) throw { message: "Data not found" };
    res.json({ status: true, data: data });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.getTypes = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await db.types.findUnique({
      where: {
        id,
      },
    });

    if (!data) throw { message: "Data not found" };
    res.json({ status: true, data: data });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.delTypes = async (req, res) => {
  const { id } = req.query;
  try {
    const del = await db.types.delete({
      where: {
        id,
      },
    });

    if (!del) throw { message: "You give wrong credentials" };
    res.json({ status: true, message: "This Types has been delete" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.putTypes = async (req, res) => {
  const { name, position, id } = req.body;
  try {
    const result = await db.types.update({
      where: {
        id,
      },
      data: {
        name,
        position,
      },
    });
    if (!result) throw { message: "Data not updated" };
    res.json({
      result: result,
      message: "Update Successfully",
    });
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};
