import { MessageForm1Effects } from '../../form-1/store'
import { MessageMessagelistEffects } from '../../messagelist/store'
import { MessageViewMessageEffects } from '../../view-message/store'
/**
 * NGRX effects for the `Message` feature
 */
export const effects: any[] = [
  MessageForm1Effects,
  MessageMessagelistEffects,
  MessageViewMessageEffects,
]
