import { Controller, Get, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CookieAuthGuard } from "../auth/cookie-auth.guard";

@Controller("v1/users")
@UseGuards(CookieAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
