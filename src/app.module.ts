import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumController } from './album/album.controller';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [UserModule, ArtistModule, TrackModule, AlbumModule],
  controllers: [AppController, AlbumController],
  providers: [AppService],
})
export class AppModule {}
