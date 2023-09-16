const db = require("../../middleware/db");
const dotenv = require("dotenv");
dotenv.config();
exports.createListsTags = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await db.listsTags.create({
      data: {
        name,
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
exports.fetchListsTags = async (req, res) => {
  try {
    const data = await db.listsTags.findMany();
    if (!data) throw { message: "Data not found" };
    res.json({ status: true, data: data });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.getListsTags = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await db.listsTags.findUnique({
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
exports.delListsTags = async (req, res) => {
  const { id } = req.query;
  try {
    const del = await db.listsTags.delete({
      where: {
        id,
      },
    });

    if (!del) throw { message: "You give wrong credentials" };
    res.json({ status: true, message: "This ListsTags has been delete" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.putListsTags = async (req, res) => {
  const { name, id } = req.body;
  try {
    const result = await db.listsTags.update({
      where: {
        id,
      },
      data: {
        name,
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
