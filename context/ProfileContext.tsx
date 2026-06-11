import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadData, saveData } from '../utils/storage';

export type Profile = {
  name: string;
  bio: string;
  skills: string[];
};

type Ctx = {
  profile: Profile;
  updateProfile: (p: Profile) => void;
};

const ProfileContext = createContext<Ctx | null>(null);
const KEY = '@profile';

const defaultProfile: Profile = {
  name: 'Twoje imię',
  bio: 'Krótki opis...',
  skills: ['React Native'],
};

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await loadData<Profile>(KEY);
      if (stored) setProfile(stored);
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (loaded) saveData(KEY, profile);
  }, [profile, loaded]);

  const updateProfile = (p: Profile) => {
    setProfile(p);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used inside provider');
  return ctx;
}