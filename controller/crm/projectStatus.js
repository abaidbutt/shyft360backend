const db = require("../../middleware/db");
const dotenv = require("dotenv");
dotenv.config();
exports.createProjectStatus = async (req, res) => {
  const { name, position } = req.body;
  try {
    const result = await db.projectStatus.create({
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
exports.fetchProjectStatus = async (req, res) => {
  try {
    const data = await db.projectStatus.findMany();
    if (!data) throw { message: "Data not found" };
    res.json({ status: true, data: data });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.getProjectStatus = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await db.projectStatus.findUnique({
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
exports.delProjectStatus = async (req, res) => {
  const { id } = req.query;
  try {
    const del = await db.projectStatus.delete({
      where: {
        id,
      },
    });

    if (!del) throw { message: "You give wrong credentials" };
    res.json({ status: true, message: "This ProjectStatus has been delete" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.putProjectStatus = async (req, res) => {
  const { name, position, id } = req.body;
  try {
    const result = await db.projectStatus.update({
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
