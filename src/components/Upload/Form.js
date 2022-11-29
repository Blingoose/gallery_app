import React, { useRef, useEffect, useState } from "react";
import { Input, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import "../../styles/ScrollingButton.css";

const theme = createTheme({
  palette: {
    primary: purple,
  },
});

const Form = () => {
  const [scrolling, setScrolling] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setScrolling(true);
      } else setScrolling(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const backToTop = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const handleClick = () => {
    fileRef.current.click();
  };

  return (
    <form className="main-form">
      <Input type="file" multiple sx={{ display: "none" }} inputRef={fileRef} />
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          aria-label="add"
          color="primary"
          onClick={handleClick}
        >
          <Add fontSize="large" />
        </Button>
      </ThemeProvider>
      {scrolling && (
        <div className={`${scrolling ? "back-top-btn" : "none"}`}>
          <FontAwesomeIcon
            className="chevron fa-bounce"
            size="3x"
            icon={regular("chevron-up")}
            onClick={backToTop}
          />
        </div>
      )}
      <div></div>
    </form>
  );
};

export default Form;