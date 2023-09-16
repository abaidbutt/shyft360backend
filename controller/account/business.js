const db = require("../../middleware/db");
const dotenv = require("dotenv");
dotenv.config();
exports.createBusiness = async (req, res) => {
  const {
    type,
    name,
    country,
    employees,
    time,
    sales,
    status,
    emailSend,
    account,
  } = req.body;
  try {
    const result = await db.business.create({
      data: {
        type,
        name,
        country,
        employees,
        time,
        sales,
        status,
        emailSend,
        account: { connect: { id: account } },
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
exports.fetchBusiness = async (req, res) => {
  try {
    const data = await db.business.findMany();
    if (!data) throw { message: "Data not found" };
    res.json({ status: true, data: data });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.getBusiness = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await db.business.findUnique({
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
exports.delBusiness = async (req, res) => {
  const { id } = req.query;
  try {
    const del = await db.business.delete({
      where: {
        id,
      },
    });

    if (!del) throw { message: "You give wrong credentials" };
    res.json({ status: true, message: "This Business has been delete" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.putBusiness = async (req, res) => {
  const {
    type,
    name,
    country,
    employees,
    time,
    sales,
    status,
    emailSend,
    account,
    id,
  } = req.body;
  try {
    const result = await db.business.update({
      where: {
        id,
      },
      data: {
        type,
        name,
        country,
        employees,
        time,
        sales,
        status,
        emailSend,
        account,
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
