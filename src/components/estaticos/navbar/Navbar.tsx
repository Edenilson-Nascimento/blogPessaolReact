import React from "react";
import { AppBar, Toolbar, Typography} from "@material-ui/core";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { addToken } from "../../../store/tokens/actions";
import {toast} from "react-toastify";



function Navbar() {

  
  let history = useNavigate()
  const dispatch = useDispatch();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
);

  function goLogout() {
      dispatch(addToken(""));
     toast.info("Usuário deslogado!!", {
      position:"top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
      progress: undefined,
     });
      history("/login")
  }
  var navBarComponent;

  if(token != ""){
    navBarComponent =  <AppBar className="fundo-navbar" position="static">
    <Toolbar className="alinhar-navbar" variant="dense" style={{marginTop:"3"}}>
      <Box className="cursor">
        <Typography variant="h5" color="inherit">
          BlogPessoal
        </Typography>
      </Box>

      <Box display="flex" justifyContent="start">
        <Link to="/home" className="text-decorator-none">
          <Box mx={1} className="cursor">
            <Typography variant="h6" color="inherit">
            Home
            </Typography>
          </Box> 
        </Link>
        <Link to="/posts" className="text-decorator-none">
         <Box mx={1} className="cursor">
          <Typography variant="h6" color="inherit">
            Postagens
          </Typography>
         </Box>
        </Link>
       <Link to="/temas" className="text-decorator-none"> 
        <Box mx={1} className="cursor">
          <Typography variant="h6" color="inherit">
            Temas
          </Typography>
        </Box>
       </Link>
      <Link to="/formularioTema" className="text-decorator-none">
       <Box mx={1} className="cursor">
          <Typography variant="h6" color="inherit">
            Cadastrar tema
          </Typography>
        </Box>
      </Link>
        
        <Box mx={1} className="cursor" onClick={goLogout}>
          <Typography variant="h6" color="inherit">
            Logout
          </Typography>
        </Box>
        
      </Box>

    </Toolbar>
  </AppBar>

  }

  return (
    <>
      {navBarComponent}
    </>
  )
}

export default Navbar;