import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { ArtistModule } from './Artist/artist.module';
import { TrackModule } from './Track/track.module';
import { FavoritesModule } from './Favorites/favorites.module';
import { AlbumModule } from './Album/album.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
