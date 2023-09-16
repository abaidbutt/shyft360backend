const db = require("../../middleware/db");
const dotenv = require("dotenv");
dotenv.config();
exports.createContacts = async (req, res) => {
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
    const result = await db.contacts.create({
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
exports.fetchContacts = async (req, res) => {
  try {
    const data = await db.contacts.findMany({
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
exports.getContacts = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await db.contacts.findUnique({
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
exports.delContacts = async (req, res) => {
  const { id } = req.query;
  try {
    const del = await db.contacts.delete({
      where: {
        id,
      },
    });

    if (!del) throw { message: "You give wrong credentials" };
    res.json({ status: true, message: "This Contacts has been delete" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.putContacts = async (req, res) => {
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
    const result = await db.contacts.update({
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
