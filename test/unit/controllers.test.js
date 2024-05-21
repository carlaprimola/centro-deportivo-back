// import request from "supertest";
// import server from "../../app.js";
// import ClientModel from "../models/clientModel.js";
// import db from "../database/db.js";
// import { startServer } from "../server.js";

// let server1;
// let newClientId = "";
// let createdClientId;
// let newClient = {
//   cif_cliente: "Test Client " + Date.now(),
//   nombre: "Test Client",
//   direccion: "Test Client",
//   poblacion: "Test Client",
//   provincia: "Test Client",
//   pais: "Test Client",
//   codigo_postal: "Test Client",
//   telefono: "Test Client",
//   email: "Test Client",
// };

// beforeAll(async () => {
//   try {
//     server1 = startServer();
//     const client = await ClientModel.create(newClient);
//     if (client) {
//       newClientId = client.cif_cliente;
//     } else {
//       console.error("Failed to create test client");
//     }
//   } catch (error) {
//     console.error("Error setting up test data: ", error);
//   }
// });

// describe("GET clients", () => {
//   test("should return status code 200 when clients has ben called", async () => {
//     const response = await request(server).get("/client/clients");
//     expect(response.status).toBe(200);
//   });
//   test("should return status code 404 when route does not exist", async () => {
//     const response = await request(server).get("/test");
//     expect(response.status).toBe(404);
//   });
//   test("should return status code 200 when one single client has been called", async () => {
//     const response = await request(server).get(`/client/client/${newClientId}`);
//     expect(response.status).toBe(200);
//   });
//   test("should return status code 404 when one single client has been called and it does not exist", async () => {
//     const response = await request(server).get("/client/1232");
//     expect(response.status).toBe(404);
//   });
// });

// describe("POST clients", () => {
//   // me tiene que devolver un status code xxx cuando cree una skill
//   const newClientMalformed = {
//     cliente: "",
//     nombre: "",
//   };
//   const newSkill = {
//     cif_cliente: "Test Client POST " + Date.now(),
//     nombre: "Test Client POST",
//     direccion: "Test Client POST",
//     poblacion: "Test Client POST",
//     provincia: "Test Client POST",
//     pais: "Test Client POST",
//     codigo_postal: "Test Client POST",
//     telefono: "Test Client POST",
//     email: "Test Client POST",
//   };
//   test("should return status code 201 when one client has been created", async () => {
//     const response = await request(server)
//       .post("/client/create-client")
//       .send(newSkill);
//     expect(response.status).toBe(201);
//     createdClientId = response.body.cif_cliente;
//   });

//   test("should return status code 400 when name is malformed", async () => {
//     const response = await request(server)
//       .post("/client/create-client")
//       .send(newClientMalformed);
//     expect(response.status).toBe(400);
//   });
// });

// afterAll(async () => {
//   try {
//     await ClientModel.destroy({
//       where: {
//         cif_cliente: newClientId,
//       },
//     });
//     if (createdClientId) {
//       await ClientModel.destroy({
//         where: {
//           cif_cliente: createdClientId,
//         },
//       });
//     }
//   } catch (error) {
//     console.error("Error cleaning up test data: ", error);
//   }
//   await db.close();
// });

// afterAll((done) => {
//   server1.close(done);
// });
