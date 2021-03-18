import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  song: any;

  //retrieving song data from home page
  constructor(private router: Router) {
    if (router.getCurrentNavigation().extras.state){
      this.song = router.getCurrentNavigation().extras.state.song;
      console.log(this.song);
    }
   }

  ngOnInit() {
  }

}
