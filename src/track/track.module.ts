/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FileService } from "src/file/file.service";
import { Comment, CommentSchema } from "./shemas/comment.shema";
import { Track, TrackSchema } from "./shemas/track.shema";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
        MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    ],
    controllers: [TrackController],
    providers: [TrackService, FileService]
})
export class TrackModule {

}
