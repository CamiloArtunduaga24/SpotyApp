import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.scss']
})
export class ArtistaComponent implements OnInit {

  artista : any = {};
  topTracks: any[] = [];
  loading: boolean;

  constructor( private readonly activatedRoute:ActivatedRoute,
               private readonly spotifySvc:SpotifyService ) {

    this.loading = true;

    this.activatedRoute.params.subscribe( params => {
      console.log(params['id']);
      this.getArtistaId( params['id'] );
      this.getTracks( params['id'] );
      
    });

   }

   getArtistaId( id:string ) {

    this.loading = true;

    this.spotifySvc.getArtistaId(id).subscribe(res => {
      console.log(res);
      this.artista = res;  
      this.loading = false;
    });

   }

   getTracks( id: string ) {
    this.spotifySvc.getTopTracks( id ).subscribe(res => {
      console.log('Este es el res ',res);
      this.topTracks = res;
    });
   }

  ngOnInit(): void {
  }



}
