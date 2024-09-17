import { Box, Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../../types';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          <MenuItem>Log out</MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default UserMenu;
