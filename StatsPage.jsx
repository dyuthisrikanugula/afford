import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadLinks } from '../utils/storage';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Alert } from '@mui/material';

export default function StatsPage(){
  const { code } = useParams();
  const saved = loadLinks();
  const link = saved.find(l=>l.code===code);
  if(!link) return <Alert severity="error">Not found</Alert>;
  return (
    <div>
      <Typography variant="h5">Stats for {code}</Typography>
      <Typography>Original URL: <a href={link.original}>{link.original}</a></Typography>
      <Typography>Total clicks: {link.clicks.length}</Typography>
      {link.clicks.length>0 && (
        <Table>
          <TableHead>
            <TableRow><TableCell>Time</TableCell><TableCell>Source</TableCell><TableCell>Geo</TableCell></TableRow>
          </TableHead>
          <TableBody>
            {link.clicks.map((c,i)=>(
              <TableRow key={i}>
                <TableCell>{new Date(c.timestamp).toLocaleString()}</TableCell>
                <TableCell>{c.source}</TableCell>
                <TableCell>{c.geo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Button component={Link} to="/" sx={{mt:2}}>Create more</Button>
    </div>
  );
}
