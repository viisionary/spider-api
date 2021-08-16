import {Controller, Get} from "@tsed/common";

@Controller("/hi")
export class HelloWorldController {
  @Get("/")
  get() {
    return "hello";
  }
}
