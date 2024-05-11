import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

export class LoggerClass {
  private readonly logger;
  constructor(name: string) {
    this.logger = new Logger(name);
  }

  public handleDBExceptions(error: any) {
    // console.log(error.statusCode)
    if (error.code === '23502' || error.code === '42703')
      throw new BadRequestException(error.hint);
    if (error.status === 400) throw new BadRequestException(error.response);

    this.logger.error(error);
    // console.log(error)
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
