import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean;

  msgError: boolean;
  mensajeError: string;

  constructor( private readonly spotifySvc:SpotifyService ) {

    this.loading = true;
    this.msgError = false;

    this.spotifySvc.getNewReleases().subscribe( (data:any) => {

      console.log(data);
      this.nuevasCanciones = data;
      this.loading = false;
  
    }, ( errorSvc ) => {
      this.msgError = true;
      this.loading = false;
      this.mensajeError = errorSvc.error.error.message;
      
    });

  }

  ngOnInit(): void {
  }

}
