// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
// الربط مع ملف السوبابيز الذي أنشأته سابق
import { supabase } from '../supabaseClient';
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. التحقق مما إذا كانت هناك جلسة نشطة بالفعل عند تحميل التطبيق
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. الاستماع في الوقت الفعلي لتغيرات الحالة (تسجيل دخول، تسجيل خروج)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // دالات المصادقة الجاهزة للاستخدام في أي مكان
  const signUp = (email, password) => supabase.auth.signUp({ email, password });
  const signIn = (email, password) => supabase.auth.signInWithPassword({ email, password });
  const signOut = () => supabase.auth.signOut();

  const value = {
    user,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// كود مخصص (Hook) لتسهيل استدعاء الـ Auth لاحقاً في الصفحات
export const useAuth = () => useContext(AuthContext);