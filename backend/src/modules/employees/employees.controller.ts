import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('departmentId') departmentId?: string,
    @Query('roleName') roleName?: string,
    @Query('status') status?: string,
  ) {
    return this.employeesService.findAll({ search, departmentId, roleName, status });
  }

  @Get('departments')
  async getDepartments() {
    return this.employeesService.getDepartments();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.employeesService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() data: any, @Request() req: any) {
    const operatorName = req.user?.fullName || 'Admin';
    return this.employeesService.create(data, operatorName);
  }
}
