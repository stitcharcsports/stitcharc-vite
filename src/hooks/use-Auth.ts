// import { useEffect, useState } from 'react';
// import { User, Session } from '@supabase/supabase-js';
// import { supabase } from '@/integrations/supabase/client';
// import { useToast } from '@/hooks/use-toast';

// interface Profile {
//   id: string;
//   name: string | null;
//   profile_image: string | null;
//   role: 'admin' | 'user';
//   created_at: string;
// }

// export const useAuth = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [session, setSession] = useState<Session | null>(null);
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();

//   useEffect(() => {
//     // Listen for auth changes
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         setSession(session);
//         setUser(session?.user ?? null);
        
//         if (session?.user) {
//           // Fetch user profile
//           const { data: profile } = await supabase
//             .from('profiles')
//             .select('*')
//             .eq('id', session.user.id)
//             .single();
          
//           setProfile(profile);
//         } else {
//           setProfile(null);
//         }
        
//         setLoading(false);
//       }
//     );

//     // Get initial session
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//       setUser(session?.user ?? null);
      
//       if (session?.user) {
//         supabase
//           .from('profiles')
//           .select('*')
//           .eq('id', session.user.id)
//           .single()
//           .then(({ data: profile }) => {
//             setProfile(profile);
//             setLoading(false);
//           });
//       } else {
//         setLoading(false);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   const signInWithGoogle = async () => {
//     try {
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           redirectTo: `${window.location.origin}/`
//         }
//       });
      
//       if (error) throw error;
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     }
//   };

//   const signInWithEmail = async (email: string, password: string) => {
//     try {
//       const { error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });
      
//       if (error) throw error;
      
//       toast({
//         title: "Success",
//         description: "Welcome back!",
//       });
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//       throw error;
//     }
//   };

//   const signOut = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
      
//       toast({
//         title: "Success",
//         description: "Signed out successfully",
//       });
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     }
//   };

//   const isAdmin = profile?.role === 'admin';

//   return {
//     user,
//     session,
//     profile,
//     loading,
//     signInWithGoogle,
//     signInWithEmail,
//     signOut,
//     isAdmin
//   };
// };

import { useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Profile {
  id: string;
  name: string | null;
  profile_image: string | null;
  role: 'admin' | 'user';
  created_at: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Listen for auth changes
  //   const { data: { subscription } } = supabase.auth.onAuthStateChange(
  //     async (event, session) => {
  //       setSession(session);
  //       setUser(session?.user ?? null);
        
  //       if (session?.user) {
  //         // Fetch user profile
  //         const { data: profile } = await supabase
  //           .from('profiles')
  //           .select('*')
  //           .eq('id', session.user.id)
  //           .single();
          
  //         setProfile(profile);
          
  //         // Auto-redirect admin users to dashboard
  //         if (profile?.role === 'admin' && window.location.pathname === '/') {
  //           navigate('/admin');
  //         }
  //       } else {
  //         setProfile(null);
  //       }
        
  //       setLoading(false);
  //     }
  //   );

  //   // Get initial session
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //     setUser(session?.user ?? null);
      
  //     if (session?.user) {
  //       supabase
  //         .from('profiles')
  //         .select('*')
  //         .eq('id', session.user.id)
  //         .single()
  //         .then(({ data: profile }) => {
  //           setProfile(profile);
            
  //           // Auto-redirect admin users to dashboard
  //           if (profile?.role === 'admin' && window.location.pathname === '/') {
  //             navigate('/admin');
  //           }
            
  //           setLoading(false);
  //         });
  //     } else {
  //       setLoading(false);
  //     }
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  // use-Auth.ts
useEffect(() => {
  let mounted = true;

  const handleAuthChange = async (event: string, session: Session | null) => {
    if (!mounted) return;

    setSession(session);
    setUser(session?.user ?? null);

    if (session?.user) {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;

        if (mounted) {
          setProfile(profile);
          // Don't redirect here - let the router handle it
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    } else {
      setProfile(null);
    }

    if (mounted) {
      setLoading(false);
    }
  };

  // Get initial session
  supabase.auth.getSession().then(({ data: { session } }) => {
    handleAuthChange('INITIAL_SESSION', session);
  });

  const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

  return () => {
    mounted = false;
    subscription.unsubscribe();
  };
}, []);

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Welcome back!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Signed out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const isAdmin = profile?.role === 'admin';

  return {
    user,
    session,
    profile,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signOut,
    isAdmin
  };
};