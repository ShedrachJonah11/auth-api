import { Injectable } from '@nestjs/common';

interface PerformanceMetric {
  endpoint: string;
  method: string;
  duration: number;
  statusCode: number;
  timestamp: Date;
}

@Injectable()
export class PerformanceService {
  private metrics: PerformanceMetric[] = [];
  private readonly MAX_METRICS = 10000;

  recordMetric(endpoint: string, method: string, duration: number, statusCode: number): void {
    const metric: PerformanceMetric = {
      endpoint,
      method,
      duration,
      statusCode,
      timestamp: new Date(),
    };

    this.metrics.push(metric);

    // Keep only last N metrics
    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics = this.metrics.slice(-this.MAX_METRICS);
    }
  }

  getAverageResponseTime(endpoint?: string): number {
    const relevantMetrics = endpoint
      ? this.metrics.filter(m => m.endpoint === endpoint)
      : this.metrics;

    if (relevantMetrics.length === 0) return 0;

    const sum = relevantMetrics.reduce((acc, m) => acc + m.duration, 0);
    return sum / relevantMetrics.length;
  }

  getRequestCount(endpoint?: string, timeWindow?: number): number {
    let relevantMetrics = endpoint
      ? this.metrics.filter(m => m.endpoint === endpoint)
      : this.metrics;

    if (timeWindow) {
      const cutoff = new Date(Date.now() - timeWindow);
      relevantMetrics = relevantMetrics.filter(m => m.timestamp >= cutoff);
    }

    return relevantMetrics.length;
  }

  getErrorRate(endpoint?: string): number {
    const relevantMetrics = endpoint
      ? this.metrics.filter(m => m.endpoint === endpoint)
      : this.metrics;

    if (relevantMetrics.length === 0) return 0;

    const errors = relevantMetrics.filter(m => m.statusCode >= 400).length;
    return errors / relevantMetrics.length;
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  clearMetrics(): void {
    this.metrics = [];
  }
}

