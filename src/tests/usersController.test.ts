import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";

describe("UsersController", () => {
    let user_id: string
    
    beforeAll(async () => {

    });
    
    afterAll(async () => {
        await prisma.user.delete({where : {id: user_id}})
    })

    it("should create new user successfully", async () => {
        const response = await request(app).post("/user").send({
            name: "Test User",
            email: "test@email.com", // Garante que o e-mail seja único
            password: "password123",
        });

        expect(response.status).toBe(201);
        expect(response.body.userWithoutPassword).toHaveProperty("id");
        expect(response.body.userWithoutPassword.name).toBe("Teste User");
        user_id = response.body.userWithoutPassword.id;
    });
});
