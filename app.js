const express = require("express");
const { Prisma, PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const swaggerUi = require("swagger-ui-express");
let swaggerDocument = require("./swagger.json");

var cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
//CRM
app.use("/api/contacts", require("./routes/crm/contacts"));
app.use("/api/contactField", require("./routes/crm/contactField"));
app.use("/api/contacts", require("./routes/crm/contacts"));
app.use("/api/deals", require("./routes/crm/deals"));
app.use("/api/dealStatus", require("./routes/crm/dealStatus"));
app.use("/api/history", require("./routes/crm/history"));
app.use("/api/historyFlags", require("./routes/crm/historyFlags"));
app.use("/api/historyTypes", require("./routes/crm/historyTypes"));
app.use("/api/lists", require("./routes/crm/lists"));
app.use("/api/listsTags", require("./routes/crm/listsTags"));
app.use("/api/organization", require("./routes/crm/organization"));
app.use("/api/projects", require("./routes/crm/projects"));
app.use("/api/projectStatus", require("./routes/crm/projectStatus"));
app.use("/api/source", require("./routes/crm/source"));
app.use("/api/status", require("./routes/crm/status"));
app.use("/api/tasks", require("./routes/crm/tasks"));
app.use("/api/taskTemplate", require("./routes/crm/taskTemplate"));
app.use("/api/types", require("./routes/crm/types"));
// accounts
app.use("/api/account", require("./routes/account"));
app.use("/api/business", require("./routes/account/business"));
app.use("/api/role", require("./routes/account/role"));

app.post(`/signup`, async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const result = await prisma.account.create({
    data: {
      firstName,
      lastName,
      email,
      password,
    },
  });
  res.json(result);
});
app.post(`/login`, async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await prisma.account.findUnique({
      where: {
        email,
      },
    });
    if (result.password === password) {
      res.json(result);
    } else {
      res.status(404).json({
        error: `Something with Email or Password does not exist in the database`,
      });
    }
  } catch (error) {
    res.status(404).json({
      error: `Something with Email or Password does not exist in the database`,
    });
  }
});
app.post(`/business`, async (req, res) => {
  const { type, name, country, employees, time, sales, accountEmail } =
    req.body;
  try {
    console.log(req.body);
    const result = await prisma.business.create({
      data: {
        type,
        name,
        country,
        employees,
        time,
        sales,
        account: { connect: { email: accountEmail } },
      },
    });
    res.json(result);
  } catch (error) {
    res.status(404).json({
      error: `Something wrong with data ${error}`,
    });
  }
});
app.post(`/roletype`, async (req, res) => {
  const { email, firstName, lastName, password, permissions, type, accountId } =
    req.body;
  try {
    console.log(req.body);
    const result = await prisma.role.create({
      data: {
        email,
        firstName,
        lastName,
        password,
        permissions,
        type,
        accounts: { connect: { id: accountId } },
      },
    });
    res.json(result);
  } catch (error) {
    res.status(404).json({
      error: `Something wrong with data ${error}`,
    });
  }
});
app.post("/accounts", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await prisma.account.findMany({
      where: {
        email,
      },
      include: {
        Business: true,
        Role: true,
      },
    });

    res.json(result);
  } catch (error) {
    res.status(404).json({
      error: `Something wrong with data ${error}`,
    });
  }
});
app.get("/business", async (req, res) => {
  try {
    const result = await prisma.business.findMany({});

    res.json(result);
  } catch (error) {
    res.status(404).json({
      error: `Something wrong with data ${error}`,
    });
  }
});
app.post("/status", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await prisma.status.create({
      data: {
        name,
      },
    });

    res.json(result);
  } catch (error) {
    res.status(404).json({
      error: `Something wrong with data ${error}`,
    });
  }
});
app.post("/types", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await prisma.types.create({
      data: {
        name,
      },
    });

    res.json(result);
  } catch (error) {
    res.status(404).json({
      error: `Something wrong with data ${error}`,
    });
  }
});
app.post("/forms", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await prisma.forms.create({
      data: {
        name,
      },
    });

    res.json(result);
  } catch (error) {
    res.status(404).json({
      error: `Something wrong with data ${error}`,
    });
  }
});
app.get("/forms", async (req, res) => {
  try {
    const result = await prisma.forms.findMany({});

    res.json(result);
  } catch (error) {
    res.status(404).json({
      error: `Something wrong with data ${error}`,
    });
  }
});
app.get("/status", async (req, res) => {
  try {
    const result = await prisma.status.findMany({});

    res.json(result);
  } catch (error) {
    res.status(404).json({
      error: `Something wrong with data ${error}`,
    });
  }
});
app.get("/types", async (req, res) => {
  try {
    const result = await prisma.types.findMany({});

    res.json(result);
  } catch (error) {
    res.status(404).json({
      error: `Something wrong with data ${error}`,
    });
  }
});
app.get("/contacts", async (req, res) => {
  try {
    const result = await prisma.contacts.findMany({
      include: {
        types: true,
        status: true,
        assignTo: true,
        organizations: true,
        source: true,
      },
    });

    res.json(result);
  } catch (error) {
    res.status(404).json({
      error: `Something wrong with data ${error}`,
    });
  }
});
app.get("/organization", async (req, res) => {
  try {
    const result = await prisma.organization.findMany({
      include: {
        assignTo: true,
      },
    });

    res.json(result);
  } catch (error) {
    res.status(404).json({
      error: `Something wrong with data ${error}`,
    });
  }
});
app.post("/organization", async (req, res) => {
  const { name, address, website, image, phone, email, tags, assignTo } =
    req.body;

  try {
    const result = await prisma.organization.create({
      data: {
        name,
        address,
        website,
        image,
        phone,
        email,
        tags,
        assignTo: { connect: assignTo.map((t) => ({ id: t.id })) },
      },
    });

    res.json(result);
  } catch (error) {
    res.status(404).json({
      error: `Something wrong with data ${error}`,
    });
  }
});
app.post("/contacts", async (req, res) => {
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
    const result = await prisma.contacts.create({
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

    res.json(result);
  } catch (error) {
    res.status(404).json({
      error: `Something wrong with data ${error}`,
    });
  }
});

const port = process.env.PORT || 5000;
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
  })
);

app.listen(port, () => console.log(`Server ready at: http://localhost:5000 `));
// function addRefreshTokenToWhitelist({ jti, refreshToken, userId }) {
//   return prisma.refreshToken.create({
//     data: {
//       id: jti,
//       hashedToken: hashToken(refreshToken),
//       userId,
//     },
//   });
// }

// function createUserByEmailAndPassword(user) {
//   user.password = bcrypt.hashSync(user.password, 12);
//   return db.user.create({
//     data: user,
//   });
// }

// app.post(`/post`, async (req, res) => {
//   const { title, content, authorEmail } = req.body;
//   const result = await prisma.post.create({
//     data: {
//       title,
//       content,
//       author: { connect: { email: authorEmail } },
//     },
//   });
//   res.json(result);
// });

// app.put("/post/:id/views", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const post = await prisma.post.update({
//       where: { id: Number(id) },
//       data: {
//         viewCount: {
//           increment: 1,
//         },
//       },
//     });

//     res.json(post);
//   } catch (error) {
//     res.json({ error: `Post with ID ${id} does not exist in the database` });
//   }
// });

// app.put("/publish/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const postData = await prisma.post.findUnique({
//       where: { id: Number(id) },
//       select: {
//         published: true,
//       },
//     });

//     const updatedPost = await prisma.post.update({
//       where: { id: Number(id) || undefined },
//       data: { published: !postData?.published },
//     });
//     res.json(updatedPost);
//   } catch (error) {
//     res.json({ error: `Post with ID ${id} does not exist in the database` });
//   }
// });

// app.delete(`/post/:id`, async (req, res) => {
//   const { id } = req.params;
//   const post = await prisma.post.delete({
//     where: {
//       id: Number(id),
//     },
//   });
//   res.json(post);
// });

// app.get("/users", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

// app.get("/user/:id/drafts", async (req, res) => {
//   const { id } = req.params;

//   const drafts = await prisma.user
//     .findUnique({
//       where: {
//         id: Number(id),
//       },
//     })
//     .posts({
//       where: { published: false },
//     });

//   res.json(drafts);
// });

// app.get(`/post/:id`, async (req, res) => {
//   const { id } = req.params;

//   const post = await prisma.post.findUnique({
//     where: { id: Number(id) },
//   });
//   res.json(post);
// });
// app.get("/quotes", async (req, res) => {
//   const currentPage = req.query.page || 1;
//   const listPerPage = 5;
//   const offset = (currentPage - 1) * listPerPage;

//   const allQuotes = await prisma.post.findMany({
//     include: { author: true },
//     skip: offset,
//     take: listPerPage,
//   });

//   res.json({
//     data: allQuotes,
//     meta: { page: currentPage },
//   });
// });

// app.get("/feed", async (req, res) => {
//   const { searchString, skip, take, orderBy } = req.query;

//   const or = searchString
//     ? {
//         OR: [
//           { title: { contains: searchString } },
//           { content: { contains: searchString } },
//         ],
//       }
//     : {};

//   const posts = await prisma.post.findMany({
//     where: {
//       published: true,
//       ...or,
//     },
//     include: { author: true },
//     take: Number(take) || undefined,
//     skip: Number(skip) || undefined,
//     orderBy: {
//       updatedAt: orderBy,
//     },
//   });

//   res.json(posts);
// });
