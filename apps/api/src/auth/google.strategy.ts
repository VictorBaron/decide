import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback, Profile } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private readonly config: ConfigService,
    private readonly users: UsersService
  ) {
    super({
      clientID: config.get<string>("GOOGLE_CLIENT_ID")!,
      clientSecret: config.get<string>("GOOGLE_CLIENT_SECRET")!,
      callbackURL: config.get<string>("GOOGLE_CALLBACK_URL")!,
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<void> {
    const { id: googleId, emails, displayName } = profile;
    const email = emails?.[0]?.value;

    if (!email) {
      return done(new Error("No email from Google"), undefined);
    }

    let user = await this.users.findByGoogleId(googleId);

    if (!user) {
      user = await this.users.findByEmail(email);

      if (user) {
        user = await this.users.linkGoogleAccount(user.id, googleId, displayName);
      } else {
        user = await this.users.createOAuthUser({
          email,
          googleId,
          name: displayName,
        });
      }
    }

    done(null, user);
  }
}
