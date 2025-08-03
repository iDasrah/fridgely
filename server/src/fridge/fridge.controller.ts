import {
  Body,
  Controller,
  Get,
  Param,
  Post, Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtPayloadValidated } from '../auth/dto/user.dto';
import { FridgeService } from './fridge.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CreateFridgeDto } from './dto/create-fridge.dto';

@Controller('fridges')
export class FridgeController {
  constructor(private fridgeService: FridgeService) {}

  @UseGuards(JwtGuard)
  @Get()
  getFridges(@Req() req: { user: JwtPayloadValidated }) {
    return this.fridgeService.getFridges(req.user.userId);
  }

  @UseGuards(JwtGuard)
  @Get(':fridgeId')
  getFridge(
    @Req() req: { user: JwtPayloadValidated },
    @Param('fridgeId') fridgeId: string,
  ) {
    return this.fridgeService.getFridge(fridgeId, req.user.userId);
  }

  @UseGuards(JwtGuard)
  @Post()
  createFridge(
    @Req() req: { user: JwtPayloadValidated },
    @Body() createFridgeDto: CreateFridgeDto,
  ) {
    return this.fridgeService.createFridge({
      ...createFridgeDto,
      ownerId: req.user.userId,
    });
  }

  @UseGuards(JwtGuard)
  @Put(':fridgeId')
  updateFridge(
    @Req() req: { user: JwtPayloadValidated },
    @Param('fridgeId') fridgeId: string,
    @Body() updateFridgeDto: Partial<CreateFridgeDto>,
  ) {
    return this.fridgeService.updateFridge(
      fridgeId,
      req.user.userId,
      updateFridgeDto,
    );
  }
}
