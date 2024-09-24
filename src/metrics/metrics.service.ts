import { Injectable } from '@nestjs/common';
import { register, Counter, Histogram, Gauge } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly httpRequestsTotal: Counter<string>;
  private readonly httpRequestDuration: Histogram<string>;
  private readonly activeUsers: Gauge<string>;
  private readonly databaseConnections: Gauge<string>;
  private readonly cacheHits: Counter<string>;
  private readonly cacheMisses: Counter<string>;

  constructor() {
    // HTTP request counter
    this.httpRequestsTotal = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code'],
    });

    // HTTP request duration histogram
    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.1, 0.5, 1, 2, 5, 10],
    });

    // Active users gauge
    this.activeUsers = new Gauge({
      name: 'active_users_total',
      help: 'Total number of active users',
    });

    // Database connections gauge
    this.databaseConnections = new Gauge({
      name: 'database_connections_active',
      help: 'Number of active database connections',
    });

    // Cache metrics
    this.cacheHits = new Counter({
      name: 'cache_hits_total',
      help: 'Total number of cache hits',
      labelNames: ['cache_type'],
    });

    this.cacheMisses = new Counter({
      name: 'cache_misses_total',
      help: 'Total number of cache misses',
      labelNames: ['cache_type'],
    });

    // Register metrics
    register.registerMetric(this.httpRequestsTotal);
    register.registerMetric(this.httpRequestDuration);
    register.registerMetric(this.activeUsers);
    register.registerMetric(this.databaseConnections);
    register.registerMetric(this.cacheHits);
    register.registerMetric(this.cacheMisses);
  }

  incrementHttpRequests(method: string, route: string, statusCode: number) {
    this.httpRequestsTotal.inc({ method, route, statusCode });
  }

  recordHttpRequestDuration(method: string, route: string, statusCode: number, duration: number) {
    this.httpRequestDuration.observe({ method, route, statusCode }, duration);
  }

  setActiveUsers(count: number) {
    this.activeUsers.set(count);
  }

  setDatabaseConnections(count: number) {
    this.databaseConnections.set(count);
  }

  incrementCacheHits(cacheType: string) {
    this.cacheHits.inc({ cache_type: cacheType });
  }

  incrementCacheMisses(cacheType: string) {
    this.cacheMisses.inc({ cache_type: cacheType });
  }

  async getMetrics(): Promise<string> {
    return register.metrics();
  }
}
