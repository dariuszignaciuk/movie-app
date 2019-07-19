export enum GenreType {
    Action = 'action',
    Adventure = 'adventure',
    Biography = 'biography',
    Comedy = 'comedy',
    Crime = 'crime',
    Drama = 'drama',
    History = 'history',
    Mystery = 'mystery',
    Scifi = 'scifi',
    Sport = 'sport',
    Thriller = 'thriller'
}

export interface Movie {
    id: number;
    key: string;
    name: string;
    description: string;
    genres: GenreType[];
    rate: string;
    length: string;
    img: string;
}

export interface LoadFilters {
    search: string;
}
