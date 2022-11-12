import { AppBar, Grid, Toolbar, Typography } from "@material-ui/core";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import "./Navbar.css";

function Navbar() {
  const [token, setToken] = useLocalStorage("token");
  let navigate = useNavigate();

  function goLogout() {
    setToken("");
    alert("Usuário desconectado");
    navigate("/login");
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense" style={{ backgroundColor: "#4b4d47", height: "60px" }}>
          <Box style={{ cursor: 'pointer' }}>
            <Typography variant="h5" color="inherit"> Blog Pessoal </Typography>
          </Box>

          <Grid alignItems="center" item xs={9} className="menu">
            <Box display="flex" justifyContent="center">
              <Link to="/home" className="text-decorator-none">
                <Box mx={1} style={{ cursor: 'pointer' }}>
                  <Typography> Home </Typography>
                </Box>
              </Link>
              <Link to="/posts" className="text-decorator-none">
                <Box mx={1} style={{ cursor: 'pointer' }}>
                  <Typography> Postagens </Typography>
                </Box>
              </Link>
              <Link to="/temas" className="text-decorator-none">
                <Box mx={1} style={{ cursor: 'pointer' }}>
                  <Typography> Temas </Typography>
                </Box>
              </Link>
              <Link to="/formularioTema" className="text-decorator-none">
                <Box mx={1} style={{ cursor: 'pointer' }}>
                  <Typography> Cadastrar Tema </Typography>
                </Box>
              </Link>
            </Box>
          </Grid>

          <Link to="/login" className="text-decorator-none">
            <Box mx={1} style={{ cursor: 'pointer' }}>
              <Typography style={{ position: "absolute", right: 80, top: 18 }}> Fazer Login </Typography>
            </Box>
          </Link>
          
          <Box onClick={goLogout}>
            <a href="">
              <LogoutIcon
                style={{
                  color: "#fff",
                  position: "absolute",
                  right: "20",
                  width: "30",
                  height: "30",
                  top: "15",
                }}
              />
            </a>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;