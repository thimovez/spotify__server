/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { FileModule } from "./file/file.module";
import { TrackModule } from "./track/track.module";
import * as path from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static'), }),
        MongooseModule.forRoot('mongodb+srv://root:root@spotifycluster.jjxt1.mongodb.net/spotify__server?retryWrites=true&w=majority'),
        TrackModule,
        FileModule
    ]
})

export class AppModule { }