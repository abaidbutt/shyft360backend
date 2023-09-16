const db = require("../../middleware/db");
const dotenv = require("dotenv");
dotenv.config();
exports.createAccount = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const result = await db.account.create({
      data: {
        firstName,
        lastName,
        email,
        password,
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
exports.fetchAccount = async (req, res) => {
  try {
    const data = await db.account.findMany();
    if (!data) throw { message: "Data not found" };
    res.json({ status: true, data: data });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.getAccount = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await db.account.findUnique({
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
exports.delAccount = async (req, res) => {
  const { id } = req.query;
  try {
    const del = await db.account.delete({
      where: {
        id,
      },
    });

    if (!del) throw { message: "You give wrong credentials" };
    res.json({ status: true, message: "This Account has been delete" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.putAccount = async (req, res) => {
  const { firstName, lastName, email, password, id } = req.body;
  try {
    const result = await db.account.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        email,
        password,
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
