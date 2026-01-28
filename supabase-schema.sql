-- =====================================================
-- SCRUB DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- =====================================================

-- 1. Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT NOT NULL,
  username TEXT UNIQUE,
  is_it BOOLEAN DEFAULT FALSE,
  is_startup BOOLEAN DEFAULT FALSE,
  is_developer BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create modules table
CREATE TABLE IF NOT EXISTS public.modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  estimated_cost_year NUMERIC NOT NULL,
  link TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;

-- 4. Profiles RLS Policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- 5. Modules RLS Policies
-- Creators can view their own modules (any status)
CREATE POLICY "Creators can view own modules" 
  ON public.modules FOR SELECT 
  USING (auth.uid() = user_id);

-- Everyone can view approved modules
CREATE POLICY "Everyone can view approved modules" 
  ON public.modules FOR SELECT 
  USING (status = 'approved');

-- Service role can view all modules (for admin dashboard)
-- Note: For production, you should add an 'is_admin' flag to profiles
-- and use that to control access. For now, all authenticated users
-- can access the admin dashboard (you can protect this route later)
CREATE POLICY "Authenticated users can view all modules for admin" 
  ON public.modules FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- Allow authenticated users to update module status (for admin)
-- In production, restrict this to admin users only
CREATE POLICY "Authenticated users can update modules for admin" 
  ON public.modules FOR UPDATE 
  USING (auth.uid() IS NOT NULL);

-- Creators can insert their own modules
CREATE POLICY "Creators can insert own modules" 
  ON public.modules FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Creators can update their own modules
CREATE POLICY "Creators can update own modules" 
  ON public.modules FOR UPDATE 
  USING (auth.uid() = user_id);

-- Creators can delete their own modules
CREATE POLICY "Creators can delete own modules" 
  ON public.modules FOR DELETE 
  USING (auth.uid() = user_id);

-- 6. Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Create trigger to call function on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Add updated_at triggers
DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS modules_updated_at ON public.modules;
CREATE TRIGGER modules_updated_at
  BEFORE UPDATE ON public.modules
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 10. Create index for faster module queries
CREATE INDEX IF NOT EXISTS idx_modules_status ON public.modules(status);
CREATE INDEX IF NOT EXISTS idx_modules_user_id ON public.modules(user_id);
