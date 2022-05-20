import React, { useState, useRef, useEffect } from "react";
import {
  Fade,
  IconButton,
  MenuList,
  MenuItem,
  Popper,
  Paper,
  ClickAwayListener,
} from "@mui/material";

const coinsIconsUrl = "/images/";

export default function UserChangeCurrency({ currency, setCurrency}) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <IconButton
        ref={anchorRef}
        sx={{ padding: 0.5 }}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {currency === 1 ? (
          <img
            src={`${coinsIconsUrl}coin.png`}
            width={25}
            className="bg-gold border-circle"
          />
        ) : currency === 2 ? (
          <img
            src={`${coinsIconsUrl}euro.png`}
            width={25}
            className="bg-gold border-circle"
          />
        ) : (
          <img
            src={`${coinsIconsUrl}shekel.png`}
            width={25}
            className="bg-gold border-circle"
          />
        )}
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="left-start"
        transition
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  className="row"
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={() => setCurrency(1)} className="col">
                    <img src={`${coinsIconsUrl}coin.png`} width={25} />
                  </MenuItem>
                  <MenuItem
                    onClick={() => setCurrency(2)}
                    key={2}
                    className="col"
                  >
                    <img src={`${coinsIconsUrl}euro.png`} width={25} />
                  </MenuItem>
                  <MenuItem
                    onClick={() => setCurrency(3)}
                    key={3}
                    className="col"
                  >
                    <img src={`${coinsIconsUrl}shekel.png`} width={25} />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
}
