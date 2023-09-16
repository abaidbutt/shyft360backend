const db = require("../../middleware/db");
const dotenv = require("dotenv");
dotenv.config();
exports.createRole = async (req, res) => {
  const { firstName, lastName, email, password, permissions, type, accounts } =
    req.body;
  try {
    const result = await db.role.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        permissions,
        type,
        accounts,
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
exports.fetchRole = async (req, res) => {
  try {
    const data = await db.role.findMany();
    if (!data) throw { message: "Data not found" };
    res.json({ status: true, data: data });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.getRole = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await db.role.findUnique({
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
exports.delRole = async (req, res) => {
  const { id } = req.query;
  try {
    const del = await db.role.delete({
      where: {
        id,
      },
    });

    if (!del) throw { message: "You give wrong credentials" };
    res.json({ status: true, message: "This Role has been delete" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.putRole = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    permissions,
    type,
    accounts,
    id,
  } = req.body;
  try {
    const result = await db.role.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        email,
        password,
        permissions,
        type,
        accounts,
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
