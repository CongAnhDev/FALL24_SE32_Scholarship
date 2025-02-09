import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ScholarshipService } from './scholarship.service';
import { CreateScholarshipDto } from './dto/create-scholarship.dto';
import { UpdateScholarshipDto } from './dto/update-scholarship.dto';
import { Public, ResponseMessage, SkipCheckPermission, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('scholarship')
@Controller('scholarship')
export class ScholarshipController {
  constructor(private readonly scholarshipService: ScholarshipService) { }

  @Post()  // This decorator defines that this method will handle POST requests.
  @ResponseMessage("create a new scholarship")
  create(
    @Body() createScholarshipDto: CreateScholarshipDto,  // @Body decorator extracts the body of the incoming request, expected to be of type CreateScholarshipDto.
    @User() user: IUser
  ) {

    return this.scholarshipService.create(createScholarshipDto, user);
  }

  @Public()
  @Get('list-location')
  @ResponseMessage("Fetch all location")
  getListLocation() {
    return this.scholarshipService.getListLocation();
  }

  @Public()
  @Get('list-major')
  @ResponseMessage("Fetch all major search")
  getListMajor() {
    return this.scholarshipService.getListMajor();
  }

  @Public()
  @Get('list-level')
  @ResponseMessage("Fetch all level search")
  getListLevel() {
    return this.scholarshipService.getListLevel();
  }

  @Public()
  @Get('list-country')
  @ResponseMessage("Fetch all Country search")
  getListCountry() {
    return this.scholarshipService.getListCountry();
  }

  @Public()
  @Get('provider/:providerId')
  @ResponseMessage("Fetch scholarships by provider ID")
  findByProvider(@Param('providerId') providerId: string) {
    return this.scholarshipService.findByProvider(providerId);
  }

  // @Public()
  // @Get('list-location')
  // @ResponseMessage("Fetch all location")
  // getListLocation() {
  //   return this.scholarshipService.getListLocation();
  // }

  @Public()
  @Get()
  @ResponseMessage("Fetch List Scholarship with paginate")
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string,
  ) {
    return this.scholarshipService.findAll(+currentPage, +limit, qs); // Modify this line
  }

  @Public()
  @Get(':id')
  @ResponseMessage("Fetch a Scholarship with id")
  findOne(@Param('id') id: string) {
    return this.scholarshipService.findOne(id);
  }


  @Patch(':id')
  @ResponseMessage("Update a Scholarship")
  update(
    @Param('id') id: string,
    @Body() updateScholarshipDto: UpdateScholarshipDto,
    @User() user: IUser

  ) {
    return this.scholarshipService.update(id, updateScholarshipDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete a Scholarship")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.scholarshipService.remove(id, user);
  }
}