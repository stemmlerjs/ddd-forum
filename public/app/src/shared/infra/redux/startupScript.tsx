import { Store } from "redux"
import { getUserProfile } from "../../../modules/users/redux/operators"

function initialReduxStartupScript (store: Store) : void {
  //@ts-ignore
  store.dispatch(getUserProfile(store.dispatch))
}

export {
  initialReduxStartupScript
}