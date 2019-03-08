import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class ViewsController {
  @Get()
  @Render('Index')
  public index() {
    // initial props
    return {
      title: 'Next with Nest',
    };
  }
}
