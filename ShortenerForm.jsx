import React, { useState } from 'react';
import { TextField, Button, Grid, Card, CardContent, Alert } from '@mui/material';
import { nanoid } from 'nanoid';
import { loadLinks, saveLinks } from '../utils/storage';
import { useNavigate } from 'react-router-dom';

export default function ShortenerForm(){
  const [slots, setSlots] = useState([{url:'', validity:'', shortcode:''}]);
  const [error, setError] = useState('');
  const [resultCodes, setResult] = useState([]);
  const navigate = useNavigate();

  const addSlot = () => {
    if(slots.length<5) setSlots([...slots, {url:'', validity:'', shortcode:''}]);
  };

  const handleChange = (i, key, val)=>{
    const s=[...slots]; s[i][key]=val; setSlots(s);
  };

  const validUrl = url=>/^https?:\/\/\S+$/.test(url);
  const handleSubmit = e=>{
    e.preventDefault();
    setError('');
    const saved = loadLinks();
    const codes = [];
    for(const slot of slots){
      if(!validUrl(slot.url)){
        setError('Invalid URL format, include http(s)://');
        return;
      }
      const validity = slot.validity?parseInt(slot.validity):30;
      if(isNaN(validity)||validity<=0){
        setError('Validity must be a positive integer');
        return;
      }
      let code = slot.shortcode?.trim()||nanoid(6);
      if(saved.find(l=>l.code===code) || codes.includes(code)){
        setError(`Shortcode collision: ${code}`);
        return;
      }
      const expires = Date.now()+validity*60000;
      saved.push({ code, original: slot.url, created: Date.now(), expires, clicks:[] });
      codes.push(code);
    }
    saveLinks(saved);
    setResult(codes);
  };

  return (
    <form onSubmit={handleSubmit}>
      {slots.map((s,i)=>(
        <Card key={i} sx={{mb:2}}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <TextField label="Original URL" fullWidth required
                  value={s.url} onChange={e=>handleChange(i,'url',e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Validity (min)" fullWidth 
                  value={s.validity} onChange={e=>handleChange(i,'validity',e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Custom shortcode (optional)" fullWidth
                  value={s.shortcode} onChange={e=>handleChange(i,'shortcode',e.target.value)} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
      {error && <Alert severity="error" sx={{mb:2}}>{error}</Alert>}
      <Button variant="contained" onClick={addSlot} disabled={slots.length>=5} sx={{mr:2}}>
        Add Slot
      </Button>
      <Button type="submit" variant="contained">Shorten</Button>
      {resultCodes.length>0 && resultCodes.map(code=>(
        <Alert severity="success" key={code} sx={{mt:2}}>
          <a href={`/${code}`}>{window.location.origin}/{code}</a> 
          &nbsp; stats:&nbsp;
          <Button onClick={()=>navigate(`/stats/${code}`)}>View</Button>
        </Alert>
      ))}
    </form>
  );
}
