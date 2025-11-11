import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email/email.service';
import { EmailConsumer } from './email/email.consumer';
import { HealthController } from './email/health/health.controller';
import { MetricsController } from './email/metrics/metrics.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [HealthController, EmailConsumer, MetricsController],
  providers: [EmailService],
})
export class AppModule {}
