import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  artistas: any[] = [];

  loading: boolean;

  constructor( private readonly spotifySvc:SpotifyService ) { }

  ngOnInit(): void {
  }

  buscar( termino: string ){

    this.loading = true;
    this.spotifySvc.getArtista(termino).subscribe((resp:any) => {
      
      console.log(resp);
      this.artistas = resp;
      this.loading = false;
      
    });
    
  }
}
