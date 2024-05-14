import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

export const RawHeader = createParamDecorator(

    (data: string, ctx: ExecutionContext)=> {
        const req = ctx.switchToHttp().getRequest();
        return req.rawHeaders;
    }



);