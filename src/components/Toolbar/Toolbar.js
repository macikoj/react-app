import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { NavLink } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  const backStyle={
    backgroundColor: '#3b84de'
  }
  export default function ButtonAppBar() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <AppBar position="static" style={backStyle}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              ProSoccerTeam
            </Typography>
            <NavLink  to="/trainingList" style={{ textDecoration: 'none' }}><Button >Twoj grafik</Button></NavLink>
            <NavLink  to="/trainingCreator" style={{ textDecoration: 'none' }}><Button >Strórz trening</Button></NavLink>
            <NavLink  to="/traininggenerator" style={{ textDecoration: 'none' }}><Button >Wygeneruj Treningi</Button></NavLink>
            <NavLink  to="/teamComposition" exact style={{ textDecoration: 'none' }}><Button >Zarządzaj drużyną</Button></NavLink>

            <NavLink  to="/playerstatistics" style={{ textDecoration: 'none' }}><Button >Statystyki piłkarzy</Button></NavLink>
            <NavLink  to="/calendar" style={{ textDecoration: 'none' }}><Button >Kalendarz</Button></NavLink>
            <NavLink  to="/team" style={{ textDecoration: 'none' }}><Button >Zespół</Button></NavLink>
            <NavLink  to="/" onClick={()=>{localStorage.setItem('token', null)}} style={{ textDecoration: 'none' }}><Button onClick={()=>{localStorage.setItem('token', null)}}>Wyloguj</Button></NavLink>
          </Toolbar>
        </AppBar>
      </div>
    );
  }