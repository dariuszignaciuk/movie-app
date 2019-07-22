import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ImageHelper} from '../shared/utils/image-helper';
import {Movie} from '../shared/models/movie';

@Injectable()
export class MovieDetailsService {

    constructor(private http: HttpClient) {
    }

    getMovie(key: string): Observable<Movie> {
        return this.http.get<Movie[]>('/assets/json/movie.mock-data.json')
            .pipe(
                map(allMovies => {
                    const mathingMovie: Movie = allMovies.find(movie => movie.key === key);
                    mathingMovie.img = ImageHelper.constructImgUrl(mathingMovie.img);
                    return mathingMovie;
                })
            );
    }
}
