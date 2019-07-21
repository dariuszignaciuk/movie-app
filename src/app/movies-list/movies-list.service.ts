import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../movie.model';
import {map} from 'rxjs/operators';
import {ImageHelper} from '../shared/utils/image-helper';

@Injectable()
export class MoviesListService {

    constructor(private http: HttpClient) {
    }

    getMoviesList(): Observable<Movie[]> {
        return this.http.get<Movie[]>('/assets/json/movie.mock-data.json')
            .pipe(
                map(movies => movies.map(movie => {
                    movie.img = ImageHelper.constructImgUrl(movie.img);
                    return movie;
                }))
            );
    }
}
