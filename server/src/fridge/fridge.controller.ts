import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtPayloadValidatedDto } from '../auth/dto/jwt-payload.dto';
import { FridgeService } from './fridge.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CreateFridgeDto } from './dto/create-fridge.dto';

@Controller('fridges')
export class FridgeController {
  constructor(private fridgeService: FridgeService) {}

  @UseGuards(JwtGuard)
  @Get()
  getFridges(@Req() req: { user: JwtPayloadValidatedDto }) {
    return this.fridgeService.getFridges(req.user.userId);
  }

  @UseGuards(JwtGuard)
  @Get(':fridgeId')
  getFridge(
    @Req() req: { user: JwtPayloadValidatedDto },
    @Param('fridgeId') fridgeId: string,
  ) {
    return this.fridgeService.getFridge(fridgeId, req.user.userId);
  }

  @UseGuards(JwtGuard)
  @Post()
  createFridge(
    @Req() req: { user: JwtPayloadValidatedDto },
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
    @Req() req: { user: JwtPayloadValidatedDto },
    @Param('fridgeId') fridgeId: string,
    @Body() updateFridgeDto: Partial<CreateFridgeDto>,
  ) {
    return this.fridgeService.updateFridge(
      fridgeId,
      req.user.userId,
      updateFridgeDto,
    );
  }

  @UseGuards(JwtGuard)
  @Delete(':fridgeId')
  deleteFridge(
    @Req() req: { user: JwtPayloadValidatedDto },
    @Param('fridgeId') fridgeId: string,
  ) {
    return this.fridgeService.deleteFridge(fridgeId, req.user.userId);
  }

}
