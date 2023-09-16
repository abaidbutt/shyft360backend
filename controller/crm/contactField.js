const db = require("../../middleware/db");
const dotenv = require("dotenv");
dotenv.config();
exports.createContactField = async (req, res) => {
  const { name, type, addContact, required, keydata } = req.body;
  try {
    const result = await db.contactField.create({
      data: {
        name,
        type,
        addContact,
        required,
        keydata,
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
exports.fetchContactField = async (req, res) => {
  try {
    const data = await db.contactField.findMany();
    if (!data) throw { message: "Data not found" };
    res.json({ status: true, data: data });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.getContactField = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await db.contactField.findUnique({
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
exports.delContactField = async (req, res) => {
  const { id } = req.query;
  try {
    const del = await db.contactField.delete({
      where: {
        id,
      },
    });

    if (!del) throw { message: "You give wrong credentials" };
    res.json({ status: true, message: "This ContactField has been delete" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.putContactField = async (req, res) => {
  const { name, type, addContact, required, keydata, id } = req.body;
  try {
    const result = await db.contactField.update({
      where: {
        id,
      },
      data: {
        name,
        type,
        addContact,
        required,
        keydata,
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
