import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: ":memory:",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
