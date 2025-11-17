import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Webhook, WebhookDocument } from './schemas/webhook.schema';
import * as crypto from 'crypto';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);

  constructor(@InjectModel(Webhook.name) private webhookModel: Model<WebhookDocument>) {}

  async createWebhook(
    userId: string,
    url: string,
    event: string,
    headers: Record<string, string> = {},
  ): Promise<WebhookDocument> {
    const secret = this.generateSecret();
    const webhook = new this.webhookModel({
      userId,
      url,
      event,
      headers,
      secret,
    });
    return webhook.save();
  }

  async triggerWebhook(event: string, data: any): Promise<void> {
    const webhooks = await this.webhookModel.find({
      event,
      isActive: true,
    }).exec();

    for (const webhook of webhooks) {
      try {
        await this.sendWebhook(webhook, data);
        await this.webhookModel.updateOne(
          { _id: webhook._id },
          { lastTriggered: new Date() },
        );
      } catch (error) {
        this.logger.error(`Failed to send webhook ${webhook._id}: ${error.message}`);
      }
    }
  }

  private async sendWebhook(webhook: WebhookDocument, data: any): Promise<void> {
    const payload = JSON.stringify(data);
    const signature = this.generateSignature(payload, webhook.secret || '');

    const response = await fetch(webhook.url, {
      method: webhook.method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
        ...webhook.headers,
      },
      body: payload,
    });

    if (!response.ok) {
      throw new Error(`Webhook failed with status ${response.status}`);
    }
  }

  private generateSecret(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  private generateSignature(payload: string, secret: string): string {
    return crypto.createHmac('sha256', secret).update(payload).digest('hex');
  }
}

