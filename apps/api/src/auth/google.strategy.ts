import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback, Profile } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";
import {
  CreateOAuthUserHandler,
  CreateOAuthUserCommand,
  LinkGoogleAccountHandler,
  LinkGoogleAccountCommand,
} from "../core/users/application/commands";
import {
  GetUserByGoogleIdHandler,
  GetUserByGoogleIdQuery,
  GetUserByEmailHandler,
  GetUserByEmailQuery,
} from "../core/users/application/queries";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private readonly config: ConfigService,
    private readonly getUserByGoogleIdHandler: GetUserByGoogleIdHandler,
    private readonly getUserByEmailHandler: GetUserByEmailHandler,
    private readonly createOAuthUserHandler: CreateOAuthUserHandler,
    private readonly linkGoogleAccountHandler: LinkGoogleAccountHandler,
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
    done: VerifyCallback,
  ): Promise<void> {
    const { id: googleId, emails, displayName } = profile;
    const email = emails?.[0]?.value;

    if (!email) {
      return done(new Error("No email from Google"), undefined);
    }

    let user = await this.getUserByGoogleIdHandler.execute(
      new GetUserByGoogleIdQuery(googleId),
    );

    if (!user) {
      user = await this.getUserByEmailHandler.execute(
        new GetUserByEmailQuery(email),
      );

      if (user) {
        user = await this.linkGoogleAccountHandler.execute(
          new LinkGoogleAccountCommand({
            userId: user.getId(),
            googleId,
            name: displayName,
          }),
        );
      } else {
        user = await this.createOAuthUserHandler.execute(
          new CreateOAuthUserCommand({
            email,
            googleId,
            name: displayName,
          }),
        );
      }
    }

    const userJson = user.toJSON();
    done(null, userJson);
  }
}
