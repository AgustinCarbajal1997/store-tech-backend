const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;

describe("API - GET - /api/products/getAll", () => {
  it("Should return status 200", async () => {
    let response = await request.get("/api/products/getAll");
    expect(response.status).to.eql(200);
  });
  it("Should return an array", async () => {
    let response = await request.get("/api/products/getAll");
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array");
  });
});

describe("API - GET - /api/products/getById/:id", () => {
  it("Should return status 200", async () => {
    let response = await request.get(
      "/api/products/getById/617b171ca3e549c7264faa6e"
    );
    expect(response.status).to.eql(200);
  });
  it("Should return an object", async () => {
    let response = await request.get(
      "/api/products/getById/617b171ca3e549c7264faa6e"
    );
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("object");
  });
});

describe("API - GET - /api/products/getSeveralIds", () => {
  it("Should return status 200", async () => {
    let response = await request.get(
      "/api/products/getSeveralIds?q[]=617b171ca3e549c7264faa6b&q[]=617b171ca3e549c7264faa6d&q[]=617b171ca3e549c7264faa6e&q[]=617b171ca3e549c7264faa6f"
    );
    expect(response.status).to.eql(200);
  });
  it("Should return an array", async () => {
    let response = await request.get(
      "/api/products/getSeveralIds?q[]=617b171ca3e549c7264faa6b&q[]=617b171ca3e549c7264faa6d&q[]=617b171ca3e549c7264faa6e&q[]=617b171ca3e549c7264faa6f"
    );
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array");
  });
  it("Should return an array", async () => {
    let response = await request.get(
      "/api/products/getSeveralIds?q[]=617b171ca3e549c7264faa6b"
    );
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array");
  });
  it("Should return status 400 bad request", async () => {
    let response = await request.get(
      "/api/products/getSeveralIds?q[]=617b171ca3e549c7264faa6b&q[]="
    );
    expect(response.status).to.eql(400);
  });
});

describe("API - GET - /api/products/getComparison", () => {
  it("Should return status 200", async () => {
    let response = await request.get(
      "/api/products/getComparison?q[]=617b171ca3e549c7264faa6b&q[]=617b171ca3e549c7264faa6d&q[]=617b171ca3e549c7264faa6e&q[]=617b171ca3e549c7264faa6f"
    );
    expect(response.status).to.eql(200);
  });
  it("Should return an object", async () => {
    let response = await request.get(
      "/api/products/getComparison?q[]=617b171ca3e549c7264faa6b&q[]=617b171ca3e549c7264faa6d&q[]=617b171ca3e549c7264faa6e&q[]=617b171ca3e549c7264faa6f"
    );
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("object");
  });
  it("Should return status 400 bad request", async () => {
    let response = await request.get(
      "/api/products/getComparison?q[]=617b171ca3e549c7264faa6b"
    );
    expect(response.status).to.eql(400);
  });
  it("Should return status 400 bad request", async () => {
    let response = await request.get(
      "/api/products/getComparison?q[]=617b171ca3e549c7264faa6bq[]="
    );
    expect(response.status).to.eql(400);
  });
});

describe("API - GET - /api/products/getByDiscount/:discount", () => {
  it("Should return status 200", async () => {
    let response = await request.get("/api/products/getByDiscount/saleoff");
    expect(response.status).to.eql(200);
  });
  it("Should return an array", async () => {
    let response = await request.get("/api/products/getByDiscount/saleoff");
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array");
  });
  it("Should return status 400 bad request", async () => {
    let response = await request.get("/api/products/getByDiscount/sales");
    expect(response.status).to.eql(400);
  });
});

describe("API - GET - /api/products/getByCategory/:category", () => {
  it("Should return status 200", async () => {
    let response = await request.get("/api/products/getByCategory/cellphone");
    expect(response.status).to.eql(200);
  });
  it("Should return an array", async () => {
    let response = await request.get("/api/products/getByCategory/cellphone");
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array");
  });
  it("Should return an array", async () => {
    let response = await request.get("/api/products/getByCategory/cellphon");
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array").that.is.empty;
  });
});

describe("API - GET - /api/products/generalSearch", () => {
  it("Should return status 200", async () => {
    let response = await request.get(
      "/api/products/generalSearch?q[]=sam&q[]=a"
    );
    expect(response.status).to.eql(200);
  });
  it("Should return an array", async () => {
    let response = await request.get(
      "/api/products/generalSearch?q[]=sam&q[]=a"
    );
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array");
  });
  it("Should return status 400 bad request", async () => {
    let response = await request.get(
      "/api/products/generalSearch?q[]="
    );
    expect(response.status).to.eql(400);
  });
});
