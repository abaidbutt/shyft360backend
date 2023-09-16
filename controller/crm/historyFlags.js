const db = require("../../middleware/db");
const dotenv = require("dotenv");
dotenv.config();
exports.createHistoryFlags = async (req, res) => {
  const { name, position } = req.body;
  try {
    const result = await db.historyFlags.create({
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
exports.fetchHistoryFlags = async (req, res) => {
  try {
    const data = await db.historyFlags.findMany();
    if (!data) throw { message: "Data not found" };
    res.json({ status: true, data: data });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.getHistoryFlags = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await db.historyFlags.findUnique({
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
exports.delHistoryFlags = async (req, res) => {
  const { id } = req.query;
  try {
    const del = await db.historyFlags.delete({
      where: {
        id,
      },
    });

    if (!del) throw { message: "You give wrong credentials" };
    res.json({ status: true, message: "This HistoryFlags has been delete" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.putHistoryFlags = async (req, res) => {
  const { name, position, id } = req.body;
  try {
    const result = await db.historyFlags.update({
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
