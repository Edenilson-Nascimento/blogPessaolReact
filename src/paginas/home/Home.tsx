import React, { useEffect } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import './Home.css';
import { Box } from "@mui/material";
import TabPostagem from "../../components/postagens/tabpostagem/TabPostagem";
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TokenState } from "../../store/tokens/tokensReducer";
import { toast } from "react-toastify";

function Home() {

    let history = useNavigate();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    useEffect(() => {
        if(token == ""){
            toast.error("Você precisa estar logado!!", {
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
    },[token])

    return (
        <>
            <Grid className="fundo-home" container direction="row" justifyContent="center" alignItems="center">
                <Grid alignItems="center" item xs={6}>
                    <Box paddingX={20} >
                        <Typography className="titulo" variant="h3" gutterBottom component="h3" align="center">Seja bem vindo(a)!</Typography>

                        <Typography className="titulo" variant="h5" gutterBottom component="h5" align="center" >expresse aqui os seus pensamentos e opiniões!</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                            <ModalPostagem/>
                        </Box>
                        <Link to="/posts" className="text-decorator-none">
                            <Button className="botao" variant="outlined">Ver Postagens</Button>
                        </Link>
                    </Box> 
                </Grid>
                <Grid item xs={6} >
                    <img className="imagem-home" src="https://img.freepik.com/vetores-gratis/conceito-de-comunicacao-empresarial-desenhado-a-mao_52683-77070.jpg?w=2000" alt="" />
                </Grid>
                <Grid xs={12} style={{ backgroundColor: "white" }}>
                    <TabPostagem />
                </Grid>
            </Grid>
        </>


    );
}

export default Home;