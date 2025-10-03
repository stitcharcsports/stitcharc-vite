// import { useState, useEffect } from 'react';
// import { useAuth } from '@/hooks/use-Auth';
// import { Navigate } from 'react-router-dom';
// import { supabase } from '@/integrations/supabase/client';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { useToast } from '@/hooks/use-toast';
// import { 
//   Plus, 
//   Edit, 
//   Trash2, 
//   Users, 
//   Package, 
//   MessageSquare, 
//   Settings,
//   Eye,
//   Download
// } from 'lucide-react';

// interface Kit {
//   id: string;
//   name: string;
//   category: string;
//   image_url: string;
//   colors: any;
//   design_data: any;
//   is_active: boolean;
//   created_at: string;
// }

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   created_at: string;
// }

// interface QuoteRequest {
//   id: string;
//   name: string;
//   email: string;
//   message: string;
//   status: string;
//   created_at: string;
//   kit_request_id: string;
// }

// const Admin = () => {
//   // Always call hooks at the top level
//   const { user, profile, loading, isAdmin } = useAuth();
//   const { toast } = useToast();
  
//   const [kits, setKits] = useState<Kit[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
//   const [isKitDialogOpen, setIsKitDialogOpen] = useState(false);
//   const [editingKit, setEditingKit] = useState<Kit | null>(null);
//   const [dataLoading, setDataLoading] = useState(true);
//   const [dataError, setDataError] = useState<string | null>(null);
//   const [authChecked, setAuthChecked] = useState(false);
//   const [directAuthState, setDirectAuthState] = useState<{user: any, isAdmin: boolean} | null>(null);

//   const [kitForm, setKitForm] = useState({
//     name: '',
//     category: 'home' as 'home' | 'away' | 'training' | 'goalkeeper',
//     image_url: '',
//     colors: { primary: '#0033A0', secondary: '#D1FF00' },
//     design_data: { pattern: 'solid', style: 'modern' }
//   });

//   // Debug logging to understand auth state
//   useEffect(() => {
//     console.log('Admin component - Auth state:', {
//       user: !!user,
//       userId: user?.id,
//       profile: !!profile,
//       profileRole: profile?.role,
//       loading,
//       isAdmin,
//       authChecked
//     });
//   }, [user, profile, loading, isAdmin, authChecked]);

//   // Handle auth state changes with more aggressive checking
//   useEffect(() => {
//     const handleAuthCheck = async () => {
//       console.log('Auth state check - Loading:', loading, 'User:', !!user, 'IsAdmin:', isAdmin);
      
//       if (!loading) {
//         // Wait a bit more for auth state to stabilize
//         await new Promise(resolve => setTimeout(resolve, 500));
        
//         // Force recheck auth state from Supabase
//         try {
//           const { data: { user: currentUser } } = await supabase.auth.getUser();
//           console.log('Direct auth check - User found:', !!currentUser);
          
//           if (currentUser) {
//             // Get profile directly
//             const { data: profileData, error } = await supabase
//               .from('profiles')
//               .select('role')
//               .eq('id', currentUser.id)
//               .single();
            
//             console.log('Direct profile check:', profileData, 'Error:', error);
            
//             if (profileData?.role === 'admin') {
//               console.log('User is confirmed admin, setting auth checked');
//               setAuthChecked(true);
//               return; // Don't redirect, let component render
//             }
//           }
//         } catch (error) {
//           console.error('Error in direct auth check:', error);
//         }
        
//         setAuthChecked(true);
//       }
//     };
    
//     handleAuthCheck();
//   }, [loading, user, isAdmin, profile]);

//   // Use direct auth check instead of relying on hook state
//   useEffect(() => {
//     const checkDirectAuth = async () => {
//       try {
//         const { data: { user: currentUser } } = await supabase.auth.getUser();
//         if (currentUser) {
//           const { data: profileData } = await supabase
//             .from('profiles')
//             .select('role')
//             .eq('id', currentUser.id)
//             .single();
          
//           setDirectAuthState({
//             user: currentUser,
//             isAdmin: profileData?.role === 'admin'
//           });
//         } else {
//           setDirectAuthState({ user: null, isAdmin: false });
//         }
//       } catch (error) {
//         console.error('Direct auth check failed:', error);
//         setDirectAuthState({ user: null, isAdmin: false });
//       }
//     };
    
//     if (authChecked) {
//       checkDirectAuth();
//     }
//   }, [authChecked]);

//   // Use direct auth state if available, fallback to hook state
//   const finalUser = directAuthState?.user || user;
//   const finalIsAdmin = directAuthState?.isAdmin || isAdmin;

//   console.log('Final auth decision:', { 
//     finalUser: !!finalUser, 
//     finalIsAdmin, 
//     hookUser: !!user, 
//     hookIsAdmin: isAdmin,
//     directUser: !!directAuthState?.user,
//     directIsAdmin: directAuthState?.isAdmin
//   });

//   const checkAdminStatus = async () => {
//     if (!user) return;
    
//     try {
//       console.log('Checking admin status for user:', user.id);
//       const { data: profileData, error } = await supabase
//         .from('profiles')
//         .select('role')
//         .eq('id', user.id)
//         .single();
      
//       if (error) {
//         console.error('Error checking admin status:', error);
//         return;
//       }
      
//       console.log('Direct profile query result:', profileData);
      
//       if (profileData?.role === 'admin') {
//         console.log('User is admin according to direct query');
//         // Force a re-render or update your auth context if needed
//         window.location.reload(); // Force refresh if auth hook is not updating
//       }
//     } catch (error) {
//       console.error('Error in checkAdminStatus:', error);
//     }
//   };

//   // Load data - use final auth state
//   useEffect(() => {
//     const loadAllData = async () => {
//       if (finalIsAdmin && authChecked) {
//         console.log('Loading admin dashboard data...');
//         setDataLoading(true);
//         setDataError(null);
        
//         try {
//           const results = await Promise.all([
//             loadKits(),
//             loadUsers(),
//             loadQuoteRequests()
//           ]);
          
//           if (results.every(r => r !== false)) {
//             setDataLoading(false);
//           } else {
//             setDataError("Failed to load some dashboard data");
//             setDataLoading(false);
//           }
//         } catch (error) {
//           console.error("Dashboard data loading error:", error);
//           setDataError("Failed to load dashboard data");
//           setDataLoading(false);
//         }
//       }
//     };
    
//     loadAllData();
//   }, [finalIsAdmin, authChecked]);

//   const loadKits = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('kits')
//         .select('*')
//         .order('created_at', { ascending: false });
      
//       if (error) {
//         console.error('Supabase error loading kits:', error);
//         throw error;
//       }
      
//       setKits(data || []);
//       return true;
//     } catch (error: any) {
//       console.error('Error loading kits:', error);
//       toast({
//         title: "Error",
//         description: "Failed to load kits: " + (error.message || 'Unknown error'),
//         variant: "destructive",
//       });
//       setDataError("Failed to load kits");
//       return false;
//     }
//   };

//   const loadUsers = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('profiles')
//         .select('id, name, role, created_at')
//         .order('created_at', { ascending: false });
      
//       if (error) {
//         console.error('Error loading users:', error);
//         throw error;
//       }
      
//       // Simplified user loading - just use profile data without trying to get emails
//       const usersData = (data || []).map((profile: any) => ({
//         id: profile.id,
//         name: profile.name || 'Unknown',
//         email: 'Email not available', // Simplified for now
//         role: profile.role,
//         created_at: profile.created_at
//       }));
      
//       setUsers(usersData);
//       return true;
//     } catch (error: any) {
//       console.error('Error loading users:', error);
//       toast({
//         title: "Error",
//         description: "Failed to load users: " + (error.message || 'Unknown error'),
//         variant: "destructive",
//       });
//       return false;
//     }
//   };

//   const loadQuoteRequests = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('quote_requests')
//         .select('*')
//         .order('created_at', { ascending: false });
      
//       if (error) {
//         console.error('Error loading quote requests:', error);
//         throw error;
//       }
      
//       setQuoteRequests(data || []);
//       return true;
//     } catch (error: any) {
//       console.error('Error loading quote requests:', error);
//       toast({
//         title: "Error",
//         description: "Failed to load quote requests: " + (error.message || 'Unknown error'),
//         variant: "destructive",
//       });
//       return false;
//     }
//   };

//   const handleKitSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     try {
//       if (editingKit) {
//         const { error } = await supabase
//           .from('kits')
//           .update(kitForm)
//           .eq('id', editingKit.id);
        
//         if (error) throw error;
        
//         toast({
//           title: "Success",
//           description: "Kit updated successfully",
//         });
//       } else {
//         const { error } = await supabase
//           .from('kits')
//           .insert([kitForm]);
        
//         if (error) throw error;
        
//         toast({
//           title: "Success",
//           description: "Kit created successfully",
//         });
//       }
      
//       setIsKitDialogOpen(false);
//       setEditingKit(null);
//       setKitForm({
//         name: '',
//         category: 'home' as 'home' | 'away' | 'training' | 'goalkeeper',
//         image_url: '',
//         colors: { primary: '#0033A0', secondary: '#D1FF00' },
//         design_data: { pattern: 'solid', style: 'modern' }
//       });
//       loadKits();
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     }
//   };

//   const handleDeleteKit = async (kitId: string) => {
//     try {
//       const { error } = await supabase
//         .from('kits')
//         .delete()
//         .eq('id', kitId);
      
//       if (error) throw error;
      
//       toast({
//         title: "Success",
//         description: "Kit deleted successfully",
//       });
//       loadKits();
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     }
//   };

//   const updateQuoteStatus = async (requestId: string, status: string) => {
//     try {
//       const { error } = await supabase
//         .from('quote_requests')
//         .update({ status })
//         .eq('id', requestId);
      
//       if (error) throw error;
      
//       toast({
//         title: "Success",
//         description: "Status updated successfully",
//       });
//       loadQuoteRequests();
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     }
//   };

//   // Show loading while auth is being determined - be more patient
//   if (loading || !authChecked) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p>Loading authentication...</p>
//           <p className="text-sm text-muted-foreground mt-2">
//             Auth state: {loading ? 'Loading...' : 'Verifying admin access...'}
//           </p>
//           <div className="text-xs text-muted-foreground mt-2">
//             User: {user ? 'Found' : 'Not found'} | Admin: {isAdmin ? 'Yes' : 'No'} | Profile: {profile ? 'Loaded' : 'Loading'}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // If no user after all checks, redirect to home
//   if (!finalUser) {
//     console.log('No user found after all checks, redirecting to home');
//     return <Navigate to="/" replace />;
//   }

//   // If user exists but is not admin, show access denied
//   if (!finalIsAdmin) {
//     console.log('User is not admin after all checks, showing access denied');
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-6xl mb-4">🚫</div>
//           <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
//           <p className="text-muted-foreground mb-4">
//             You don't have permission to access the admin dashboard.
//           </p>
//           <div className="text-sm text-muted-foreground mb-4 space-y-1">
//             <p>User ID: {finalUser.id}</p>
//             <p>Hook Profile Role: {profile?.role || 'No role found'}</p>
//             <p>Hook Is Admin: {isAdmin ? 'Yes' : 'No'}</p>
//             <p>Direct Is Admin: {directAuthState?.isAdmin ? 'Yes' : 'No'}</p>
//           </div>
//           <Button 
//             variant="outline" 
//             onClick={() => window.location.href = '/'}
//           >
//             Go to Homepage
//           </Button>
//           <Button 
//             variant="outline" 
//             className="ml-2"
//             onClick={() => window.location.reload()}
//           >
//             Refresh Page
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   // Show data loading state
//   if (dataLoading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p>Loading dashboard data...</p>
//           <p className="text-sm text-muted-foreground mt-2">
//             Welcome, Admin! Preparing your dashboard...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Show data error state
//   if (dataError) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-destructive">Error loading dashboard: {dataError}</p>
//           <Button 
//             variant="outline" 
//             className="mt-4"
//             onClick={() => {
//               setDataError(null);
//               setDataLoading(true);
//               loadKits();
//               loadUsers();
//               loadQuoteRequests();
//             }}
//           >
//             Retry
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   // Finally, render the admin dashboard
//   console.log('Rendering admin dashboard');
//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto p-6">
//         <div className="mb-8">
//           <h1 className="text-3xl font-display font-bold text-foreground">Admin Dashboard</h1>
//           <p className="text-muted-foreground">Manage your StitchArc Sports platform</p>
//           <div className="text-xs text-muted-foreground mt-2">
//             Logged in as: {finalUser.email} | Role: {profile?.role} | User ID: {finalUser.id}
//           </div>
//         </div>

//         <Tabs defaultValue="kits" className="space-y-6">
//           <TabsList className="grid grid-cols-4 w-full max-w-md">
//             <TabsTrigger value="kits" className="flex items-center gap-2">
//               <Package className="w-4 h-4" />
//               Kits
//             </TabsTrigger>
//             <TabsTrigger value="users" className="flex items-center gap-2">
//               <Users className="w-4 h-4" />
//               Users
//             </TabsTrigger>
//             <TabsTrigger value="quotes" className="flex items-center gap-2">
//               <MessageSquare className="w-4 h-4" />
//               Quotes
//             </TabsTrigger>
//             <TabsTrigger value="settings" className="flex items-center gap-2">
//               <Settings className="w-4 h-4" />
//               Settings
//             </TabsTrigger>
//           </TabsList>

//           {/* Kit Management */}
//           <TabsContent value="kits">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between">
//                 <CardTitle>Kit Management</CardTitle>
//                 <Dialog open={isKitDialogOpen} onOpenChange={setIsKitDialogOpen}>
//                   <DialogTrigger asChild>
//                     <Button>
//                       <Plus className="w-4 h-4 mr-2" />
//                       Add Kit
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent className="max-w-md">
//                     <DialogHeader>
//                       <DialogTitle>{editingKit ? 'Edit Kit' : 'Add New Kit'}</DialogTitle>
//                     </DialogHeader>
//                     <form onSubmit={handleKitSubmit} className="space-y-4">
//                       <div>
//                         <Label htmlFor="name">Kit Name</Label>
//                         <Input
//                           id="name"
//                           value={kitForm.name}
//                           onChange={(e) => setKitForm({ ...kitForm, name: e.target.value })}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="category">Category</Label>
//                         <Select value={kitForm.category} onValueChange={(value) => setKitForm({ ...kitForm, category: value as 'home' | 'away' | 'training' | 'goalkeeper' })}>
//                           <SelectTrigger>
//                             <SelectValue />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="home">Home</SelectItem>
//                             <SelectItem value="away">Away</SelectItem>
//                             <SelectItem value="training">Training</SelectItem>
//                             <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <div>
//                         <Label htmlFor="image_url">Image URL</Label>
//                         <Input
//                           id="image_url"
//                           value={kitForm.image_url}
//                           onChange={(e) => setKitForm({ ...kitForm, image_url: e.target.value })}
//                           placeholder="https://example.com/image.jpg"
//                         />
//                       </div>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <Label htmlFor="primary_color">Primary Color</Label>
//                           <input
//                             type="color"
//                             id="primary_color"
//                             value={kitForm.colors.primary}
//                             onChange={(e) => setKitForm({ 
//                               ...kitForm, 
//                               colors: { ...kitForm.colors, primary: e.target.value }
//                             })}
//                             className="w-full h-10 rounded border border-border cursor-pointer"
//                           />
//                         </div>
//                         <div>
//                           <Label htmlFor="secondary_color">Secondary Color</Label>
//                           <input
//                             type="color"
//                             id="secondary_color"
//                             value={kitForm.colors.secondary}
//                             onChange={(e) => setKitForm({ 
//                               ...kitForm, 
//                               colors: { ...kitForm.colors, secondary: e.target.value }
//                             })}
//                             className="w-full h-10 rounded border border-border cursor-pointer"
//                           />
//                         </div>
//                       </div>
//                       <Button type="submit" className="w-full">
//                         {editingKit ? 'Update Kit' : 'Create Kit'}
//                       </Button>
//                     </form>
//                   </DialogContent>
//                 </Dialog>
//               </CardHeader>
//               <CardContent>
//                 {kits.length === 0 ? (
//                   <div className="text-center py-8">
//                     <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
//                     <p className="text-muted-foreground">No kits found. Create your first kit!</p>
//                   </div>
//                 ) : (
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>Name</TableHead>
//                         <TableHead>Category</TableHead>
//                         <TableHead>Status</TableHead>
//                         <TableHead>Created</TableHead>
//                         <TableHead>Actions</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {kits.map((kit) => (
//                         <TableRow key={kit.id}>
//                           <TableCell className="font-medium">{kit.name}</TableCell>
//                           <TableCell className="capitalize">{kit.category}</TableCell>
//                           <TableCell>
//                             <Badge variant={kit.is_active ? "default" : "secondary"}>
//                               {kit.is_active ? "Active" : "Inactive"}
//                             </Badge>
//                           </TableCell>
//                           <TableCell>{new Date(kit.created_at).toLocaleDateString()}</TableCell>
//                           <TableCell>
//                             <div className="flex items-center gap-2">
//                               <Button
//                                 size="sm"
//                                 variant="outline"
//                                 onClick={() => {
//                                   setEditingKit(kit);
//                                   setKitForm({
//                                     name: kit.name,
//                                     category: kit.category as 'home' | 'away' | 'training' | 'goalkeeper',
//                                     image_url: kit.image_url || '',
//                                     colors: kit.colors || { primary: '#0033A0', secondary: '#D1FF00' },
//                                     design_data: kit.design_data || { pattern: 'solid', style: 'modern' }
//                                   });
//                                   setIsKitDialogOpen(true);
//                                 }}
//                               >
//                                 <Edit className="w-4 h-4" />
//                               </Button>
//                               <Button
//                                 size="sm"
//                                 variant="outline"
//                                 onClick={() => handleDeleteKit(kit.id)}
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </Button>
//                             </div>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* User Management */}
//           <TabsContent value="users">
//             <Card>
//               <CardHeader>
//                 <CardTitle>User Management</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {users.length === 0 ? (
//                   <div className="text-center py-8">
//                     <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
//                     <p className="text-muted-foreground">No users found.</p>
//                   </div>
//                 ) : (
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>Name</TableHead>
//                         <TableHead>Email</TableHead>
//                         <TableHead>Role</TableHead>
//                         <TableHead>Joined</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {users.map((user) => (
//                         <TableRow key={user.id}>
//                           <TableCell className="font-medium">{user.name}</TableCell>
//                           <TableCell>{user.email}</TableCell>
//                           <TableCell>
//                             <Badge variant={user.role === 'admin' ? "default" : "secondary"}>
//                               {user.role}
//                             </Badge>
//                           </TableCell>
//                           <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Quote Requests */}
//           <TabsContent value="quotes">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Quote Requests</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {quoteRequests.length === 0 ? (
//                   <div className="text-center py-8">
//                     <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
//                     <p className="text-muted-foreground">No quote requests found.</p>
//                   </div>
//                 ) : (
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>Name</TableHead>
//                         <TableHead>Email</TableHead>
//                         <TableHead>Status</TableHead>
//                         <TableHead>Date</TableHead>
//                         <TableHead>Actions</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {quoteRequests.map((request) => (
//                         <TableRow key={request.id}>
//                           <TableCell className="font-medium">{request.name}</TableCell>
//                           <TableCell>{request.email}</TableCell>
//                           <TableCell>
//                             <Select 
//                               value={request.status} 
//                               onValueChange={(value) => updateQuoteStatus(request.id, value)}
//                             >
//                               <SelectTrigger className="w-32">
//                                 <SelectValue />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 <SelectItem value="pending">Pending</SelectItem>
//                                 <SelectItem value="contacted">Contacted</SelectItem>
//                                 <SelectItem value="quoted">Quoted</SelectItem>
//                                 <SelectItem value="completed">Completed</SelectItem>
//                               </SelectContent>
//                             </Select>
//                           </TableCell>
//                           <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
//                           <TableCell>
//                             <Button size="sm" variant="outline">
//                               <Eye className="w-4 h-4" />
//                             </Button>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Settings */}
//           <TabsContent value="settings">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Platform Settings</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-6">
//                   <div>
//                     <h4 className="text-sm font-medium mb-2">Storage Management</h4>
//                     <p className="text-sm text-muted-foreground mb-4">
//                       Manage uploaded files and storage buckets
//                     </p>
//                     <Button variant="outline">
//                       <Download className="w-4 h-4 mr-2" />
//                       Export Data
//                     </Button>
//                   </div>
                  
//                   <div>
//                     <h4 className="text-sm font-medium mb-2">System Information</h4>
//                     <div className="text-sm text-muted-foreground space-y-1">
//                       <p>Total Kits: {kits.length}</p>
//                       <p>Total Users: {users.length}</p>
//                       <p>Pending Quotes: {quoteRequests.filter(q => q.status === 'pending').length}</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default Admin;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Package, 
  MessageSquare,
  Eye,
  TrendingUp,
  DollarSign,
  Star,
  Layers,
  Upload,
  BarChart3,
  ShoppingCart,
  Loader2,
  X
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  short_description: string;
  sku: string;
  price: number;
  compare_price: number;
  cost_price: number;
  images: string[];
  tags: string[];
  is_active: boolean;
  is_featured: boolean;
  is_trending: boolean;
  category_id: string;
  category?: Category;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  parent_id: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
  kit_request_id: string;
}

interface ProductForm {
  name: string;
  description: string;
  short_description: string;
  sku: string;
  price: number;
  compare_price: number;
  cost_price: number;
  category_id: string;
  tags: string;
  images: string;
  is_active: boolean;
  is_featured: boolean;
  is_trending: boolean;
  imageFile: File | null;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [authChecked, setAuthChecked] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [productForm, setProductForm] = useState<ProductForm>({
    name: '',
    description: '',
    short_description: '',
    sku: '',
    price: 0,
    compare_price: 0,
    cost_price: 0,
    category_id: '',
    tags: '',
    images: '',
    is_active: true,
    is_featured: false,
    is_trending: false,
    imageFile: null
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    parent_id: '',
    sort_order: 0
  });

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingQuotes: 0
  });

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  useEffect(() => {
    const verifyAdmin = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        sessionStorage.removeItem('currentUserRole');
        window.location.href = '/login';
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profileError || profile?.role !== 'admin') {
        sessionStorage.removeItem('currentUserRole');
        window.location.href = '/';
        return;
      }

      sessionStorage.setItem('currentUserRole', 'admin');
      setAuthChecked(true);
      loadData();
    };

    verifyAdmin();
  }, [navigate]);

  const loadData = async () => {
    try {
      await Promise.all([
        loadProducts(),
        loadCategories(),
        loadUsers(),
        loadQuoteRequests()
      ]);
      loadStats();
    } catch (error) {
      toast({
        title: "Error loading data",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(name)
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
      return;
    }
    
    const transformedProducts = data?.map((product: any) => ({
      ...product,
      images: Array.isArray(product.images) ? product.images : (product.images ? [product.images] : []),
      tags: Array.isArray(product.tags) ? product.tags : [],
      is_trending: product.is_trending || false,
      is_active: product.is_active !== false
    })) || [];
    
    setProducts(transformedProducts);
  };

  const loadCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      });
      return;
    }
    
    setCategories(data || []);
  };

  const loadUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error loading users:', error);
      return;
    }
    
    const transformedUsers = data?.map((profile: any) => ({
      id: profile.id,
      name: profile.name || 'Unknown User',
      email: profile.email || 'No email',
      role: profile.role,
      created_at: profile.created_at
    })) || [];
    
    setUsers(transformedUsers);
  };

  const loadQuoteRequests = async () => {
    const { data, error } = await supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load quote requests",
        variant: "destructive",
      });
      return;
    }
    
    setQuoteRequests(data || []);
  };

  const loadStats = () => {
    setStats({
      totalProducts: products.length,
      totalUsers: users.length,
      pendingQuotes: quoteRequests.filter(q => q.status === 'pending').length,
      totalRevenue: products.reduce((sum, p) => sum + (p.price || 0), 0)
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 2MB",
        variant: "destructive",
      });
      return;
    }

    try {
      const base64Image = await fileToBase64(file);
      setProductForm(prev => ({
        ...prev,
        images: base64Image,
        imageFile: file
      }));
    } catch (error) {
      toast({
        title: "Image upload failed",
        description: "Could not process the image",
        variant: "destructive",
      });
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      const productData = {
        name: productForm.name,
        description: productForm.description,
        short_description: productForm.short_description,
        sku: productForm.sku,
        price: productForm.price,
        compare_price: productForm.compare_price,
        cost_price: productForm.cost_price,
        category_id: productForm.category_id || null,
        tags: productForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        images: productForm.images ? [productForm.images] : [],
        is_active: productForm.is_active,
        is_featured: productForm.is_featured,
        is_trending: productForm.is_trending
      };

      const { error } = editingProduct
        ? await supabase.from('products').update(productData).eq('id', editingProduct.id)
        : await supabase.from('products').insert([productData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: editingProduct ? "Product updated successfully" : "Product created successfully",
      });
      
      setIsProductDialogOpen(false);
      setEditingProduct(null);
      resetProductForm();
      await loadProducts();
    } catch (error: any) {
      console.error("Product submission error:", error);
      toast({
        title: "Error",
        description: error.message.includes('row-level security') 
          ? "Admin permissions required. Please check your role."
          : error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const categoryData = {
        ...categoryForm,
        parent_id: categoryForm.parent_id || null
      };

      if (editingCategory) {
        const { error } = await supabase
          .from('categories')
          .update(categoryData)
          .eq('id', editingCategory.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Category updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([categoryData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Category created successfully",
        });
      }
      
      setIsCategoryDialogOpen(false);
      setEditingCategory(null);
      resetCategoryForm();
      loadCategories();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      loadProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
      loadCategories();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateQuoteStatus = async (requestId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('quote_requests')
        .update({ status })
        .eq('id', requestId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Status updated successfully",
      });
      loadQuoteRequests();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      description: '',
      short_description: '',
      sku: '',
      price: 0,
      compare_price: 0,
      cost_price: 0,
      category_id: '',
      tags: '',
      images: '',
      is_active: true,
      is_featured: false,
      is_trending: false,
      imageFile: null
    });
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: '',
      description: '',
      parent_id: '',
      sort_order: 0
    });
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold bg-gradient-hero bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Welcome back! Manage your platform
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-accent/20 text-accent border-accent/30 px-3 py-1">
              <Star className="w-4 h-4 mr-1" />
              Admin Panel
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-brand border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.totalProducts}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-brand border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold text-green-600">{stats.totalUsers}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-brand border-0 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                  <p className="text-3xl font-bold text-yellow-600">${stats.totalRevenue.toFixed(2)}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +25% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-brand border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Quotes</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.pendingQuotes}</p>
                  <p className="text-xs text-red-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Needs attention
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-white/50 backdrop-blur-sm border border-border/50 p-1 h-14 rounded-2xl">
            <TabsTrigger value="products" className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Layers className="w-4 h-4" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="quotes" className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <MessageSquare className="w-4 h-4" />
              Quotes
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <Card className="card-brand border-0 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-6">
                <div>
                  <CardTitle className="text-2xl font-display flex items-center gap-2">
                    <Package className="w-6 h-6 text-primary" />
                    Product Management
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">Manage your product catalog and inventory</p>
                </div>
                <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="btn-gradient">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-display">
                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleProductSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Product Name *</Label>
                          <Input
                            id="name"
                            value={productForm.name}
                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            placeholder="Enter product name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="sku">SKU *</Label>
                          <Input
                            id="sku"
                            value={productForm.sku}
                            onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                            placeholder="Enter product SKU"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="short_description">Short Description</Label>
                        <Input
                          id="short_description"
                          value={productForm.short_description}
                          onChange={(e) => setProductForm({ ...productForm, short_description: e.target.value })}
                          placeholder="Brief product description"
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Full Description</Label>
                        <Textarea
                          id="description"
                          value={productForm.description}
                          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                          placeholder="Detailed product description"
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="price">Price ($) *</Label>
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={productForm.price}
                            onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })}
                            placeholder="0.00"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="compare_price">Compare Price ($)</Label>
                          <Input
                            id="compare_price"
                            type="number"
                            step="0.01"
                            value={productForm.compare_price}
                            onChange={(e) => setProductForm({ ...productForm, compare_price: parseFloat(e.target.value) || 0 })}
                            placeholder="0.00"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cost_price">Cost Price ($)</Label>
                          <Input
                            id="cost_price"
                            type="number"
                            step="0.01"
                            value={productForm.cost_price}
                            onChange={(e) => setProductForm({ ...productForm, cost_price: parseFloat(e.target.value) || 0 })}
                            placeholder="0.00"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select value={productForm.category_id} onValueChange={(value) => setProductForm({ ...productForm, category_id: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="tags">Tags (comma separated)</Label>
                          <Input
                            id="tags"
                            value={productForm.tags}
                            onChange={(e) => setProductForm({ ...productForm, tags: e.target.value })}
                            placeholder="tag1, tag2, tag3"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Product Image</Label>
                        <div className="mt-2 flex items-center gap-4">
                          {productForm.images ? (
                            <div className="relative">
                              <img
                                src={productForm.images}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded-lg border"
                              />
                              <button
                                type="button"
                                onClick={() => setProductForm({ ...productForm, images: '', imageFile: null })}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : null}
                          
                          <div>
                            <input
                              id="product-image-upload"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                            <Label htmlFor="product-image-upload">
                              <Button asChild variant="outline">
                                <div className="flex items-center gap-2 cursor-pointer">
                                  <Upload className="w-4 h-4" />
                                  {productForm.images ? 'Change Image' : 'Upload Image'}
                                </div>
                              </Button>
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="is_active"
                            checked={productForm.is_active}
                            onChange={(e) => setProductForm({ ...productForm, is_active: e.target.checked })}
                            className="rounded"
                          />
                          <Label htmlFor="is_active">Active Product</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="is_featured"
                            checked={productForm.is_featured}
                            onChange={(e) => setProductForm({ ...productForm, is_featured: e.target.checked })}
                            className="rounded"
                          />
                          <Label htmlFor="is_featured">Featured Product</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="is_trending"
                            checked={productForm.is_trending}
                            onChange={(e) => setProductForm({ ...productForm, is_trending: e.target.checked })}
                            className="rounded"
                          />
                          <Label htmlFor="is_trending">Trending Product</Label>
                        </div>
                      </div>

                      <Button type="submit" className="w-full btn-gradient" disabled={isUploading}>
                        {isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {editingProduct ? 'Updating...' : 'Creating...'}
                          </>
                        ) : editingProduct ? (
                          'Update Product'
                        ) : (
                          'Create Product'
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Product</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id} className="hover:bg-muted/50 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {product.images && product.images.length > 0 && (
                                <img 
                                  src={product.images[0]} 
                                  alt={product.name}
                                  className="w-12 h-12 object-cover rounded-lg border"
                                />
                              )}
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-muted-foreground">{product.short_description}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{product.category?.name || 'Uncategorized'}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">${product.price}</TableCell>
                          <TableCell>
                            <Badge variant={product.is_active ? "default" : "secondary"} className="gap-1">
                              {product.is_active ? "Active" : "Inactive"}
                              {product.is_featured && <Star className="w-3 h-3 ml-1" />}
                              {product.is_trending && <TrendingUp className="w-3 h-3 ml-1" />}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingProduct(product);
                                  setProductForm({
                                    name: product.name,
                                    description: product.description || '',
                                    short_description: product.short_description || '',
                                    sku: product.sku,
                                    price: product.price || 0,
                                    compare_price: product.compare_price || 0,
                                    cost_price: product.cost_price || 0,
                                    category_id: product.category_id || '',
                                    tags: product.tags?.join(', ') || '',
                                    images: product.images?.[0] || '',
                                    is_active: product.is_active !== false,
                                    is_featured: product.is_featured || false,
                                    is_trending: product.is_trending || false,
                                    imageFile: null
                                  });
                                  setIsProductDialogOpen(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

 <TabsContent value="categories" className="space-y-6">
  <Card className="card-brand border-0 shadow-xl">
    <CardHeader className="flex flex-row items-center justify-between pb-6">
      <div>
        <CardTitle className="text-2xl font-display flex items-center gap-2">
          <Layers className="w-6 h-6 text-primary" />
          Category Management
        </CardTitle>
        <p className="text-muted-foreground mt-1">
          Organize your products into categories and subcategories
        </p>
      </div>

      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="btn-gradient"
            onClick={() => {
              setEditingCategory(null);
              setCategoryForm({
                name: '',
                description: '',
                parent_id: null, // Changed from 'none' to null
                sort_order: 0,
              });
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-display">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCategorySubmit(e);
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="category_name">Category Name *</Label>
              <Input
                id="category_name"
                value={categoryForm.name}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, name: e.target.value })
                }
                placeholder="Enter category name"
                required
              />
            </div>

            <div>
              <Label htmlFor="category_description">Description</Label>
              <Textarea
                id="category_description"
                value={categoryForm.description}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, description: e.target.value })
                }
                placeholder="Category description"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="parent_category">Parent Category</Label>
              <Select
                value={categoryForm.parent_id || 'none'} // Still use 'none' for UI
                onValueChange={(value) =>
                  setCategoryForm({
                    ...categoryForm,
                    parent_id: value === 'none' ? null : value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select parent (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (Top Level)</SelectItem>
                  {categories
                    .filter((c) => !c.parent_id)
                    .map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input
                id="sort_order"
                type="number"
                value={categoryForm.sort_order}
                onChange={(e) =>
                  setCategoryForm({
                    ...categoryForm,
                    sort_order: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="0"
              />
            </div>

            <Button type="submit" className="w-full btn-gradient">
              {editingCategory ? 'Update Category' : 'Create Category'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </CardHeader>

    <CardContent>
      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Sort Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories.map((category) => (
              <TableRow
                key={category.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    {category.parent_id && (
                      <span className="text-muted-foreground">└─</span>
                    )}
                    <span className="font-medium">{category.name}</span>
                  </div>
                  {category.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.description}
                    </p>
                  )}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={category.parent_id ? 'secondary' : 'default'}
                  >
                    {category.parent_id ? 'Subcategory' : 'Main Category'}
                  </Badge>
                </TableCell>

                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {
                      products.filter(
                        (p) => p.category_id === category.id
                      ).length
                    }{' '}
                    products
                  </span>
                </TableCell>

                <TableCell>{category.sort_order}</TableCell>

                <TableCell>
                  <Badge
                    variant={category.is_active ? 'default' : 'secondary'}
                  >
                    {category.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingCategory(category);
                        setCategoryForm({
                          name: category.name,
                          description: category.description || '',
                          parent_id: category.parent_id || null, // Changed from 'none' to null
                          sort_order: category.sort_order,
                        });
                        setIsCategoryDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
</TabsContent>

          <TabsContent value="users">
            <Card className="card-brand border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-display flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  User Management
                </CardTitle>
                <p className="text-muted-foreground">Manage registered users and their permissions</p>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id} className="hover:bg-muted/50 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="font-medium text-primary">
                                  {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{user.name || 'Unknown User'}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'admin' ? "default" : "secondary"}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">
                              {new Date(user.created_at).toLocaleDateString()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              Active
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quotes">
            <Card className="card-brand border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-display flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  Quote Requests
                </CardTitle>
                <p className="text-muted-foreground">Manage customer quote requests and inquiries</p>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Customer</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quoteRequests.map((request) => (
                        <TableRow key={request.id} className="hover:bg-muted/50 transition-colors">
                          <TableCell>
                            <div>
                              <p className="font-medium">{request.name}</p>
                              <p className="text-sm text-muted-foreground">{request.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm max-w-xs truncate">{request.message}</p>
                          </TableCell>
                          <TableCell>
                            <Select 
                              value={request.status} 
                              onValueChange={(value) => updateQuoteStatus(request.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="quoted">Quoted</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">
                              {new Date(request.created_at).toLocaleDateString()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid gap-6">
              <Card className="card-brand border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-display flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-primary" />
                    Analytics & Insights
                  </CardTitle>
                  <p className="text-muted-foreground">Monitor your business performance and growth</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-600">Conversion Rate</p>
                          <p className="text-2xl font-bold text-blue-800">12.5%</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-blue-600" />
                      </div>
                    </Card>
                    
                    <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-600">Average Order Value</p>
                          <p className="text-2xl font-bold text-green-800">$89.50</p>
                        </div>
                        <ShoppingCart className="w-8 h-8 text-green-600" />
                      </div>
                    </Card>
                    
                    <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-600">Customer Satisfaction</p>
                          <p className="text-2xl font-bold text-purple-800">4.8/5</p>
                        </div>
                        <Star className="w-8 h-8 text-purple-600" />
                      </div>
                    </Card>
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-muted-foreground">Advanced analytics dashboard coming soon...</p>
                    <p className="text-sm text-muted-foreground mt-2">Track sales, user behavior, and performance metrics</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;