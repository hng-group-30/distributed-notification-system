import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import * as client from 'prom-client';

const registry = new client.Registry();
client.collectDefaultMetrics({ register: registry });

export const emailsSent = new client.Counter({
  name: 'email_sent_total',
  help: 'Total emails successfully sent',
});
export const emailsFailed = new client.Counter({
  name: 'email_failed_total',
  help: 'Total emails failed (transient)',
});
export const emailsBounced = new client.Counter({
  name: 'email_bounced_total',
  help: 'Total emails permanently failed/bounced',
});

registry.registerMetric(emailsSent);
registry.registerMetric(emailsFailed);
registry.registerMetric(emailsBounced);

@Controller('metrics')
export class MetricsController {
  @Get()
  async getMetrics(@Res() res: Response) {
    res.setHeader('Content-Type', registry.contentType);
    res.send(await registry.metrics());
  }
}
