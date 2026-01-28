export type Profile = {
  id: string;
  name: string | null;
  email: string;
  username: string | null;
  is_it: boolean;
  is_startup: boolean;
  is_developer: boolean;
  created_at: string;
  updated_at: string;
};

export type Module = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  estimated_cost_year: number;
  link: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      modules: {
        Row: Module;
        Insert: Omit<Module, 'id' | 'created_at' | 'updated_at' | 'status'> & { status?: Module['status'] };
        Update: Partial<Omit<Module, 'id' | 'user_id' | 'created_at'>>;
      };
    };
  };
};
