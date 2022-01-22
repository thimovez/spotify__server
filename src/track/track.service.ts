/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Comment, CommentDocument } from "./shemas/comment.shema";
import { Track, TrackDocument } from "./shemas/track.shema";

@Injectable()
export class TrackService {
    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
    ) { }
    //создание трека
    async create() {

    }
    //получение всех треков из базы данных
    async getAll() {

    }
    //доп информация о треке
    async getOne() {

    }
    //удалить трек
    async delete() {

    }
}