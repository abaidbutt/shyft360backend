const db = require("../../middleware/db");
const dotenv = require("dotenv");
dotenv.config();
exports.createHistory = async (req, res) => {
  const {
    name,
    color,
    bestway,
    email,
    phone,
    source,
    organizations,
    types,
    status,
    assignTo,
  } = req.body;
  try {
    const result = await db.history.create({
      data: {
        name,
        color,
        bestway,
        email,
        phone,
        source: { connect: { id: source } },
        organizations: { connect: { id: organizations } },
        assignTo: { connect: assignTo.map((t) => ({ id: t.id })) },
        types: { connect: types.map((t) => ({ id: t.id })) },
        status: { connect: status.map((t) => ({ id: t.id })) },
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
exports.fetchHistory = async (req, res) => {
  try {
    const data = await db.history.findMany({
      include: {
        types: true,
        status: true,
        assignTo: true,
        organizations: true,
        source: true,
      },
    });
    if (!data) throw { message: "Data not found" };
    res.json({ status: true, data: data });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.getHistory = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await db.history.findUnique({
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
exports.delHistory = async (req, res) => {
  const { id } = req.query;
  try {
    const del = await db.history.delete({
      where: {
        id,
      },
    });

    if (!del) throw { message: "You give wrong credentials" };
    res.json({ status: true, message: "This History has been delete" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.putHistory = async (req, res) => {
  const {
    name,
    color,
    bestway,
    email,
    phone,
    source,
    organizations,
    types,
    status,
    assignTo,
    id,
  } = req.body;
  try {
    const result = await db.history.update({
      where: {},
      data: {
        name,
        color,
        bestway,
        email,
        phone,
        source: { connect: { id: source } },
        organizations: { connect: { id: organizations } },
        assignTo: { connect: assignTo.map((t) => ({ id: t.id })) },
        types: { connect: types.map((t) => ({ id: t.id })) },
        status: { connect: status.map((t) => ({ id: t.id })) },
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
