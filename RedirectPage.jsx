import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { loadLinks, saveLinks } from '../utils/storage';

export default function RedirectPage(){
  const { code } = useParams();
  const saved = loadLinks();
  const link = saved.find(l=>l.code===code);
  if(!link || link.expires < Date.now()) return <Navigate to="/" replace />;
  // log click
  link.clicks.push({ timestamp: Date.now(), source: navigator.userAgent, geo: Intl.DateTimeFormat().resolvedOptions().timeZone||'unknown' });
  saveLinks(saved);
  useEffect(()=>{ window.location.href = link.original; }, []);
  return <>Redirecting...</>;
}
