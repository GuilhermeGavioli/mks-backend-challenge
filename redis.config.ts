import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisConfig {
  get host(): string {
    const r = process.env.REDIS_CONNECTION_STRING
    const host = `${r[0]}:${r[1]}`
      return  host
  }

  get port(): number {
    const r = process.env.REDIS_CONNECTION_STRING
    const port = Number(r[2])
      return  port
  }

  // redis://red-xxxxxxxxxxxxxxxxxxxx:6379

  
}

// docker run --name my-redis -d -p 6379:6379 --network my-net2 redis:7.0.15-alpine