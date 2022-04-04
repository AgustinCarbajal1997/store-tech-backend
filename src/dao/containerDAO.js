class ContainerDao {
  constructor(model) {
    this.model = model;
  }
  async getAll(options) {
    try {
      const data = await this.model.paginate({},options);
      return {
        status: 200,
        message: "Successfull request",
        data,
      };
    } catch (error) {
      throw {
        status: 500,
        message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
      };
    }
  }
  async getById(id) {
    try {
      const data = await this.model.findById(id);
      return {
        status: 200,
        message: "Successfull request",
        data,
      };
    } catch (error) {
      throw {
        status: 500,
        message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
      };
    }
  }
  async getOne(query) {
    try {
      const data = await this.model.findOne(query);
      return data;
    } catch (error) {
      throw { status: 500, message: "Ha ocurrido un error" };
    }
  }
  async getByQuery(query, options) {
    try {
      const data = await this.model.paginate(query, options);
      return {
        status: 200,
        message: "Successfull request",
        data,
      };
    } catch (error) {
      console.log(error)
      throw { status: 500, message: "Ha ocurrido un error" };
    }
  }

  async save(newData) {
    try {
      const createModel = new this.model(newData);
      const data = await createModel.save();
      return {
        status: 200,
        message: "Successfull request",
        data,
      };
    } catch (error) {
      throw { status: 500, message: "Ha ocurrido un error" };
    }
  }

  async updateById(id, query) {
    try {
      const data = await this.model.findByIdAndUpdate(id, query, { new: true });
      return {
        status: 200,
        message: "Successfull request",
        data,
      };
    } catch (error) {
      throw { status: 500, message: "Ha ocurrido un error" };
    }
  }
}

module.exports = ContainerDao;
