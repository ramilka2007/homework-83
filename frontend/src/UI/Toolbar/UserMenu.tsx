import { Box, Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/users/usersThunk';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Box>
        <Button onClick={handleClick} className="text-white">
          Hello, {user.username}
        </Button>

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <NavLink
              className="text-decoration-none text-black"
              to="/tracks-history"
            >
              Track history
            </NavLink>
          </MenuItem>
          {user.role === 'admin' ? (
                <MenuItem component={NavLink} className="text-decoration-none text-black"
                          to="/add-new-artist">
                  Add artist
                </MenuItem>
          ) : null}
          {user.role === 'admin' ? (
              <MenuItem component={NavLink} className="text-decoration-none text-black"
                        to="/add-new-album">
                Add album
              </MenuItem>
          ) : null}
          {user.role === 'admin' ? (
              <MenuItem component={NavLink} className="text-decoration-none text-black"
                        to="/add-new-track">
                Add track
              </MenuItem>
          ) : null}
          <MenuItem onClick={handleLogout}>Log out</MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default UserMenu;
