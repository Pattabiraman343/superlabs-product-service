import prisma from "../utils/prisma.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      sku,
      images,
      category,
      brand,
      stock,
    } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        sku,
        images,
        category,
        brand,
        stock,
      },
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = req.query.q || "";
  
      const skip = (page - 1) * limit;
  
      const products = await prisma.product.findMany({
        where: {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              category: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              brand: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      });
  
      const totalProducts = await prisma.product.count({
        where: {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              category: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              brand: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
      });
      console.log(products);
      res.json({
        success: true,
        page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getSingleProduct = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await prisma.product.update({
        where: {
          id,
        },
        data: req.body,
      });
  
      res.json({
        success: true,
        message: "Product updated successfully",
        product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };export const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      await prisma.product.delete({
        where: {
          id,
        },
      });
  
      res.json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };