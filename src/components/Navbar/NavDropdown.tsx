import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ChangePassword from "../changePassword/ChangePassword";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    background: "#202938",
    color: "white",
    // color:
    //   theme.palette.mode === "light"
    //     ? "rgb(55, 65, 81)"
    //     : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          // theme.palette.primary.main,
          "#fff",
          theme.palette.action.selectedOpacity
        ),
      },
      "&:hover": {
        backgroundColor: alpha(
          // theme.palette.primary.main,
          "#fff",
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function NavDropdown() {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [pwdOpen, setPwdOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout().then(() => {
      handleClose();
      navigate("/");
    });
  };

  return (
    <div className="flex justify-center align-center">
      {/* <div className="p-2">
        <span>{user?.username}</span>
      </div> */}
      <button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        // variant="contained"
        // disableElevation
        onClick={handleClick}
        className="w-10 h-10"
      >
        <img src="/images/user.svg" width={32} alt="" className="icon" />
      </button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={(e) => {setPwdOpen(true);     setAnchorEl(null); }} disableRipple>
          Change Password
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleLogout} disableRipple>
          Logout
        </MenuItem>
      </StyledMenu>

      {pwdOpen && (
        <ChangePassword slug="New Password" setPwdOpen={setPwdOpen} />
      )}
    </div>
  );
}
