import { CongeAddCongeEffects } from '../../add-conge/store'
import { CongeListcongeEffects } from '../../listconge/store'
import { CongeView1Effects } from '../../view-1/store'
/**
 * NGRX effects for the `Conge` feature
 */
export const effects: any[] = [
  CongeAddCongeEffects,
  CongeListcongeEffects,
  CongeView1Effects,
]
