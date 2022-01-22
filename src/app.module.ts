/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TrackModule } from "./track/track.module";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://root:root@spotifycluster.jjxt1.mongodb.net/spotify__server?retryWrites=true&w=majority'),
        TrackModule
    ]
})

export class AppModule { }