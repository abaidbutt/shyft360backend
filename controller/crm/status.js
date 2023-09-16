const db = require("../../middleware/db");
const dotenv = require("dotenv");
dotenv.config();
exports.createStatus = async (req, res) => {
  const { name, position } = req.body;
  try {
    const result = await db.status.create({
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
exports.fetchStatus = async (req, res) => {
  try {
    const data = await db.status.findMany();
    if (!data) throw { message: "Data not found" };
    res.json({ status: true, data: data });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.getStatus = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await db.status.findUnique({
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
exports.delStatus = async (req, res) => {
  const { id } = req.query;
  try {
    const del = await db.status.delete({
      where: {
        id,
      },
    });

    if (!del) throw { message: "You give wrong credentials" };
    res.json({ status: true, message: "This Status has been delete" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.putStatus = async (req, res) => {
  const { name, position, id } = req.body;
  try {
    const result = await db.status.update({
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
