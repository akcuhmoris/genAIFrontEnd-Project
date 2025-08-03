// website.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('website')
export class WebsiteController {
  @Get('url')
  getPublicWebsiteUrl(): { url: string } {
    return {
      url: 'https://portfoliowebsitebucketgen.s3.us-east-1.amazonaws.com/',
    };
  }
}
