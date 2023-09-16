const db = require("../../middleware/db");
const dotenv = require("dotenv");
dotenv.config();
exports.createSource = async (req, res) => {
  const { name, position } = req.body;
  try {
    const result = await db.source.create({
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
exports.fetchSource = async (req, res) => {
  try {
    const data = await db.source.findMany();
    if (!data) throw { message: "Data not found" };
    res.json({ status: true, data: data });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.getSource = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await db.source.findUnique({
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
exports.delSource = async (req, res) => {
  const { id } = req.query;
  try {
    const del = await db.source.delete({
      where: {
        id,
      },
    });

    if (!del) throw { message: "You give wrong credentials" };
    res.json({ status: true, message: "This Source has been delete" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.putSource = async (req, res) => {
  const { name, position, id } = req.body;
  try {
    const result = await db.source.update({
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
