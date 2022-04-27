import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import Modal from "@mui/material/Modal";

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, logout } from "../Services/Auth";
import AddIcon from "@mui/icons-material/Add";
import api from "../Services/api";
import {
  confirmDialog,
  errorFn,
  loadingFn,
  successDialog,
} from "../Services/Yellow/Dist/Message";
import { Delete } from "@mui/icons-material";

const Home = () => {
  const navigation = useNavigate();
  const funcTime = useRef();

  const timeInterval = 1000 * 60;

  const [openModal, setOpenModal] = useState(false);
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const token = getToken();

    if (!token) {
      navigation("/login");
      return;
    }

    getDataMe();
    getDataUrls();

    funcTime.current = setInterval(() => {
      getDataUrls();
    }, timeInterval);
  }, []);

  async function getDataMe() {
    try {
      const load = loadingFn("Estamos buscando as informacoes!!");
      const {
        data: { name },
      } = await api.post(`/api/me`);

      setName(name);
      load.close();
    } catch (err) {
      errorFn("Ocorreu um erro no carregamento das informacoes");
      console.error(err);
    }
  }

  async function getDataUrls() {
    try {
      const {
        data: { urls },
        status,
      } = await api.get("/api/url");

      setData(urls);
    } catch (err) {
      errorFn("Ocorreu um erro no carregamento das informacoes");
      console.error(err);
    }
  }

  async function handleSubmit() {
    try {
      if (!url) {
        errorFn("Voce deve preencher com um url valida");
        toogleModal();
        return;
      }

      const form = new FormData();
      form.append("url", url);

      const load = loadingFn("Enviando dados para o servidor!!");

      const { data, status } = await api.post(`/api/url`, form);

      if (status === 201) {
        getDataUrls();
        successDialog(data.message);
      }
      toogleModal();
      setUrl("");
      load.close();
    } catch (err) {
      toogleModal();
      if (err) {
        if (err.status === 422) {
          let error = "";
          Object.keys(err.data).forEach(function (key, index) {
            error += "- " + err.data[key] + "\n";
          });

          errorFn(error);
        } else {
          errorFn(
            "Erro desconhecido, Por favor verificar os dados e tenta novamente"
          );
        }
      }
    }
  }

  async function handleDelete(id) {
    try {
      const response = await confirmDialog(
        "Exclusao",
        `Confirma a exclusao do item: ${id}`
      );

      if (response.isConfirmed) {
        const { data, status } = await api.delete(`/api/url/${id}`);

        if (status === 200) {
          getDataUrls();
          successDialog(data.message);
        }
      }
    } catch (err) {
      if (err) {
        if (err.status === 422) {
          let error = "";
          Object.keys(err.data).forEach(function (key, index) {
            error += "- " + err.data[key] + "\n";
          });

          errorFn(error);
        } else {
          errorFn(
            "Erro desconhecido, Por favor verificar os dados e tenta novamente"
          );
        }
      }
    }
  }

  async function handleLogout() {
    try {
      const load = loadingFn("Realizando o logout!!");

      const { status } = await api.post(`/api/logout`);

      if (status === 200) {
        clearInterval(funcTime.current);
        load.close();
        logout();
        navigation("/login");
      }
    } catch (err) {
      if (err) {
        if (err.status === 422) {
          let error = "";
          Object.keys(err.data).forEach(function (key, index) {
            error += "- " + err.data[key] + "\n";
          });

          errorFn(error);
        } else {
          errorFn(
            "Erro desconhecido, Por favor verificar os dados e tenta novamente"
          );
        }
      }
    }
  }

  function toogleModal() {
    setOpenModal(!openModal);
  }

  return (
    <Container maxWidth="lg">
      <Modal
        hideBackdrop
        open={openModal}
        onClose={() => toogleModal()}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <h2 id="child-modal-title">Cadastar nova URL </h2>

          <Box sx={{ mt: 4 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="ex: https://google.com/"
              name="email"
              autoFocus
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Box>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item>
              <Button
                type="button"
                variant="contained"
                onClick={() => handleSubmit()}
              >
                Salvar
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="error"
                type="button"
                variant="contained"
                onClick={toogleModal}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              XPTO | {`Bem-vindo(a) - ${name}`}
            </Typography>
            <Button color="inherit" onClick={() => handleLogout()}>
              Sair
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Button
        type="button"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => toogleModal()}
      >
        <AddIcon></AddIcon>CADASTRAR URL
      </Button>
      <Box sx={{ flexGrow: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>URL</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Cadastro</TableCell>
                <TableCell align="right">Atualizaçao</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.length > 0 &&
                data.map((line) => (
                  <TableRow key={line.id}>
                    <TableCell>{line.id}</TableCell>
                    <TableCell>{line.url}</TableCell>
                    {line.status ? (
                      <TableCell align="right">
                        <Chip
                          label={line.status}
                          color={line.status === "200" ? "success" : "error"}
                        />
                      </TableCell>
                    ) : (
                      <TableCell align="right">Pendente </TableCell>
                    )}
                    <TableCell align="right">{line.created_at}</TableCell>
                    <TableCell align="right">{line.updated_at}</TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        type="button"
                        variant="contained"
                        onClick={() => handleDelete(line.id)}
                      >
                        <Delete></Delete>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  pt: 2,
  px: 4,
  pb: 3,
};

export default Home;
