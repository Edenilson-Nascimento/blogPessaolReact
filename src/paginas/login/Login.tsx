import React, {ChangeEvent, useState, useEffect } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core"
import { Link, useNavigate } from "react-router-dom"
import { cadastroUsuario, login } from "../../services/Service";
import { Box } from "@mui/material"
import UserLogin from "../../models/UserLogin";
import "./Login.css"
import { useDispatch } from "react-redux";
import { addToken } from "../../store/tokens/actions";
import { toast } from "react-toastify";


function Login() {

    let history = useNavigate();
    const dispatch = useDispatch();
    const [token, setToken] = useState("");
    


    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    function updatedModel(e: ChangeEvent<HTMLInputElement>){

        setUserLogin({
            ...userLogin, 
            [e.target.name]: e.target.value
        })
    }
    useEffect(()=>{
        if(token != ""){
            dispatch(addToken(token));
            history('/home')
        }
    }, [token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try{

           await login(`/usuarios/logar`, userLogin,setToken)
              
           toast.success("Usuário logado com sucesso!!", {
            position:"top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
           });
        
            }catch(error){
        
            toast.error("Dados do usuário inconsistentes. Erro ao logar!!", {
                position:"top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
               });

        }
        
    }

    return (
        <Grid className="fundo-login" container direction="row" justifyContent="center" alignItems="center">
            <Grid alignItems="center" xs={6}>
                <Box paddingX={20}>
                    <form onSubmit={onSubmit}>
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" style={{ fontWeight: "bold" }}>Entrar</Typography>

                        <TextField value={userLogin.usuario} onChange={(e:ChangeEvent<HTMLInputElement>)=>updatedModel(e)} id="usuario" label=" usuario" variant="outlined" name="usuario" margin="normal" fullWidth />

                        <TextField value={userLogin.senha} onChange={(e:ChangeEvent<HTMLInputElement>)=>updatedModel(e)} id="senha" label="senha" variant="outlined" name="senha" margin="normal" type="password" fullWidth />

                        <Box marginTop={2} textAlign="center">
                      
                                <Button type="submit" variant="contained" color="primary">
                                    Logar
                                </Button>
        
                        </Box>
                    </form>
                    <Box display="flex" justifyContent="center" marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant="subtitle1" gutterBottom align="center">Não tem uma conta?</Typography>
                        </Box>
                        <Link to="/cadastro">
                            <Typography variant="subtitle1" gutterBottom align="center" className="texto1">Cadastre-se</Typography>
                        </Link>
                    </Box>
                </Box>s
            </Grid>
            <Grid xs={6} className="imagem-login">

            </Grid>
        </Grid>
    );
}

export default Login;