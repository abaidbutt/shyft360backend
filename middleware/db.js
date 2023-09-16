const { Prisma, PrismaClient } = require("@prisma/client");
const db = new PrismaClient();
module.exports = { db };
