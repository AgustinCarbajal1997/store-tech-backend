const products = require("../services/products.services");
const errorHandle = require("../utils/functions/errorHandle");
const getAll = async (req, res) => {
  const { page, limit, pagination, orderField, orderBy } = req.query;
  try {
    const data = await products.getAll(
      page || 1,
      limit || 3,
      pagination || false,
      orderField,
      orderBy
    );
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};
const getById = async (req, res) => {
  try {
    const data = await products.getById(req.params.id);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};

const getSeveralIds = async (req, res) => {
  const { page, limit, pagination } = req.query;
  try {
    const data = await products.getSeveralIds(
      req.query.q,
      page || 1,
      limit || 12,
      pagination || false
    );
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};
const getByDiscount = async (req, res) => {
  const { page, limit, pagination } = req.query;
  try {
    const data = await products.getByDiscount(
      req.params.discount,
      page || 1,
      limit || 12,
      pagination || false
    );
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};

const getByCategory = async (req, res) => {
  const { page, limit, pagination, orderField, orderBy } = req.query;
  const { category } = req.params;
  const brandType = req.query.brandType || /^/;
  try {
    const data = await products.getByCategory(
      category,
      brandType,
      page || 1,
      limit || 3,
      pagination || false,
      orderField || "price",
      orderBy
    );
    return res.status(data.status).json(data);
  } catch (error) {
    console.log(error);
    errorHandle(res, error);
  }
};
const generalSearch = async (req, res) => {
  const { q, page, limit, pagination } = req.query;
  try {
    const data = await products.generalSearch(q, page, limit, pagination);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};
const getComparison = async (req, res) => {
  const { page, limit, pagination } = req.query;
  try {
    const data = await products.getComparison(
      req.query.q,
      page || 1,
      limit || 4,
      pagination || false,
    );
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};

const setFavorites = async (req, res) => {
  const { productId } = req.body;
  const { id: userId } = req.user;
  try {
    const data = await products.setFavorites(userId, productId);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};

module.exports = {
  getAll,
  getById,
  getSeveralIds,
  getByDiscount,
  getByCategory,
  generalSearch,
  getComparison,
  setFavorites,
};
