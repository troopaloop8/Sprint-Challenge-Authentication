const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

beforeEach(async () => {
  await db("users").truncate();
});

describe("server.js", () => {
  describe("POST /register", () => {
    it("should return 201", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "ab", password: "qwerty" });
      expect(res.status).toBe(201);
    });
    it("should return 400", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: true, password: null });
      expect(res.status).toBe(400);
    });

    it('should have a message of "Good job registering, buddy" upon registering', async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "abc", password: "qwerty" });
      let response = JSON.parse(res.text);
      expect(response.message).toBe("Good job registering, buddy");
    });

    //END OF POST REGISTER BLOCK
  });

  describe('POST /login', () => {
    it('should return 200', async () => {
      const register = await request(server).post('/api/auth/register').send({username: 'abcd', password: 'qwerty'});
      const res = await request(server).post('/api/auth/login').send({username: 'abcd', password: 'qwerty'});
      expect(res.status).toBe(200);
    })

    it('login message should be - "Welcome to our API, testbot"', async () => {
      const register = await request(server).post('/api/auth/register').send({username: 'testbot', password: 'qwerty'});
      const res = await request(server).post('/api/auth/login').send({username: 'testbot', password: 'qwerty'});
      let response = JSON.parse(res.text)
      expect(response.message).toBe("Welcome to our API, testbot");
    })

    it('should return 401', async () => {
      const register = await request(server).post('/api/auth/register').send({username: 'abcd', password: 'qwerty'});
      const res = await request(server).post('/api/auth/login').send({username: 'abcd', password: '12345'});
      expect(res.status).toBe(401);
    })

    it('login error message should be - Invalid credentials', async () => {
      const register = await request(server).post('/api/auth/register').send({username: 'testbot', password: 'qwerty'});
      const res = await request(server).post('/api/auth/login').send({username: 'testbot', password: '12345'});
      let response = JSON.parse(res.text)
      expect(response.message).toBe("Invalid credentials");
    })
  })

  //END OF MAIN BLOCK
});


