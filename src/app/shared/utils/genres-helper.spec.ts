import {ImageHelper} from './image-helper';

describe('ImageHelper', () => {

    describe('constructImgUrl', () => {
        it('should prepend assets path to img url', () => {
            const newUrl: string = ImageHelper.constructImgUrl('test-url');

            expect(newUrl).toEqual('/assets/images/movie-covers/test-url');
        });
    });
});
