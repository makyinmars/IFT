import { Injectable, UploadedFile } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: 'ift' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      console.log(file);

      Readable.from(file.buffer).pipe(upload);
    });
  }
}
