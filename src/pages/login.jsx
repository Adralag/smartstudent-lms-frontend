import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithCustomToken, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot
} from 'firebase/firestore';
import './styles/login.css'

const appId = (typeof window !== 'undefined' && typeof window.__app_id !== 'undefined') ? window.__app_id : (typeof global !== 'undefined' && typeof global.__app_id !== 'undefined') ? global.__app_id : 'default-app-id';
// TODO: Replace the following object with your actual Firebase config from the Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
// use a safe global lookup for injected auth token
const initialAuthToken = (typeof window !== 'undefined' ? window.__initial_auth_token : typeof global !== 'undefined' ? global.__initial_auth_token : null);

// --- Mock Dashboard Components ---
const Dashboard = ({ role, user, auth }) => { // Accepted auth
  const bgColor = {
    Student: 'bg-blue-500',
    Lecturer: 'bg-indigo-500',
    Administrator: 'bg-red-500',
  }[role] || 'bg-gray-500';

  const handleLogout = async () => {
      try {
          await signOut(auth);
      } catch (e) {
          console.error("Error logging out:", e);
      }
  };

  return (
    <div className={`min-h-screen p-8 text-white ${bgColor} flex flex-col items-center justify-center`}>
      {/* Logout Button added for usability */}
      <div className="absolute top-4 right-4">
          <button 
              onClick={handleLogout}
              className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:bg-gray-200 transition duration-150 text-sm font-semibold"
          >
              Logout
          </button>
      </div>
      <div className="max-w-4xl w-full bg-white text-gray-800 p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-4 text-center">
          {role} Dashboard
        </h1>
        <div className="mb-6 border-b pb-4">
          <p className="text-lg">Welcome back, <span className="font-semibold text-xl">{user.name}</span>!</p>
          <p className="text-sm text-gray-500">
            User ID: <span className="text-gray-600 font-mono text-xs break-all">{user.userId}</span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Courses" value={role === 'Student' ? '5' : '3'} icon="📚" />
          <StatCard title="Recent Activity" value={role === 'Student' ? 'Grade: A' : 'Pending Approvals: 2'} icon="📊" />
          <StatCard title="Notifications" value="3 New" icon="🔔" />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><button className="text-blue-600 hover:text-blue-800 transition duration-150">View Profile</button></li>
            <li><button className="text-blue-600 hover:text-blue-800 transition duration-150">Manage Settings</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
    <div className="flex items-center space-x-3">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

// --- AuthScreen Component (Refactored from LoginPage) ---
const AuthScreen = ({ auth, db, setAuthUser }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Student'); // Default to Student for registration
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);

  const getProfileRef = (uid) => doc(db, 'artifacts', appId, 'users', uid, 'userProfiles', 'profile');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsPending(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      
      // Fetch user role and name from Firestore
      const profileDoc = await getDoc(getProfileRef(uid));

      if (!profileDoc.exists()) {
        // If login succeeded but profile is missing, log out and throw error
        await auth.signOut(); 
        throw new Error('User profile not found. Please contact support.');
      }
      
      const userData = profileDoc.data();
      
      // Set the authenticated user details for the App component
      setAuthUser({
        name: userData.name,
        role: userData.role,
        userId: uid
      });

    } catch (err) {
      console.error('Login error:', err);
      // Map Firebase error codes to user-friendly messages
      let message = 'Login failed. Please check your credentials.';
      if (err.code === 'auth/invalid-email') message = 'Invalid email address format.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') message = 'Invalid email or password.';
      if (err.message === 'User profile not found. Please contact support.') message = err.message;
      
      setError(message);
    } finally {
      setIsPending(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsPending(true);

    if (!name || !email || !password || !role) {
      setError('All fields are required.');
      setIsPending(false);
      return;
    }

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      
      // 2. Save additional profile data (name, role) to Firestore
      await setDoc(getProfileRef(uid), {
        name,
        email: email.toLowerCase(),
        role, // 'Student' or 'Lecturer'
        createdAt: new Date().toISOString()
      });

      // After successful registration, switch to login mode
      setIsRegistering(false);
      
      // Clear password field only
      setPassword(''); 
      setError('Registration successful! Please log in with your new account.');
      
    } catch (err) {
      console.error('Registration error:', err);
      let message = 'Registration failed. Please try again.';
      if (err.code === 'auth/email-already-in-use') message = 'This email is already registered. Try logging in.';
      if (err.code === 'auth/weak-password') message = 'Password must be at least 6 characters long.';
      
      setError(message);
    } finally {
      setIsPending(false);
    }
  };

  // Simplified logic for UI feedback
  const passwordChecklist = {
    length: password.length >= 6,
    number: password.match(/[0-9]/),
    uppercase: password.match(/[A-Z]/),
    lowercase: password.match(/[a-z]/),
  };

  const isPasswordValid = Object.values(passwordChecklist).every(Boolean);

  // Styling: Modern, responsive, card-based design
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">SmartStudent</h1>
          <p className="text-sm text-gray-500 mt-1">
            {isRegistering ? 'Create your new account' : 'Sign in to access your portal'}
          </p>
        </div>

        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm transition-all duration-300">
              {error}
            </div>
          )}

          {isRegistering && (
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., xxxx@university.edu"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pr-12 transition duration-150"
                required
              />
              <button 
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition duration-150" 
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l16 16a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.47 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.242 4.242a3 3 0 114.242 4.242L8.929 8.929 8.046 8.046zM10 12.5a2.5 2.5 0 002.5-2.5v-.01c0-.18-.008-.358-.022-.536l-1.79-1.79z" clipRule="evenodd" /><path d="M10 19a9.952 9.952 0 005.475-1.637l-1.67-1.67A8.007 8.007 0 0110 17c-2.736 0-5.166-1.194-6.886-3.045l-1.144 1.144A10.003 10.003 0 0010 19z" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                )}
              </button>
            </div>
            
            {isRegistering && (
                <div className="pt-2 text-xs text-gray-600 grid grid-cols-2 gap-y-1">
                    <span className={passwordChecklist.length ? 'text-green-600' : 'text-gray-500'}>
                        {passwordChecklist.length ? '✔' : '•'} 6+ characters
                    </span>
                    <span className={passwordChecklist.number ? 'text-green-600' : 'text-gray-500'}>
                        {passwordChecklist.number ? '✔' : '•'} Number
                    </span>
                    <span className={passwordChecklist.uppercase ? 'text-green-600' : 'text-gray-500'}>
                        {passwordChecklist.uppercase ? '✔' : '•'} Uppercase
                    </span>
                    <span className={passwordChecklist.lowercase ? 'text-green-600' : 'text-gray-500'}>
                        {passwordChecklist.lowercase ? '✔' : '•'} Lowercase
                    </span>
                </div>
            )}
          </div>

          {isRegistering && (
            <div className="space-y-1">
              <label htmlFor="role" className="text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none transition duration-150"
                required
              >
                <option value="Student">Student</option>
                <option value="Lecturer">Lecturer</option>
                {/* Administrator role is not available for self-registration */}
              </select>
            </div>
          )}

          <button 
            type="submit" 
            className={`w-full py-3 rounded-xl font-semibold text-white transition duration-300 shadow-md ${
              isPending ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
            }`}
            disabled={isPending || (isRegistering && !isPasswordValid)}
          >
            {isPending ? (
              <svg className="animate-spin h-5 w-5 text-white inline mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              isRegistering ? 'Create Account' : 'Secure Login'
            )}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button 
            className="text-blue-600 font-medium hover:text-blue-800 transition duration-150"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
              setPassword('');
            }}
          >
            {isRegistering ? 'Login here' : 'Register here'}
          </button>
        </p>

        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
        </div>

        <button 
          className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150"
          disabled // Google login is not implemented for this self-contained example
        >
          <svg className="h-5 w-5 mr-3" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.192 0 7.556 0 9s.348 2.808.957 4.039l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
          </svg>
          <span className="ml-2">Continue with Google</span>
        </button>
      </div>
    </div>
  );
};


// --- Main Application Component ---
const App = () => {
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null); // { name, role, userId }

  // 1. Initialize Firebase and Authenticate
  useEffect(() => {
    if (!firebaseConfig) {
      console.error('Firebase config is missing.');
      return;
    }

    try {
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const authentication = getAuth(app);
      
      setDb(firestore);
      setAuth(authentication);

      // Sign in using the initial token or anonymously
      const authenticateUser = async () => {
        try {
          if (initialAuthToken) {
            await signInWithCustomToken(authentication, initialAuthToken);
          } else {
            await signInAnonymously(authentication);
          }
        } catch (e) {
          console.error('Firebase Auth Failed:', e);
        }
      };

      authenticateUser();

      // Listener for Auth State Changes
      const unsubscribeAuth = onAuthStateChanged(authentication, (user) => {
        if (user && firestore) {
          // Check if user has a profile doc (meaning they have logged in/registered previously)
          const profileRef = doc(firestore, 'artifacts', appId, 'users', user.uid, 'userProfiles', 'profile');
          
          // Use onSnapshot to keep user data in sync (name and role)
          const unsubscribeProfile = onSnapshot(profileRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setAuthUser({
                    name: data.name,
                    role: data.role,
                    userId: user.uid
                });
            } else if (user.isAnonymous) {
                 // Allow anonymous users to continue without profile data
                 setAuthUser({ name: 'Guest User', role: 'Anonymous', userId: user.uid });
            } else {
                // If an authenticated user doesn't have a profile, we don't automatically sign them out here
                // We rely on the AuthScreen's handleLogin to catch the missing profile and sign them out.
                console.warn("Authenticated user profile missing. Forced user to re-register/re-login.");
            }
            setIsLoading(false);
          }, (error) => {
              // ERROR HANDLING: If permission is denied, log the error and force user back to Auth screen.
              console.error("Error fetching user profile:", error);
              setAuthUser(null);
              setIsLoading(false);
          });

          return () => unsubscribeProfile();
        } else {
          setAuthUser(null);
          setIsLoading(false);
        }
      });
      
      // Cleanup listener on component unmount
      return () => unsubscribeAuth();

    } catch (error) {
      console.error('Failed to initialize Firebase:', error);
      setIsLoading(false);
    }
  }, []);

  if (isLoading || !db || !auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex items-center space-x-2 text-gray-500">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg font-medium">Loading Application...</span>
        </div>
      </div>
    );
  }

  // Render the appropriate screen based on authentication state
  if (authUser && authUser.role && authUser.role !== 'Anonymous') {
    // Pass auth object to Dashboard for logout functionality
    return <Dashboard role={authUser.role} user={authUser} auth={auth} />;
  }
  
  // Render the Auth Screen if not logged in
  return <AuthScreen auth={auth} db={db} setAuthUser={setAuthUser} />;
};

export default App;