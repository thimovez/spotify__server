/* eslint-disable prettier/prettier */
import { Controller, Get } from "@nestjs/common";

@Controller('/tracks')
export class TrackController {
    //создание трека
    create() {

    }
    @Get()
    getAll() {
        return 'Work'
    }
    //доп информация о треке
    getOne() {

    }
    //удалить трек
    delete() {

    }
}