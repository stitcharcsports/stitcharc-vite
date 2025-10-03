-- -- Create enum for user roles
-- CREATE TYPE public.user_role AS ENUM ('admin', 'user');

-- -- Create enum for kit categories
-- CREATE TYPE public.kit_category AS ENUM ('home', 'away', 'training', 'goalkeeper');

-- -- Create profiles table for additional user information
-- CREATE TABLE public.profiles (
--     id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
--     name TEXT,
--     profile_image TEXT,
--     role user_role DEFAULT 'user',
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- Create kits table for predefined kit designs
-- CREATE TABLE public.kits (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     name TEXT NOT NULL,
--     category kit_category NOT NULL,
--     image_url TEXT,
--     colors JSONB,
--     design_data JSONB,
--     is_active BOOLEAN DEFAULT true,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- Create kit_requests table for tracking user kit customizations
-- CREATE TABLE public.kit_requests (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
--     kit_design JSONB NOT NULL,
--     headshot_url TEXT,
--     preview_image_url TEXT,
--     status TEXT DEFAULT 'pending',
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- Create quote_requests table for business inquiries
-- CREATE TABLE public.quote_requests (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
--     name TEXT NOT NULL,
--     email TEXT NOT NULL,
--     message TEXT NOT NULL,
--     kit_request_id UUID REFERENCES public.kit_requests(id) ON DELETE SET NULL,
--     status TEXT DEFAULT 'pending',
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- Enable RLS on all tables
-- ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.kits ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.kit_requests ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- -- Profiles policies
-- CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
-- CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
-- CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
-- CREATE POLICY "Admins can manage all profiles" ON public.profiles FOR ALL USING (
--     EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
-- );

-- -- Kits policies (public read, admin write)
-- CREATE POLICY "Everyone can view active kits" ON public.kits FOR SELECT USING (is_active = true);
-- CREATE POLICY "Admins can manage kits" ON public.kits FOR ALL USING (
--     EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
-- );

-- -- Kit requests policies
-- CREATE POLICY "Users can view own kit requests" ON public.kit_requests FOR SELECT USING (auth.uid() = user_id);
-- CREATE POLICY "Users can create kit requests" ON public.kit_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
-- CREATE POLICY "Admins can view all kit requests" ON public.kit_requests FOR SELECT USING (
--     EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
-- );
-- CREATE POLICY "Admins can update kit requests" ON public.kit_requests FOR UPDATE USING (
--     EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
-- );

-- -- Quote requests policies
-- CREATE POLICY "Users can view own quote requests" ON public.quote_requests FOR SELECT USING (auth.uid() = user_id);
-- CREATE POLICY "Users can create quote requests" ON public.quote_requests FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Admins can view all quote requests" ON public.quote_requests FOR ALL USING (
--     EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
-- );

-- -- Function to handle new user signup
-- CREATE OR REPLACE FUNCTION public.handle_new_user()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     INSERT INTO public.profiles (id, name, profile_image, role)
--     VALUES (
--         NEW.id,
--         COALESCE(NEW.raw_user_metadata->>'name', NEW.raw_user_metadata->>'full_name'),
--         NEW.raw_user_metadata->>'avatar_url',
--         CASE 
--             WHEN NEW.email = 'admin@sticharc.com' THEN 'admin'::user_role
--             ELSE 'user'::user_role
--         END
--     );
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;

-- -- Trigger for new user signup
-- CREATE TRIGGER on_auth_user_created
--     AFTER INSERT ON auth.users
--     FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- -- Function to update updated_at timestamp
-- CREATE OR REPLACE FUNCTION public.update_updated_at_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     NEW.updated_at = NOW();
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- -- Trigger for kits updated_at
-- CREATE TRIGGER update_kits_updated_at
--     BEFORE UPDATE ON public.kits
--     FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- -- Create storage buckets
-- INSERT INTO storage.buckets (id, name, public) VALUES 
--     ('kit-uploads', 'kit-uploads', true),
--     ('headshots', 'headshots', true),
--     ('kit-previews', 'kit-previews', true);

-- -- Storage policies for kit uploads
-- CREATE POLICY "Users can upload kit designs" ON storage.objects FOR INSERT 
--     WITH CHECK (bucket_id = 'kit-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- CREATE POLICY "Users can view kit uploads" ON storage.objects FOR SELECT 
--     USING (bucket_id = 'kit-uploads');

-- -- Storage policies for headshots
-- CREATE POLICY "Users can upload headshots" ON storage.objects FOR INSERT 
--     WITH CHECK (bucket_id = 'headshots' AND auth.uid()::text = (storage.foldername(name))[1]);

-- CREATE POLICY "Users can view headshots" ON storage.objects FOR SELECT 
--     USING (bucket_id = 'headshots');

-- -- Storage policies for kit previews
-- CREATE POLICY "Anyone can view kit previews" ON storage.objects FOR SELECT 
--     USING (bucket_id = 'kit-previews');

-- CREATE POLICY "System can upload kit previews" ON storage.objects FOR INSERT 
--     WITH CHECK (bucket_id = 'kit-previews');

-- -- Insert some sample kits
-- INSERT INTO public.kits (name, category, image_url, colors, design_data) VALUES
--     ('Classic Home Kit', 'home', '/placeholder.svg', '{"primary": "#FF0000", "secondary": "#FFFFFF"}', '{"pattern": "solid", "style": "classic"}'),
--     ('Modern Away Kit', 'away', '/placeholder.svg', '{"primary": "#000000", "secondary": "#GOLD"}', '{"pattern": "gradient", "style": "modern"}'),
--     ('Training Kit', 'training', '/placeholder.svg', '{"primary": "#0066CC", "secondary": "#FFFFFF"}', '{"pattern": "stripes", "style": "performance"}'),
--     ('Goalkeeper Kit', 'goalkeeper', '/placeholder.svg', '{"primary": "#00FF00", "secondary": "#000000"}', '{"pattern": "solid", "style": "padded"}');