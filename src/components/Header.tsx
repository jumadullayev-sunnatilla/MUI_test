import {
  Avatar,
  Badge,
  BadgeProps,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  styled,
} from "@mui/material";
import mui from "../assets/material.svg";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import avatar from "../assets/avatar.png";
import { AudioOutlined } from "@ant-design/icons";
import { Input } from "antd";
import type { GetProps } from "antd";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useState } from "react";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";

type SearchProps = GetProps<typeof Input.Search>;

const Header = () => {
  const { Search } = Input;

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff",
      }}
    />
  );
  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  // driver
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxIcon color="primary" />
                ) : (
                  <MailIcon color="primary" />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxIcon color="primary" />
                ) : (
                  <MailIcon color="primary" />
                )}
              </ListItemIcon>
              <ListItemText primary={text} color="primary" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <div className="container mx-auto  p-3 flex justify-between items-center sticky top-0 left-0 bg-white opacity-95">
      <div className="flex gap-2 items-center">
        <div>
          <Button onClick={toggleDrawer(true)}>
            <Tooltip disableFocusListener title="menu">
              <MenuSharpIcon />
            </Tooltip>
          </Button>

          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </div>
        <img src={mui} alt="" />
        <h1 className=" text-xl text-blue-700 font-bold">Material Ui</h1>
      </div>

      <div className="flex gap-5 items-center">
        <div className="w-[300px]">
          <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            suffix={suffix}
            onSearch={onSearch}
          />
        </div>
        <Tooltip disableFocusListener title="Message">
          <Badge badgeContent={20} color="warning">
            <MailIcon color="primary" />
          </Badge>
        </Tooltip>
        <Tooltip disableFocusListener title="Cart">
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={4} color="warning">
              <ShoppingCartIcon className="text-[#1976D2]" />
            </StyledBadge>
          </IconButton>
        </Tooltip>
        <Tooltip disableFocusListener title="avatar">
          <Avatar
            alt="Jumadullayev Sunnatila"
            src={avatar}
            sx={{ width: 30, height: 30 }}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
