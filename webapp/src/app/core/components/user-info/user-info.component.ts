import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core'
import { Subject } from 'rxjs'

import { AuthManagerService } from '@services/auth/auth-manager.service'
/**
 * Component that displays a split button displaying the logged user name with the following items:
 * - Language switcher
 * - Change password
 * - Logout
 */
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
})
export class UserInfoComponent implements OnInit, OnDestroy {
  name: string
  items = [
    {
      label: $localize`:message;changePassword:Change Password`,
      command: (event) => {
        this.openChangePasswordComponent()
      },
    },
    {
      label: $localize`:message;Logout:Logout`,
      command: (event) => {
        this.menu.toggle('hide')
        this.doLogout()
      },
    },
  ]
  showChangePasswd = false
  destroy$: Subject<boolean> = new Subject<boolean>()
  @Output() logoutEvt = new EventEmitter()
  @ViewChild('menu', { static: false }) menu

  constructor(private authService: AuthManagerService) {}

  ngOnInit() {
    this.name = this.authService.getUserName()
  }
  /**
   * Open the ChangePassword Component within a dialog
   */
  openChangePasswordComponent(): void {
    this.menu.toggle('hide')
    this.showChangePasswd = true
  }
  /**
   * Hie the change password dialog
   */
  hideChangePasswd() {
    this.showChangePasswd = false
  }
  /**
   * Run the logout event
   */
  doLogout() {
    this.logoutEvt.emit()
  }
  /**
   * Destroy the component
   */
  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
