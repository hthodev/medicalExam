const { request } = require("express");

describe("login user", () => {
  describe("input parameter!", () => {
    test("login", async () => {
      const response = await request().post("/login").send({
        email: "abc",
        password: "123",
      });
      expect(response).tobe(200);
    });
  });
});
