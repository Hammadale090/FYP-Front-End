import { app } from "@/lib/firebase"; // Import your Firebase app instance
import {
  getDatabase,
  ref,
  serverTimestamp,
  onDisconnect,
  set,
  onValue,
} from "firebase/database";

export function setOnlinePresence(userId: any) {
  const db = getDatabase(app);
  var userStatusDatabaseRef = ref(db, "/status/" + userId);

  var isOfflineForDatabase = {
    state: "offline",
    last_changed: serverTimestamp(),
  };

  var isOnlineForDatabase = {
    state: "online",
    last_changed: serverTimestamp(),
  };

  onValue(ref(db, ".info/connected"), function (snapshot) {
    if (snapshot.val() == false) {
      return;
    }

    onDisconnect(userStatusDatabaseRef)
      .set(isOfflineForDatabase)
      .then(function () {
        set(userStatusDatabaseRef, isOnlineForDatabase);
      });
  });
}

export function getOnlinePresence(userId: any, setOnlineStatus: any) {
  const db = getDatabase(app);

  const presenceRef = ref(db, "/status/" + userId);

  onValue(presenceRef, function (snapshot) {
    const presence = snapshot.val();

    setOnlineStatus(presence?.state == "online" ? true : false);
  });
}
