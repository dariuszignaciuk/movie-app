export abstract class ImageHelper {
    public static constructImgUrl(url: string): string {
        return '/assets/images/movie-covers/' + url;
    }

    public static imageNotFound(e): void {
        e.preventDefault();
        e.stopPropagation();
        e.target.src = '/assets/images/plug.jpg';
    }
}
