import { NavigationQueueService } from './router.service';


describe('RouterService', () => {
    let mockRouter;
    let service: NavigationQueueService;

    beforeEach(() => {
        mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);
        service = new NavigationQueueService(mockRouter);
    });


    describe('#navigate', () => {
        it('should testing function navigate', () => {
            expect(service.navigate([], {})).toBeTruthy();
        });
    });

});
