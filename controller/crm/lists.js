const db = require("../../middleware/db");
const dotenv = require("dotenv");
dotenv.config();
exports.createLists = async (req, res) => {
  const {
    name,
    description,
    types,
    status,
    assignType,
    assignStatus,
    assignTo,
    tags,
    filters,
  } = req.body;
  try {
    const result = await db.lists.create({
      data: {
        name,
        description,
        assignType,
        assignStatus,
        tags: { connect: { id: tags } },
        filters,
        assignTo: { connect: assignTo.map((t) => ({ id: t.id })) },
        status: { connect: status.map((t) => ({ id: t.id })) },
        types: { connect: types.map((t) => ({ id: t.id })) },
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
exports.fetchLists = async (req, res) => {
  try {
    const data = await db.lists.findMany({
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
exports.getLists = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await db.lists.findUnique({
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
exports.delLists = async (req, res) => {
  const { id } = req.query;
  try {
    const del = await db.lists.delete({
      where: {
        id,
      },
    });

    if (!del) throw { message: "You give wrong credentials" };
    res.json({ status: true, message: "This Lists has been delete" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.putLists = async (req, res) => {
  const {
    name,
    description,
    types,
    status,
    assignType,
    assignStatus,
    assignTo,
    tags,
    filters,
    id,
  } = req.body;
  try {
    const result = await db.lists.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        assignType,
        assignStatus,
        tags: { connect: { id: tags } },
        filters,
        assignTo: { connect: assignTo.map((t) => ({ id: t.id })) },
        status: { connect: status.map((t) => ({ id: t.id })) },
        types: { connect: types.map((t) => ({ id: t.id })) },
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
