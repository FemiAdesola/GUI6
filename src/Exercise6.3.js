import React from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import texts from './texts.json';
import { FormControl } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
	menuButton: {
		marginRight: theme.spacing(2),
	},
}));

function A() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [locale, setLocale] = React.useState("en");
    const [supportedLocales, setSupportedLocales] = React.useState([]);
    const [screen, setScreen] = React.useState("");
    const menuOpen = Boolean(anchorEl);
	
    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const updateS = (event) => {
        setScreen([...event.target.value].reverse().join(""));
    }
    const df = new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long', hour:'2-digit', minute:'2-digit', second:'2-digit'});
  
	

	const bundle = texts.hasOwnProperty(locale)?texts[locale]:texts["en"];
	// from lecture
	React.useEffect(() => {
		const allLocales = [];
		for (let i = 0; i < "abcdefghijklmnopqrstuvwxyz".length; i++) {
			for (let j = 0; j < "abcdefghijklmnopqrstuvwxyz".length; j++) {
				let languageString = "abcdefghijklmnopqrstuvwxyz"[i] + "abcdefghijklmnopqrstuvwxyz"[j];
				let supported = Intl.NumberFormat.supportedLocalesOf(languageString);
				if (supported.length > 0)
					allLocales.push(supported[0]);
			}
		}
		setSupportedLocales(allLocales);
	}, []);
	
	const styledClasses = useStyles();
	
	
    return (
        <Paper variant="outlined" square style={{backgroundColor:'gray', width: 500,  marginTop: 50, padding: 50, }} display="flex" >
		<div className="App">
			<Button
				variant="contained" 
				edge="start" 
				className={styledClasses.menuButton} 
				color="inherit" 
				onClick={handleMenu}
			>
				{locale}
			</Button>
			<Menu
				id="locale-menu"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={menuOpen}
				onClose={handleMenuClose}
			>
				{
					supportedLocales.map((item, index) =>  {
						let l = new Intl.Locale(item);
						return (
							<MenuItem 
								key={"localeItem_" + index + "_" + item} 
                                onClick={(event) => {
                                    setLocale(item);
                                    setAnchorEl(null);
                                }}
							>
								{l.language}
							</MenuItem>
						)
					})
				}
			</Menu>
			
			<Box border={2}>
                    <Box p={2} m={1}><Typography variant="h6" className={styledClasses.title}>{bundle.DATE_IS}:  {df.format(new Date())}</Typography>
                    <Box p={2} m={1} ><Typography variant="h6" className={styledClasses.title} >{bundle.Text_Input}</Typography></Box>
                        <TextField variant="outlined" className={styledClasses.title} onChange={updateS} placeholder="Type your text here">
                    </TextField>
                    </Box>        
				<Box p={2} m={1} ><Typography variant="outlined" className={styledClasses.title}>{bundle.screen_Reversed}</Typography></Box>
                   
                    <FormControl justify="center">
                     <Box borderRadius={20} borderColor={blue} p={2} m={1} border={2}>{screen}</Box>  
                
                </FormControl>
                </Box>
            
            </div>
            </Paper>
	);
}

export default A;