import { Logout } from "@mui/icons-material"
import { Toolbar, Box, IconButton, Avatar, Menu, MenuItem, ListItemIcon, ListItemText, Button, AppBar as MUIAppBar } from "@mui/material"
import { blue } from "@mui/material/colors"
import Image from 'next/image';
import { useContext, useState } from "react";
import { AppContext } from "../AppContext";

export const AppBar = () => {
  const { user, jwt, setJwt, setUser } = useContext(AppContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setUser(null);
    setJwt(null);
    localStorage.removeItem('jwt');
  }
  return (
    <MUIAppBar position="sticky" sx={{ backgroundColor: 'white', paddingX: 5 }}>
        <Toolbar disableGutters>
          <Image src='/icon.ico' alt='logo' width={30} height={30}></Image>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center'
          }}>
            {user && (
              <>
                <IconButton aria-label="more-menu-toggle" id="more-menu-toggle"
                  aria-controls={open ? 'more-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}>
                  <Avatar src='' sx={{ bgcolor: blue[500] }}>{user.first_name[0]}</Avatar>
                </IconButton>
                <Menu
                  id="more-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'more-menu-toggle',
                  }}
                >
                  <MenuItem onClick={handleLogOut}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Log Out</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            )}
            {!user && (
              <>
                <Button variant="outlined" href="/login">Log In</Button>
                <Button variant="contained" href="/signup">Sign Up</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </MUIAppBar>
  )
}