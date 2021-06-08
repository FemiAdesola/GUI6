import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { FormControl } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import { Language } from '@material-ui/icons';
import useEffect from 'react';

const RATE = 1.23;
const BASE_URL='https://api.exchangeratesapi.io/latest'
function Ap() {
    const [screen, setScreen] = React.useState("");
    const [box, setBox] = React.useState();
   
    /* useEffect(() => {
        fetch(BASE_URL)
            .then(res => res.json())
        .then(data=>setScreen(data.base, ...object.keys(data.rates)))
}, [])*/

   //date stuff 
    const dtf = new Intl.DateTimeFormat(Language, {timeZone:'Europe/Helsinki', hour:"false", weekday:"long", day:"numeric",  month:"long", year:"numeric", hour:"numeric", minute:"numeric", second:"2-digit" });
    
    //
  
    const cancel = (event) => {
        setScreen("");
        setBox("");
    }
    const updateS = (event) => {
		setScreen(event.target.value);
    }

    // List of Currency and Unicode (https://aboutreact.com/react-native-currency-symbols/)
    const convert = () => setBox('\u0024' +  parseFloat(screen * RATE).toFixed(2));
    const convert1 = () => setBox('\u20AC' + parseFloat(screen / RATE).toFixed(2));
    //
 
   
    return (
      <Paper variant="outlined"  display="flex" justifyContent="center" style={{backgroundColor: 'blue', width: 500, marginTop: 50, padding: 50,}} >
             <Paper style={{backgroundColor: 'white', width: 385, marginLeft: 55, textAlign: 'center'}}  variant="outlined"  display="flex" justifyContent="center">
               The exchange rate at <Box position="static"
                justifyContent="center"
                p={1}>{dtf.format()}</Box>
                is
                
                <Box justify="center">
                        <TextField variant="outlined" value={screen} onChange={updateS} placeholder="Type amount here" />
                 <TextField  disabled={true} variant="filled" value={box} placeholder="Exchange appear here" />
                </Box>
                </Paper>
                    <Paper style={{backgroundColor: 'white', width: 285, marginLeft: 55, padding: 50, textAlign: 'center'}}  variant="outlined"  display="flex" justifyContent="center">
                <Box display="flex" justifyContent="center" border={1}>
                    Direction:
                    <RadioGroup >
                    <FormControl >      
                    <FormLabel component="legend" style={{ justifyContent: "center" }}></FormLabel>
                    <FormControlLabel label="€ to $" value="Euro" control={<Radio onClick={convert}></Radio>}></FormControlLabel> 
                    <FormControlLabel label="$ to €" value="dollar" control={<Radio onClick={convert1}></Radio>}></FormControlLabel>
                    </FormControl>
                    <Button variant="contained" color="secondary" onClick={cancel}>Cancle</Button>
                    </RadioGroup>
                </Box>
                </Paper>
            </Paper>
  );
}
export default Ap;