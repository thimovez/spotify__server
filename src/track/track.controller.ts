/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { CreateTrackDto } from "./dto/create.track.dto";
import { TrackService } from "./track.service";

@Controller('/tracks')
export class TrackController {
    constructor(private trackService: TrackService) { }
    //создание трека
    @Post()
    create(@Body() dto: CreateTrackDto) {
        return this.trackService.create(dto);
    }
    //получить все треки
    @Get()
    getAll() {
        return this.trackService.getAll();
    }
    //доп информация о треке
    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.trackService.getOne(id);
    }
    //удалить трек
    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.trackService.delete(id);
    }
}