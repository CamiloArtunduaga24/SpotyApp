import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private readonly http:HttpClient ) { 
    console.log('prueba del servicio');
    
  }

  getQuery( query:string ) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCAfPgeY9frfAXGu0u6F2r2_DfyUb9ktYajsxWkK_gO8w_cM4YCM0B_bxK7yS7WcZkSePrseqVYPro2q7seLdaGY9Oi6OaWlQnAmCLxU1ojV7n7Wv4'
    });

    return this.http.get(url, {headers});

  }


  getNewReleases() {

    return this.getQuery('browse/new-releases')
               .pipe( map( data => data['albums'].items));
  }


  
  // getNewReleases() {
  //  const headers = new HttpHeaders({
  //  'Authorization': 'Bearer BQDk24DoJMZWDZkR45rBE1K4C5fnOs9pfYHa_yATUMNVoX18OHM958wCLuLNpJCmXJCA-nALV3Eg8b2gymjOWgs8yJXYZhE2IZx3HvfqqxpAaISKnXM'
  //  });

  //  return this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers } ).pipe( map( data => data['albums'].items));
               
  // }

  getArtista( termino:string ) {

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQDk24DoJMZWDZkR45rBE1K4C5fnOs9pfYHa_yATUMNVoX18OHM958wCLuLNpJCmXJCA-nALV3Eg8b2gymjOWgs8yJXYZhE2IZx3HvfqqxpAaISKnXM'
    // });

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
               .pipe( map ( artist => artist['artists'].items ) );

  }

  getArtistaId( id:string ) {
    return this.getQuery(`artists/${id}`);
               //.pipe( map ( artist => artist['artists'].items ) );
  }

  getTopTracks( id:string ) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
               .pipe( map ( artist => artist['tracks']) );
  }
}
