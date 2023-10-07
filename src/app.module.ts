import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ProfileRepository } from './repository/profile.repository';
import { AuthRepository } from './repository/auth.repository';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './jwt-strategy';
import { ProfileController } from './controller/profile.controller';
import { ProfileService } from './service/profile.service';
import { CouponService } from './service/coupon.service';
import { CouponController } from './controller/coupon.controller';
import { CouponRepository } from './repository/coupon.repository';
import { FeedbackController } from './controller/feedback.controller';
import { FeedbackService } from './service/feedback.service';
import { FeedbackRepository } from './repository/feedback.repository';
import { MessageController } from './controller/message.controller';
import { MessageService } from './service/message.service';
import { MessageRepository } from './repository/message.repository';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 86400 }
    }),
    TypeOrmModule.forFeature([
      ProfileRepository,
      AuthRepository,
      CouponRepository,
      FeedbackRepository,
      MessageRepository
    ]),
  ],
  controllers: [
    AppController,
    AuthController,
    ProfileController,
    CouponController,
    FeedbackController,
    MessageController
  ],
  providers: [
    JwtStrategy,
    AppService,
    AuthService,
    ProfileService,
    CouponService,
    FeedbackService,
    MessageService
  ],
  exports: [
    AuthService,
    ProfileService,
    CouponService,
    FeedbackService,
    MessageService,
    JwtStrategy,
    PassportModule
  ]
})


export class AppModule {
  constructor() {
    const logger = new Logger()
    logger.log(process.env.JWT_SECRET, "App module");
  }
}
