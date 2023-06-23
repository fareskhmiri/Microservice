import { PolicyService, Policy } from './policy.service';

describe('PolicyService', () => {
  let service: PolicyService, mockAuthManagerService;
  const policies1: Policy[] = [{
    role: 'simpleRole'
  }, {
    role: 'admin'
  }];
  const policies2: Policy[] = [{
    role: 'simpleRole1'
  }, {
    role: 'simpleRole2'
  }];
  const screenField1 = "screen1"
  const featureField1 = "feature1"
  const componentField = "component1"
  const screenField2 = "screen2"
  const featureField2 = "feature2"
  const componentField2 = "component2"
  const SecurityData = { 
    screens: 
    {
      feature1: {
        screen1: {
          restrictedRoles: ['simpleRole'],
          components: {
            component1: {
              restrictedRoles: {
                view: [
                  "simpleRole"
                ]
              },
              type: "Button"
            }
          }
        }
      }
    }
  
  }

  beforeEach(() => {
    mockAuthManagerService = jasmine.createSpyObj("mockAuthManagerService", ["getRoles","getSecurityData",]);
    service = new PolicyService(mockAuthManagerService);
  });
  describe('#isRestricted', () => {
    it('Should Display Component For Empty Policies', () => {
     mockAuthManagerService.getRoles.and.returnValue(['simpleRole'])
     expect(service.isRestricted(null)).toBeFalsy()
     expect(service.isRestricted([])).toBeFalsy()
   }) 
    it('Should Hide Component For simpleRole Role', () => {
     mockAuthManagerService.getRoles.and.returnValue(['simpleRole'])
     expect(service.isRestricted(policies1)).toBeTruthy()
   }) 
    it('Should Display Component For Admin Role', () => {
     mockAuthManagerService.getRoles.and.returnValue(['admin'])
     expect(service.isRestricted(policies2)).toBeFalsy()
   }) 
 }) 
 describe('#isScreenAuthorized', () => {
  it('Should Display Screen For Empty Policies', () => {
   mockAuthManagerService.getRoles.and.returnValue(['simpleRole'])
   expect(service.isScreenAuthorized(null)).toBeTruthy()
   expect(service.isScreenAuthorized([])).toBeTruthy()
 }) 
  it('Should Hide Screen For simpleRole', () => {
   mockAuthManagerService.getRoles.and.returnValue(['simpleRole'])
   mockAuthManagerService.getSecurityData.and.returnValue(SecurityData)
   expect(service.isScreenAuthorized(featureField1,screenField1)).toBeFalsy()
 })
  it('Should Display Screen For Role Admin', () => {
   mockAuthManagerService.getRoles.and.returnValue(['admin'])
   mockAuthManagerService.getSecurityData.and.returnValue(SecurityData)
   expect(service.isScreenAuthorized(featureField1,screenField1)).toBeTruthy()
 })  
 it('Should Display Screen When No Restricted Roles Are Defined', () => {
   mockAuthManagerService.getRoles.and.returnValue(['admin'])
   mockAuthManagerService.getSecurityData.and.returnValue(SecurityData)
   expect(service.isScreenAuthorized(featureField2,screenField2)).toBeTruthy()
 }) 
})
describe('#isComponentRestricted', () => {
   
  it('Should Display Component For Empty Policies', () => {
  mockAuthManagerService.getRoles.and.returnValue(['simpleRole']);
  expect(service.isComponentRestricted(null)).toBeFalsy();
  expect(service.isComponentRestricted([])).toBeFalsy();
}); 
it('Should Hide Component For Role simpleRole', () => {
  mockAuthManagerService.getRoles.and.returnValue(['simpleRole']);
  mockAuthManagerService.getSecurityData.and.returnValue(SecurityData)
  expect(service.isComponentRestricted(featureField1,screenField1,componentField)).toBeTruthy();
});
 it('Should Display Component For Role Admin', () => {
  mockAuthManagerService.getRoles.and.returnValue(['admin']);
  mockAuthManagerService.getSecurityData.and.returnValue(SecurityData)
  expect(service.isComponentRestricted(featureField1,screenField1,componentField)).toBeFalsy();
});  
it('Should Display Component When No Restricted Roles Are Defined ', () => {
  mockAuthManagerService.getRoles.and.returnValue(['simpleRole']);
  mockAuthManagerService.getSecurityData.and.returnValue(SecurityData)
  expect(service.isComponentRestricted(featureField2,screenField2,componentField2)).toBeFalsy();
}); 
});

});
