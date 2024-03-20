"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_express9 = __toESM(require("../node_modules/express/index.js"), 1);
var import_dotenv2 = __toESM(require("../node_modules/dotenv/lib/main.js"), 1);
var import_morgan = __toESM(require("../node_modules/morgan/index.js"), 1);

// routes/index.ts
var import_express8 = require("../node_modules/express/index.js");

// routes/authRoute.ts
var import_express = require("../node_modules/express/index.js");

// controller/auth.ts
var import_client = require("../node_modules/@prisma/client/default.js");
var import_bcrypt = require("../node_modules/bcrypt/bcrypt.js");
var import_jsonwebtoken = __toESM(require("../node_modules/jsonwebtoken/index.js"), 1);
var import_dotenv = __toESM(require("../node_modules/dotenv/lib/main.js"), 1);
import_dotenv.default.config();
var prisma = new import_client.PrismaClient();
var login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      return res.json({ message: "Please fill all the required fields" });
    }
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    });
    if (!user) {
      res.status(400);
      return res.json({ message: "Invalid password" });
    }
    if (!(0, import_bcrypt.compareSync)(password, user.hashedPassword)) {
      res.status(403);
      return res.json({ message: "Invalid password" });
    }
    const secret = process.env.JWT_SECRET;
    const token = import_jsonwebtoken.default.sign({ id: user.id }, secret);
    return res.json({ user, token });
  } catch (error) {
    console.log(error);
  }
};
var signUp = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    res.status(400);
    return res.json({ message: "Please fill all the required fields" });
  }
  const checkForDuplicteEmail = await prisma.user.findFirst({
    where: {
      email
    }
  });
  if (checkForDuplicteEmail) {
    res.status(500);
    return res.json({ message: "Email already exists" });
  }
  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword: (0, import_bcrypt.hashSync)(password, 10),
      name
    }
  });
  return res.json(user);
};
var me = async (req, res) => {
  return res.json(req.user);
};

// middlewares/authMiddleware.ts
var import_jsonwebtoken2 = __toESM(require("../node_modules/jsonwebtoken/index.js"), 1);
var import_client2 = require("../node_modules/@prisma/client/default.js");
var prisma2 = new import_client2.PrismaClient();
var authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(res.json({ message: "Unauthorized" }).status(401));
  }
  try {
    const payload = import_jsonwebtoken2.default.verify(token, process.env.JWT_SECRET);
    const user = await prisma2.user.findFirst({
      where: {
        id: payload.id
      }
    });
    if (!user) {
      return next(res.json({ message: "Unauthorized" }).status(401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(res.json({ message: "Unauthorized" }).status(401));
  }
};

// routes/authRoute.ts
var authRouter = (0, import_express.Router)();
authRouter.post("/login", login);
authRouter.post("/register", signUp);
authRouter.get("/me", [authMiddleware], me);
authRouter.get("/", (req, res) => {
  res.send("Auth route works");
});
var authRoute_default = authRouter;

// routes/productRoute.ts
var import_express2 = require("../node_modules/express/index.js");

// controller/product.ts
var import_client3 = require("../node_modules/@prisma/client/default.js");
var prisma3 = new import_client3.PrismaClient();
var createProduct = async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body;
    if (!name || !price || !description || !imageUrl)
      return res.status(400).json({ message: "Please fill all the required fields" });
    const product = await prisma3.products.create({
      data: {
        name,
        price,
        description,
        imageUrl
      }
    });
    return res.json(product);
  } catch (error) {
    console.log(error);
  }
};
var getProducts = async (req, res) => {
  try {
    const products = await prisma3.products.findMany();
    if (products.length === 0)
      return res.status(404).json({ message: "No products found, please add some products first!" });
    return res.json(products);
  } catch (error) {
    console.log(error);
  }
};
var getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Please fill all the required fields" });
    const product = await prisma3.products.findUnique({
      where: {
        id
      }
    });
    if (!product)
      return res.status(404).json({ message: "Product not found" });
    return res.json(product);
  } catch (error) {
    console.log(error);
  }
};
var updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Please fill all the required fields" });
    const { name, price, description, imageUrl } = req.body;
    if (!name || !price || !description || !imageUrl)
      return res.status(400).json({ message: "Please fill all the required fields" });
    const product = await prisma3.products.update({
      where: {
        id
      },
      data: {
        name,
        price,
        description,
        imageUrl
      }
    });
    return res.json(product);
  } catch (error) {
    console.log(error);
  }
};
var deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Please fill all the required fields" });
    const product = await prisma3.products.delete({
      where: {
        id
      }
    });
    return res.json(product);
  } catch (error) {
    console.log(error);
  }
};

// middlewares/admin.ts
var adminMiddleware = async (req, res, next) => {
  const user = req.user;
  if ((user == null ? void 0 : user.role.toUpperCase()) !== "ADMIN") {
    return next(res.json({ message: "Unauthorized" }).status(401));
  }
  next();
};

// routes/productRoute.ts
var productRouter = (0, import_express2.Router)();
productRouter.get("/", [authMiddleware], getProducts);
productRouter.get("/:id", [authMiddleware], getProduct);
productRouter.post("/", [authMiddleware, adminMiddleware], createProduct);
productRouter.put("/:id", [authMiddleware, adminMiddleware], updateProduct);
productRouter.delete("/:id", [authMiddleware, adminMiddleware], deleteProduct);
var productRoute_default = productRouter;

// routes/userRoute.ts
var import_express3 = require("../node_modules/express/index.js");

// controller/user.ts
var import_client4 = require("../node_modules/@prisma/client/default.js");
var import_bcrypt2 = require("../node_modules/bcrypt/bcrypt.js");
var prisma4 = new import_client4.PrismaClient();
var getAllUsers = (req, res) => {
  try {
    prisma4.user.findMany().then((users) => {
      res.status(200).json(users);
    });
  } catch (error) {
    console.log(error);
  }
};
var updateUser = async (req, res) => {
  var _a;
  const userId = (_a = req.user) == null ? void 0 : _a.id;
  const { password } = req.body;
  if (!userId) {
    return res.json({ message: "User not found" }).status(404);
  }
  if (!password) {
    return res.json({ message: "Name and password are required" }).status(404);
  }
  try {
    const updatedUser = await prisma4.user.update({
      where: { id: userId },
      data: {
        hashedPassword: (0, import_bcrypt2.hashSync)(password, 10)
      }
    });
    return res.json(updatedUser).status(200);
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error updating user" }).status(500);
  }
};

// routes/userRoute.ts
var userRouter = (0, import_express3.Router)();
userRouter.get("/", [authMiddleware, adminMiddleware], getAllUsers);
userRouter.put("/", [authMiddleware], updateUser);
var userRoute_default = userRouter;

// routes/cartRoute.ts
var import_express4 = require("../node_modules/express/index.js");

// controller/cart.ts
var import_client5 = require("../node_modules/@prisma/client/default.js");
var prisma5 = new import_client5.PrismaClient();
var addItemToCart = async (req, res) => {
  var _a;
  const userId = (_a = req == null ? void 0 : req.user) == null ? void 0 : _a.id;
  if (!userId) {
    return res.json({ message: "You are not logged in" }).status(404);
  }
  const { productId, quantity } = req.body;
  if (!productId || !quantity || !userId) {
    return res.json({ message: "Invalid request" });
  }
  const product = await prisma5.products.findFirst({
    where: {
      id: productId
    }
  });
  if (!product) {
    return res.json({ message: "Product not found" });
  }
  const user = await prisma5.user.findFirst({
    where: {
      id: userId
    }
  });
  if (!user) {
    return res.json({ message: "User not found" }).status(404);
  }
  try {
    const newCart = await prisma5.cartItems.create({
      data: {
        quantity,
        userId,
        productId
      }
    });
    return res.json(newCart);
  } catch (error) {
  }
};
var deleteItemFromCart = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.json({ message: "User not found" }).status(404);
  }
  const item = await prisma5.cartItems.findFirst({
    where: {
      AND: [
        { id: req.params.id },
        { userId: user.id }
      ]
    }
  });
  await prisma5.cartItems.delete({
    where: {
      id: req.params.id
    }
  });
  return res.json({ message: "Item deleted" }).status(200);
};
var changeQuantity = async (req, res) => {
  const user = req.user;
  const { quantity } = req.body;
  if (!quantity) {
    return res.json({ message: "Invalid request" }).status(400);
  }
  await prisma5.cartItems.update({
    where: {
      id: req.params.id,
      userId: user == null ? void 0 : user.id
    },
    data: {
      quantity
    }
  });
  return res.json({ message: "Quantity updated" }).status(200);
};
var getUserCart = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.json({ message: "You are not logged in" }).status(404);
  }
  const checkUser = await prisma5.user.findFirst({
    where: {
      id: user.id
    }
  });
  if (!checkUser) {
    return res.json({ message: "User not found" }).status(404);
  }
  const cart = await prisma5.cartItems.findMany({
    where: {
      userId: user.id
    },
    include: {
      product: true
    }
  });
  if (!cart) {
    return res.json({ message: "Cart is empty" }).status(200);
  }
  return res.json(cart).status(200);
};

// routes/cartRoute.ts
var cartRouter = (0, import_express4.Router)();
cartRouter.post("/", [authMiddleware], addItemToCart);
cartRouter.get("/", [authMiddleware], getUserCart);
cartRouter.get("/:id", [authMiddleware], getUserCart);
cartRouter.delete("/:id", [authMiddleware], deleteItemFromCart);
cartRouter.put("/:id", [authMiddleware], changeQuantity);
var cartRoute_default = cartRouter;

// routes/orderRoute.ts
var import_express5 = require("../node_modules/express/index.js");

// controller/order.ts
var import_client6 = require("../node_modules/@prisma/client/default.js");
var prisma6 = new import_client6.PrismaClient();
var createOrder = async (req, res) => {
  const user = req.user;
  const { address } = req.body;
  if (!user) {
    return res.json({ message: "You need to be logged in to make an order" }).status(404);
  }
  const userWithCartItems = await prisma6.user.findUnique({
    where: {
      id: user.id
    },
    include: {
      cartItems: {
        include: {
          product: true
        }
      }
    }
  });
  if (!userWithCartItems) {
    return res.json({ message: "User not found" }).status(404);
  }
  const totalPrice = userWithCartItems.cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.product.price * cartItem.quantity;
  }, 0);
  try {
    const newOrder = await prisma6.order.create({
      data: {
        address,
        userId: user.id,
        totalAmount: totalPrice
      }
    });
    return res.json(newOrder).status(201);
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error creating order" }).status(500);
  }
};
var getAllUserOrders = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.json({ message: "You need to be logged in to view your orders" }).status(404);
  }
  try {
    const userOrders = await prisma6.order.findMany({
      where: {
        userId: user.id
      },
      include: {
        user: {
          include: {
            cartItems: {
              include: {
                product: true
              }
            }
          }
        }
      }
    });
    return res.json({ userOrders }).status(200);
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error fetching orders" }).status(500);
  }
};
var deleteOrder = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.json({ message: "You need to be logged in to delete an order" }).status(404);
  }
  const orderId = req.params.id;
  if (!orderId) {
    return res.json({ message: "Order Id is required" }).status(404);
  }
  const item = await prisma6.order.findFirst({
    where: {
      AND: [
        { id: req.params.id },
        { userId: user.id }
      ]
    }
  });
  if (!item) {
    return res.json({ message: "Order not found" }).status(404);
  }
  try {
    await prisma6.order.delete({
      where: {
        id: orderId
      }
    });
    return res.json({ message: "Order deleted" }).status(200);
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error deleting order" }).status(500);
  }
};

// routes/orderRoute.ts
var orderRouter = (0, import_express5.Router)();
orderRouter.post("/", [authMiddleware], createOrder);
orderRouter.get("/", [authMiddleware], getAllUserOrders);
orderRouter.delete("/:id", [authMiddleware, adminMiddleware], deleteOrder);
var orderRoute_default = orderRouter;

// routes/feedbackRoute.ts
var import_express6 = require("../node_modules/express/index.js");

// controller/feedback.ts
var import_client7 = require("../node_modules/@prisma/client/default.js");
var prisma7 = new import_client7.PrismaClient();
var createFeedback = async (req, res) => {
  const { email, name, message } = req.body;
  if (!email || !name || !message) {
    return res.json({ message: "Invalid feeback !!!!" }).status(400);
  }
  try {
    await prisma7.feedback.create({
      data: {
        email,
        name,
        message
      }
    });
    return res.json({ message: "Feedback created successfully" }).status(201);
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error creating feedback" }).status(500);
  }
};
var getAllFeedbacks = async (req, res) => {
  const feedbacks = await prisma7.feedback.findMany();
  if (!feedbacks) {
    return res.json({ message: "No feedbacks found" }).status(404);
  }
  return res.json(feedbacks);
};

// routes/feedbackRoute.ts
var feedbackRouter = (0, import_express6.Router)();
feedbackRouter.post("/", createFeedback);
feedbackRouter.get("/", [authMiddleware], getAllFeedbacks);
var feedbackRoute_default = feedbackRouter;

// routes/contactRoute.ts
var import_express7 = require("../node_modules/express/index.js");

// controller/contact.ts
var import_client8 = require("../node_modules/@prisma/client/default.js");
var prisma8 = new import_client8.PrismaClient();
var createContact = async (req, res) => {
  const { email, name, message } = req.body;
  if (!email || !name || !message) {
    return res.json({ message: "Invalid feeback !!!!" }).status(400);
  }
  try {
    await prisma8.contact.create({
      data: {
        email,
        name,
        message
      }
    });
    return res.json({ message: "Your message has been received" }).status(201);
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error creating contact form" }).status(500);
  }
};
var getAllContactDetails = async (req, res) => {
  const allContact = await prisma8.contact.findMany();
  if (!allContact) {
    return res.json({ message: "No messages" }).status(404);
  }
  return res.json(allContact).status(200);
};

// routes/contactRoute.ts
var contactRouter = (0, import_express7.Router)();
contactRouter.post("/", createContact);
contactRouter.get("/", [authMiddleware], getAllContactDetails);
var contactRoute_default = contactRouter;

// routes/index.ts
var routes = (0, import_express8.Router)();
routes.use("/auth", authRoute_default);
routes.use("/product", productRoute_default);
routes.use("/user", userRoute_default);
routes.use("/cart", cartRoute_default);
routes.use("/order", orderRoute_default);
routes.use("/feedback", feedbackRoute_default);
routes.use("/contact", contactRoute_default);
var routes_default = routes;

// src/index.ts
var import_cors = __toESM(require("../node_modules/cors/lib/index.js"), 1);
import_dotenv2.default.config();
var app = (0, import_express9.default)();
app.use((0, import_morgan.default)("tiny"));
app.use((0, import_cors.default)());
app.use(import_express9.default.json());
app.use("/api", routes_default);
var PORT = process.env.DEVELOPMENT_PORT || 3e3;
app.get("/", (req, res) => {
  res.send("Welcome to the Food API Service!");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
