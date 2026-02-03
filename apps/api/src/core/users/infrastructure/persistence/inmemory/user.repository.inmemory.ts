import { Injectable } from "@nestjs/common";
import { User, UserRepository } from "src/core/users/domain";

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) ?? null;
  }

  async findByIds(ids: string[]): Promise<User[]> {
    return ids
      .map((id) => this.users.get(id))
      .filter((user): user is User => user !== undefined);
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.toLowerCase();
    for (const user of this.users.values()) {
      if (user.getEmail().getValue() === normalizedEmail) {
        return user;
      }
    }
    return null;
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.getGoogleId() === googleId) {
        return user;
      }
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values()).sort((a, b) => {
      const nameA = a.getName() ?? "";
      const nameB = b.getName() ?? "";
      return nameA.localeCompare(nameB);
    });
  }

  async save(user: User): Promise<void> {
    this.users.set(user.getId(), user);
  }

  clear(): void {
    this.users.clear();
  }
}
