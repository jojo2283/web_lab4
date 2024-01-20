import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography,Button} from "@mui/material";
import { AuthContext } from '../context/AuthContext';


function Header() {
    const authContext = useContext(AuthContext);
    const username = useSelector(state => state.user.username);
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {username}
                </Typography>
                <Button color="inherit" onClick={authContext.logout}>Log out</Button>
            </Toolbar>

        </AppBar>
    )
}

export default Header;