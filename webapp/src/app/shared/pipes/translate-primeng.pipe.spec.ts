import { TranslatePrimengPipe } from './translate-primeng.pipe';
import { TranslatorService } from '@app/core/services/translator/translator.service';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';


describe('TranslatePrimengPipe', () => {

    beforeEach(() => {
        TestBed
            .configureTestingModule({
                providers: [
                    TranslatorService,
                ],
                imports: [
                    TranslateModule.forRoot(),
                ],
            });
    });


    describe('#transform ', () => {
        it('should return the formatted Input', () => {
            const translateService: TranslatorService = TestBed.get(TranslatorService);
            const pipe = new TranslatePrimengPipe(translateService);
            expect(pipe.transform('')).toBe('');
            expect(pipe.transform('lorem ipsum')).toBe('lorem ipsum');
        });
    });
});
