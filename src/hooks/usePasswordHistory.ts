import { useState, useEffect } from 'react';

interface SavedPassword {
  value: string;
  timestamp: number;
  type: 'password' | 'passphrase';
}

export function usePasswordHistory() {
  const [savedPasswords, setSavedPasswords] = useState<SavedPassword[]>([]);

  // Load saved passwords from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('passwordHistory');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Add type field if it doesn't exist (backwards compatibility)
        const updated = parsed.map((item: any) => ({
          ...item,
          type: item.type || 'password'
        }));
        setSavedPasswords(updated);
      } catch (error) {
        console.error('Error loading password history:', error);
      }
    }
  }, []);

  // Save to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem('passwordHistory', JSON.stringify(savedPasswords));
  }, [savedPasswords]);

  const addPassword = (value: string, type: 'password' | 'passphrase' = 'password') => {
    setSavedPasswords(prev => {
      // Check if password already exists
      const exists = prev.some(p => p.value === value);
      if (exists) return prev;

      // Add new password at the beginning of the array
      const newPasswords = [
        { value, timestamp: Date.now(), type },
        ...prev
      ];

      // Keep only the last 10 items
      return newPasswords.slice(0, 10);
    });
  };

  const deletePassword = (value: string) => {
    setSavedPasswords(prev => prev.filter(p => p.value !== value));
  };

  const clearHistory = () => {
    setSavedPasswords([]);
  };

  return {
    savedPasswords,
    addPassword,
    deletePassword,
    clearHistory
  };
} 