/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { query } from "express";
import { ObjectId } from "mongoose";
import { CreateCommentDto } from "./dto/create.comment.dto";
import { CreateTrackDto } from "./dto/create.track.dto";
import { TrackService } from "./track.service";
//контроллер работает с http запросами
@Controller('/tracks')
export class TrackController {
    constructor(private trackService: TrackService) { }
    //создание трека картинка + аудио
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
        const { picture, audio } = files
        return this.trackService.create(dto, picture[0], audio[0]);
    }
    //получить все треки
    @Get()
    getAll(@Query('count') count: number,
        @Query('offset') offset: number) {
        return this.trackService.getAll(count, offset);
    }
    //поиск файлов
    @Get('/search')
    search(@Query('query') query: string) {
        return this.trackService.search(query);
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
    //добавление комментарияі
    @Post('/comments')
    addComment(@Body() dto: CreateCommentDto) {
        return this.trackService.addComment(dto);
    }
    //функция для подсчёта количества прослушиваний
    @Post('./listen/:id')
    listen(@Param('id') id: ObjectId) {
        return this.trackService.listen(id);
    }
}