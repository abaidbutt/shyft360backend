const db = require("../../middleware/db");
const dotenv = require("dotenv");
dotenv.config();
exports.createProjects = async (req, res) => {
  const {
    title,
    details,
    link,
    frequency,
    completionDate,
    assignTo,
    addcalender,
    status,
    commission,
  } = req.body;
  try {
    const result = await db.projects.create({
      data: {
        title,
        details,
        link,
        frequency,
        assignTo: { connect: assignTo.map((t) => ({ id: t.id })) },
        completionDate,
        addcalender,
        status: { connect: status.map((t) => ({ id: t.id })) },
        commission,
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
exports.fetchProjects = async (req, res) => {
  try {
    const data = await db.projects.findMany({
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
exports.getProjects = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await db.projects.findUnique({
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
exports.delProjects = async (req, res) => {
  const { id } = req.query;
  try {
    const del = await db.projects.delete({
      where: {
        id,
      },
    });

    if (!del) throw { message: "You give wrong credentials" };
    res.json({ status: true, message: "This Projects has been delete" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.putProjects = async (req, res) => {
  const {
    title,
    details,
    link,
    frequency,
    completionDate,
    assignTo,
    addcalender,
    status,
    commission,
    id,
  } = req.body;
  try {
    const result = await db.projects.update({
      where: {
        id,
      },
      data: {
        title,
        details,
        link,
        frequency,
        assignTo: { connect: assignTo.map((t) => ({ id: t.id })) },
        completionDate,
        addcalender,
        status: { connect: status.map((t) => ({ id: t.id })) },
        commission,
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
