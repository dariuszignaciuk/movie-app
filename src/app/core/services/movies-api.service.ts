import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../../shared/models/movie';

@Injectable({
    providedIn: 'root'
})
export class MoviesApiService {

    constructor(private http: HttpClient) {
    }

    public getMoviesList(): Observable<Movie[]> {
        return this.http.get<Movie[]>('/assets/json/movie.mock-data.json');
    }
}
