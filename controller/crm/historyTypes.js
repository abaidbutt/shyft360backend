const db = require("../../middleware/db");
const dotenv = require("dotenv");
dotenv.config();
exports.createHistoryTypes = async (req, res) => {
  const { name, position } = req.body;
  try {
    const result = await db.historyTypes.create({
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
exports.fetchHistoryTypes = async (req, res) => {
  try {
    const data = await db.historyTypes.findMany();
    if (!data) throw { message: "Data not found" };
    res.json({ status: true, data: data });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.getHistoryTypes = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await db.historyTypes.findUnique({
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
exports.delHistoryTypes = async (req, res) => {
  const { id } = req.query;
  try {
    const del = await db.historyTypes.delete({
      where: {
        id,
      },
    });

    if (!del) throw { message: "You give wrong credentials" };
    res.json({ status: true, message: "This HistoryTypes has been delete" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.putHistoryTypes = async (req, res) => {
  const { name, position, id } = req.body;
  try {
    const result = await db.historyTypes.update({
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
