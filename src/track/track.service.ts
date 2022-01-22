/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateTrackDto } from "./dto/create.track.dto";
import { Comment, CommentDocument } from "./shemas/comment.shema";
import { Track, TrackDocument } from "./shemas/track.shema";

@Injectable()
export class TrackService {
    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
    ) { }
    //создание трека
    async create(dto: CreateTrackDto): Promise<Track> {
        const track = await this.trackModel.create({ ...dto, listens: 0 });
        return track;
    }
    //получение всех треков из базы данных
    async getAll(): Promise<Track[]> {
        const tracks = await this.trackModel.find();
        return tracks;
    }
    //доп информация о треке
    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id);
        return track;
    }
    //удалить трек
    async delete(id: ObjectId): Promise<ObjectId> {
        const track = await this.trackModel.findByIdAndDelete(id);
        return track._id;
    }
}