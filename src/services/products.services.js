const orders = require("../utils/constants/orders");
const Factory = require("../dao/factory");
const getAll = async (page, limit, pagination, orderField, orderBy) => {
  try {
    const order = orderBy ? { [orderField]: orders[orderBy] } : { $natural: 1 };
    const options = {
      page,
      limit,
      pagination,
      sort: order,
    };
    const data = await Factory.models("product").getAll(options);
    return data;
  } catch (error) {
    throw error;
  }
};
const getById = async (id) => {
  try {
    const data = await Factory.models("product").getById(id);
    return data;
  } catch (error) {
    throw error;
  }
};
const getSeveralIds = async (q, page, limit, pagination) => {
  const options = {
    page,
    limit,
    pagination,
  };
  try {
    const query = { _id: { $in: q } };
    const data = await Factory.models("product").getByQuery(query, options);
    return data;
  } catch (error) {
    throw error;
  }
};
const getByDiscount = async (categoryDiscount, page, limit, pagination) => {
  try {
    const options = {
      page,
      limit,
      pagination,
    };
    const query = { [categoryDiscount]: { $gt: 0 } };
    const data = await Factory.models("product").getByQuery(query, options);
    return data;
  } catch (error) {
    throw error;
  }
};
const getByCategory = async (
  category,
  brandType,
  page,
  limit,
  pagination,
  orderField,
  orderBy
) => {
  try {
    const query = {
      article: category,
      "brand.name": brandType,
    };
    const order = orderBy ? { [orderField]: orders[orderBy] } : { $natural: 1 };
    const options = {
      page,
      limit,
      pagination,
      sort: order,
    };
    const data = await Factory.models("product").getByQuery(query, options);
    return data;
  } catch (error) {
    throw error;
  }
};

const generalSearch = async (q, page, limit, pagination) => {
  const options = {
    page,
    limit,
    pagination,
  };
  const regexList = q.map((item) => new RegExp(`${item}`, "i"));
  const query = { title: { $all: regexList } };
  try {
    const data = await Factory.models("product").getByQuery(query, options);
    return data;
  } catch (error) {
    throw error;
  }
};
const getComparison = async (ids, page, limit, pagination) => {
  try {
    const options = {
      page,
      limit,
      pagination,
    };
    if (ids.length < 2 || ids.length > 4)
      throw {
        status: 400,
        message: "Please, send an array with a number of id between 2 and 4",
      };

    const data = await Factory.models("product").getByQuery(
      {
        _id: { $in: ids },
      },
      options
    );
    const sameCategory = data.data.docs
      .slice(1)
      .every((item) => item.article === data.data.docs[0].article);
    if (!sameCategory)
      throw {
        status: 400,
        message: "Please, send products of the same category",
      };

    let fields = data.data.docs
      .reduce((ac, item) => [...ac, ...item.specifications], [])
      .reduce((ac, item) => {
        if (item.title in ac)
          return {
            ...ac,
            [item.title]: [...ac[item.title], item.especifications2],
          };
        return { ...ac, [item.title]: [item.especifications2] };
      }, {});

    let comparison = data.data.docs.map((item) => ({
      id: item.id,
      image: item.images[0],
      title: item.title,
      price: item.price,
    }));

    fields = {
      products: comparison,
      ...fields,
    };
    return { status: 200, message: "Successful request", data: fields };
  } catch (error) {
    throw error;
  }
};

const setFavorites = async (userId, productId) => {
  try {
    const queryAddUpdate = {
      $push: {
        favorites: productId,
      },
    };
    const queryDeleteUpdate = {
      $pull: {
        favorites: productId,
      },
    };
    const currentFavorites = await Factory.models("user").getById(userId);

    const existsFav = currentFavorites.data.favorites.find(
      (item) => item === productId
    );

    let update;
    existsFav
      ? (update = await Factory.models("user").updateById(
          userId,
          queryDeleteUpdate
        ))
      : (update = await Factory.models("user").updateById(
          userId,
          queryAddUpdate
        ));
    return update;
  } catch (error) {
    throw error;
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
