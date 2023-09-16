const db = require("../../middleware/db");
const dotenv = require("dotenv");
dotenv.config();
exports.createTaskTemplate = async (req, res) => {
  const {
    urgent,

    title,
    details,
    link,

    color,
    attachment,
    assignTo,
    startDate,
    endDate,
    private,
    allday,

    status,
    types,
  } = req.body;
  try {
    const result = await db.taskTemplate.create({
      data: {
        urgent,
        title,
        details,
        link,
        color,
        attachment,
        startDate,
        endDate,
        allday,
        private,

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
exports.fetchTaskTemplate = async (req, res) => {
  try {
    const data = await db.taskTemplate.findMany({
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
exports.getTaskTemplate = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await db.taskTemplate.findUnique({
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
exports.delTaskTemplate = async (req, res) => {
  const { id } = req.query;
  try {
    const del = await db.taskTemplate.delete({
      where: {
        id,
      },
    });

    if (!del) throw { message: "You give wrong credentials" };
    res.json({ status: true, message: "This TaskTemplate has been delete" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.putTaskTemplate = async (req, res) => {
  const {
    urgent,

    title,
    details,
    link,

    color,
    attachment,
    assignTo,
    startDate,
    endDate,
    private,
    allday,

    status,
    types,
    id,
  } = req.body;
  try {
    const result = await db.taskTemplate.update({
      where: {
        id,
      },
      data: {
        urgent,
        title,
        details,
        link,
        color,
        attachment,
        startDate,
        endDate,
        allday,
        private,
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
