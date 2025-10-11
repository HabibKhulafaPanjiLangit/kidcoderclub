// firebaseService.ts
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, push, set } from 'firebase/database';

export const signInWithGoogle = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return {
      success: true,
      user: {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL
      }
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Google sign-in error", error);
      return {
        success: false,
        error: error.message
      };
    } else {
      console.error("Google sign-in error", error);
      return {
        success: false,
        error: String(error)
      };
    }
  }
};

export const registerStudent = async (data: any) => {
  try {
    const db = getDatabase();
    const newStudentRef = push(ref(db, 'registrations'));
    await set(newStudentRef, data);
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Registration error:", error);
      return { success: false, error: error.message };
    } else {
      console.error("Registration error:", error);
      return { success: false, error: String(error) };
    }
  }
};

export const trackEvent = async (eventName: string, eventData: any) => {
  try {
    const db = getDatabase();
    const newEventRef = push(ref(db, 'events/' + eventName));
    await set(newEventRef, eventData);
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Event tracking error:", error);
      return { success: false, error: error.message };
    } else {
      console.error("Event tracking error:", error);
      return { success: false, error: String(error) };
    }
  }
};
