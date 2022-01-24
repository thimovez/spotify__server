/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { FileService, FileType } from "src/file/file.service";
import { CreateCommentDto } from "./dto/create.comment.dto";
import { CreateTrackDto } from "./dto/create.track.dto";
import { Comment, CommentDocument } from "./shemas/comment.shema";
import { Track, TrackDocument } from "./shemas/track.shema";

@Injectable()
export class TrackService {
    [x: string]: any;
    //обращение к моделям через this
    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        private fileService: FileService) { }
    //создание трека
    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
        const track = await this.trackModel.create({ ...dto, listens: 0, audio: audioPath, picture: picturePath });
        return track;
    }
    //получение всех треков из базы данных
    async getAll(count = 10, offset = 0): Promise<Track[]> {
        const tracks = await this.trackModel.find().skip(Number(offset)).limit(Number(count));
        return tracks;
    }
    //поиск файла
    async search(query: string): Promise<Track[]> {
        const tracks = await this.trackModel.find({
            name: { $regex: new RegExp(query, 'i') }
        })
        return tracks;
    }
    //доп информация о треке
    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id).populate('comments');
        return track;
    }
    //удалить трек
    async delete(id: ObjectId): Promise<ObjectId> {
        const track = await this.trackModel.findByIdAndDelete(id);
        return track._id;
    }
    //добавление комментариев
    async addComment(dto: CreateCommentDto): Promise<Comment> {
        const track = await this.trackModel.findById(dto.trackId);
        const comment = await this.commentModel.create({ ...dto });
        track.comments.push(comment._id);
        await track.save();
        return comment;
    }
    // счетчик прослушиваний
    async listen(id: ObjectId) {
        const track = await this.trackModel.findById(id);
        track.listens += 1;
        track.save();
    }
}