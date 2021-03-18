import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService, SpotifySong } from './../api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  songs: SpotifySong[] = [];
  constructor(private router: Router, public api: ApiService) {}

  ngOnInit() {
    this.getDataUser();
  }

  async getDataUser() {
    await this.api.getDataUser().subscribe(
      (res) => {
        //get song data from html response
        const parser = new DOMParser();
        var document = parser.parseFromString(res, 'text/html');
        var images = Array.from(document.getElementsByClassName('chart-table-image'));
        var positions = Array.from(document.getElementsByClassName('chart-table-position'));
        var titleArtist = Array.from(document.getElementsByClassName('chart-table-track'));
        var streams = Array.from(document.getElementsByClassName('chart-table-streams'));

        for(var i = 0; i < images.length; i++) {
          //extract song title and artist from html Element
          var title = titleArtist[i+1].getElementsByTagName('strong');
          var artist = titleArtist[i+1].getElementsByTagName('span');

          //extract img source and img link from html Element
          var link = images[i].getElementsByTagName('a');
          var image = images[i].getElementsByTagName('img');

          //compose song from html elements
          var song: SpotifySong = {
            position: positions[i].innerHTML,
            title: title[0].innerHTML,
            artist: artist[0].innerHTML,
            streams: streams[i+1].innerHTML,
            image: image[0].src,
            link: link[0].href
          };

          this.songs.push(song);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //navigate to detail view, passing song data with navigationextras
  openDetail(songIndex: number){
    let navigationExtras: NavigationExtras = {
      state: {
        song: this.songs[songIndex]
      }
    }
    this.router.navigate(['home/detail'], navigationExtras);
  }
}
