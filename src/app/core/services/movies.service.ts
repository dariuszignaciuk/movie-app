import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ImageHelper} from '../../shared/utils/image-helper';
import {Movie} from '../../shared/models/movie';
import {MoviesApiService} from './movies-api.service';

@Injectable({
    providedIn: 'root'
})
export class MoviesService {
    private allMovies$: BehaviorSubject<Movie[]> = new BehaviorSubject([]);

    constructor(private moviesApiService: MoviesApiService) {
    }

    public getMoviesList(): Observable<Movie[]> {
        if (this.isMoviesListStored()) {
            return this.allMovies$.asObservable();
        } else {
            return this.moviesApiService.getMoviesList()
                .pipe(
                    map(movies => {
                        const mapped: Movie[] = this.mapMovies(movies);
                        this.allMovies$.next(mapped);
                        return mapped;
                    })
                );
        }
    }

    public getMovie(key: string): Observable<Movie> {
        return this.getMoviesList()
            .pipe(
                map(allMovies => allMovies.find(movie => movie.key === key))
            );
    }

    private isMoviesListStored(): boolean {
        return this.allMovies$.getValue().length > 0;
    }

    private mapMovies(movies: Movie[]): Movie[] {
        return movies.map(movie => {
            movie.img = ImageHelper.constructImgUrl(movie.img);
            return movie;
        });
    }
}
