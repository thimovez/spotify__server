import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';


export enum FileType {
    AUDIO = 'audio',
    IMAGE = 'image'
}

@Injectable()
export class FileService {

    createFile(type: FileType, file) {
        try {
            const fileName = uuid.v4() + fileExstension
            const filePath = path.resolve(__dirname, '..', 'static', fileName);
        } catch (error) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    removeFile(filename: string) {

    }
}