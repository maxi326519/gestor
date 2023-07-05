import { Database, onValue, ref } from "firebase/database";
import { updataLocalProfileData } from "./redux/actions/user";
import { Auth } from "firebase/auth";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

export default function useListeners(auth: Auth, db: Database) {
  const dispatch = useDispatch();

  function initProfileListener(auth: Auth, db: Database, dispatch: Dispatch) {
    const profileRef = ref(db, `users/${auth.currentUser?.uid}/profile`);

    return onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(updataLocalProfileData(data));
    });
  }

  return {
    init: (auth: Auth, db: Database, dispatch: Dispatch) =>
      initProfileListener(auth, db, dispatch),
  };
}
