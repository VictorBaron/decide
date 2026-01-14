import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService
  ) {}

  async register(email: string, password: string) {
    const hash = await argon2.hash(password);
    const user = await this.users.createUser({ email, password: hash });
    return { id: user.id, email: user.email };
  }

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user || !user.password) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const ok = await argon2.verify(user.password, password);
    if (!ok) throw new UnauthorizedException("Invalid credentials");

    const token = await this.generateToken(user);
    return { token, user: { id: user.id, email: user.email, name: user.name } };
  }

  async generateToken(user: User) {
    return this.jwt.signAsync({
      sub: user.id,
      email: user.email,
      name: user.name,
    });
  }

  async verifyToken(token: string) {
    return this.jwt.verifyAsync(token);
  }
}
