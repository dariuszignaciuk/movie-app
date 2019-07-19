import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../movie.model';
import {map} from 'rxjs/operators';

@Injectable()
export class MoviesListService {

    constructor(private http: HttpClient) {
    }

    getMoviesList(): Observable<Movie[]> {
        return this.http.get<Movie[]>('/assets/json/movie.mock-data.json')
            .pipe(
                map(movies => movies.map(movie => {
                    movie.img = '/assets/images/movie-covers/' + movie.img;
                    return movie;
                }))
            );
    }
}
