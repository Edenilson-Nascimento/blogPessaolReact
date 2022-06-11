import React, { useEffect, useState } from 'react'
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Tema from '../../../models/Tema';
import { buscaId, deleteId } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';



function DeletarTema() {

    let history = useNavigate();
    const { id } = useParams<{ id: string }>();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    const [tema, setTema] = useState<Tema>()

    useEffect(() => {
        if (token === "") {
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
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        await buscaId(`/temas/${id}`, setTema, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function sim() {
        history('/temas')

        try {
            await deleteId(`/temas/${id}`, {
                headers: {
                    'Authorization': token
                }
            });
            
            toast.success("Tema deletada com sucesso!!", {
                position:"top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
               });
            
        } catch (error) {
            alert('Erro ao deletar');
        }

    }

    function nao() {
        history('/temas')
    }

    return (
        <>
            <Box m={2}>
                <Card variant="outlined">
                    <CardContent>
                        <Box justifyContent="center">
                            <Typography color="textSecondary" gutterBottom>
                                Deseja deletar o Tema:
                            </Typography>
                            <Typography color="textSecondary">
                                { tema?.descricao }
                            </Typography>
                        </Box>
                    </CardContent>

                    <CardActions>
                        <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                            <Box mx={2}>
                                <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                                    Sim
                                </Button>
                            </Box>
                            <Box mx={2}>
                                <Button onClick={nao} variant="contained" size='large' color="secondary">
                                    Não
                                </Button>
                            </Box>
                        </Box>
                    </CardActions>

                </Card>
            </Box>
        </>
    )
}

export default DeletarTema;