import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, name: true },
      orderBy: { name: "asc" },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByGoogleId(googleId: string) {
    return this.prisma.user.findUnique({ where: { googleId } });
  }

  createUser(data: { email: string; password: string }) {
    return this.prisma.user.create({ data });
  }

  createOAuthUser(data: { email: string; googleId: string; name?: string }) {
    return this.prisma.user.create({ data });
  }

  linkGoogleAccount(userId: string, googleId: string, name?: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { googleId, name: name ?? undefined },
    });
  }
}
