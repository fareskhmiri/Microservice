import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'
import { MessageService, Message } from 'primeng/api'

import { MessagesService as Messages } from '@services/messages/message.service'
import { MessageOptions } from '@core/components/messages/models/message.options'
/**
 * Displays toast messages of type: `error`, `ìnfo`, `warning`, `success` or `confirmation`.
 *
 * This class should not be modified.
 *
 */
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  providers: [MessageService],
})
export class MessageComponent implements OnInit, OnDestroy {
  /**
   * The messages to display
   */
  msgs: Message[] = []
  /**
   * @private
   */
  private subscription: Subscription

  constructor(
    private messagesService: Messages,
    private messageService: MessageService
  ) {}
  /**
   * Subscribes to the message emitter observable
   */
  ngOnInit() {
    this.subscription = this.messagesService.messageState
      .pipe(filter((value) => value.message !== 'close'))
      .subscribe((message: MessageOptions) => {
        this.show(message)
      })
  }
  /**
   * Displays the message
   * @param message
   */
  show(message: MessageOptions) {
    this.messageService.addAll([
      {
        key: 'br',
        severity: message.mode,
        detail: message.message,
        life: 5000,
        sticky: false,
      },
    ])
  }
  /**
   * Destroys the component and all the subscriptions
   */
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
