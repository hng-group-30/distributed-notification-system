import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

const rmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';

async function sendTestEmail() {
  const client = ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
      urls: [rmqUrl],
      queue: 'email.queue',
      queueOptions: {
        durable: true,
        arguments: { 'x-max-priority': 10 },
      },
    },
  });

  const msg = {
    request_id: 'test_' + Date.now(),
    user_id: 'local-test-user',
    email: 'fowosereademola@gmail.com',
    message: 'Hello! This is a local test email.',
    priority: 1,
    template_code: 'welcome_email',
    type: 'email',
  };

  client.emit('email', msg).subscribe({
    next: () => console.log('Test email job sent'),
    error: (err) => console.error('Failed to send test email:', err),
  });
}

sendTestEmail();
