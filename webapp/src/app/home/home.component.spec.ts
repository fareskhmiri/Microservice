import { TestBed, inject, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MainComponent } from './home.component';
import { FeatureService } from '@services/feature/feature.service';
import { MenuService } from '@services/menu/menu.service'
import { AuthManagerService } from '@services/auth/auth-manager.service'
import { MessagesService } from '@services/messages/message.service'
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule, Router, NavigationStart } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';

describe('Home component', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let service: MenuService, mockMenuManagerService;
  const mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);
  let menu = {
    link: ['/'],
    label: "Home",
    items: [
      {
        "label": "Buttons",
        "roles": [
          "admin"
        ],
        "items": [
          {
            "label": "Button",
            "roles": [
              "admin"
            ],
            "id": "button",
            "link": [
              "/buttons/edit-1"
            ],
            "params": {}
          },
        ]
      },
    ]
  }

  beforeEach(
    waitForAsync(async () => {
      let mockAuthManagerService = {
        isUserRolesHas: () => true,
        logout: () => true,
        getUserName: () => 'SimpleUser',
      };
      let mockMenuManagerService = {
        filterByRole: () => {
          return [{
            link: ['/'],
            label: "Home",
            items: [
              {
                "label": "Buttons",
                "roles": [
                  "admin"
                ],
                "items": [
                  {
                    "label": "Button",
                    "roles": [
                      "admin"
                    ],
                    "id": "button",
                    "link": [
                      "/buttons/edit-1"
                    ],
                    "params": {}
                  },
                ]
              },
            ]
          }]

        },
        setMenuState: () => true,
        getMenuInitialState: () => true,

      };
      let mockHttpClient = {};
      await TestBed.configureTestingModule({
        declarations: [MainComponent],
        providers: [
          { provide: AuthManagerService, useValue: mockAuthManagerService },
          { provide: HttpClient, useValue: mockHttpClient },
          { provide: FeatureService, useValue: {} },
          { provide: MenuService, useValue: mockMenuManagerService },
          { provide: MessagesService, useValue: {} },
          { provide: Router, useValue: mockRouter },
          HttpHandler
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });


});
