import {ImageHelper} from './image-helper';

describe('ImageHelper', () => {

    describe('constructImgUrl', () => {
        it('should prepend assets path to img url', () => {
            const newUrl: string = ImageHelper.constructImgUrl('test-url');

            expect(newUrl).toEqual('/assets/images/movie-covers/test-url');
        });
    });

    describe('imageNotFound', () => {
        it('should set plug as img src', () => {
            const event = {
                target: {
                    src: 'test-src'
                },
                preventDefault: () => null,
                stopPropagation: () => null,
            };

            ImageHelper.imageNotFound(event);

            expect(event.target.src).toEqual('/assets/images/plug.jpg');
        });
    });
});
