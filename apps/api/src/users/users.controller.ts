import { Controller, Get, UseGuards } from "@nestjs/common";
import { CookieAuthGuard } from "../auth/cookie-auth.guard";
import { GetAllUsersHandler } from "./application/queries";
import { UserMapper } from "./infrastructure/persistence/typeorm/mappers";

@Controller("v1/users")
@UseGuards(CookieAuthGuard)
export class UsersController {
  constructor(private readonly getAllUsersHandler: GetAllUsersHandler) {}

  @Get()
  async findAll() {
    const users = await this.getAllUsersHandler.execute();
    return users.map((user) => ({
      id: user.getId(),
      email: user.getEmail().getValue(),
      name: user.getName(),
    }));
  }
}
