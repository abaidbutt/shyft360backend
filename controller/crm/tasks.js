const db = require("../../middleware/db");
const dotenv = require("dotenv");
dotenv.config();
exports.createTasks = async (req, res) => {
  const {
    urgent,
    contacts,
    title,
    details,
    link,
    projects,
    deals,
    color,
    attachment,
    assignTo,
    startDate,
    endDate,
    allday,
    repeat,
    private,
    remind,
  } = req.body;
  try {
    const result = await db.tasks.create({
      data: {
        urgent,
        contacts,
        title,
        details,
        link,
        projects,
        deals,
        color,
        attachment,

        startDate,
        endDate,
        allday,
        repeat,
        private,
        remind,

        assignTo: { connect: assignTo.map((t) => ({ id: t.id })) },
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
exports.fetchTasks = async (req, res) => {
  try {
    const data = await db.tasks.findMany({
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
exports.getTasks = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await db.tasks.findUnique({
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
exports.delTasks = async (req, res) => {
  const { id } = req.query;
  try {
    const del = await db.tasks.delete({
      where: {
        id,
      },
    });

    if (!del) throw { message: "You give wrong credentials" };
    res.json({ status: true, message: "This Tasks has been delete" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.putTasks = async (req, res) => {
  const {
    urgent,
    contacts,
    title,
    details,
    link,
    projects,
    deals,
    color,
    attachment,
    assignTo,
    startDate,
    endDate,
    allday,
    repeat,
    private,
    remind,
    id,
  } = req.body;
  try {
    const result = await db.tasks.update({
      where: {
        id,
      },
      data: {
        urgent,
        contacts,
        title,
        details,
        link,
        projects,
        deals,
        color,
        attachment,

        startDate,
        endDate,
        allday,
        repeat,
        private,
        remind,

        assignTo: { connect: assignTo.map((t) => ({ id: t.id })) },
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
