import {request} from 'https'
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression  } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_5_MINUTES)
  handleCron() {
    console.log('running cron')
    runCron()
    this.logger.debug('Called every 5 minutes');
  }
}


function runCron(){

  const options = {
    // hostname: 'localhost',
    hostname: process.env.RENDER_EXTERNAL_HOSTNAME,
    port: 443,
    path: '/',
    method: 'GET',
  };

  const req = request(options, res => {
    // console.log(res)
    res.on('data', (d) => {
      // process.stdout.write(d);
  });
    console.log(res.statusCode)
  })

  req.on('error', err => {
    console.log(err)
  })

  req.end()
}



