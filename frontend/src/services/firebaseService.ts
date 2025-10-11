// firebaseService.ts
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, push, set } from 'firebase/database';

export const signInWithGoogle = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user) {
      return {
        success: false,
        error: 'User not found in sign-in result.'
      };
    }

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
      console.error("Google sign-in error:", error);
      return {
        success: false,
        error: error.message
      };
    } else {
      console.error("Google sign-in error:", error);
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
export const trackPageView = async (page: string) => {
  try {
    const db = getDatabase();
    const pageRef = push(ref(db, 'pageViews'));
    await set(pageRef, {
      page,
      timestamp: new Date().toISOString()
    });
    return { success: true };
  } catch (error: unknown) {
    console.error("Page view tracking error:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
};

export const subscribeNewsletter = async (email: string) => {
  try {
    const db = getDatabase();
    const newsletterRef = push(ref(db, 'newsletterSubscribers'));
    await set(newsletterRef, {
      email,
      subscribedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error: unknown) {
    console.error("Newsletter subscription error:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
};
