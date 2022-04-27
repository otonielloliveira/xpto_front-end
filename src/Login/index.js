import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { errorFn, loadingFn } from "../Services/Yellow/Dist/Message";
import api from "../Services/api";
import { login as _login } from "../Services/Auth";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const Login = () => {
  const navigation = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = React.useCallback(async () => {
    if (!email || !password) {
      errorFn("Favor preencher os dados");
      return;
    }

    try {
      const form = new FormData();
      form.append("email", email);
      form.append("password", password);

      const load = loadingFn("Processando o Login...");
      const response = await api.post("/api/login", form);
      load.close();
      console.log("data", response);

      if (response.status === 200) {
        _login(response.data.access_token);
        navigation("/");
      }
    } catch (err) {
      if (err) {
        if (err.status === 422) {
          let error = "";
          Object.keys(err.data).forEach(function (key, index) {
            error += "- " + err.data[key] + "\n";
          });

          errorFn(error);
        } else if (err.status === 401) {
          errorFn(
            "Login invalido, Por favor verificar os dados e tenta novamente"
          );
        }
      }
    }
  }, [email, password]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Nao tem cadastro: Fazer aqui..."}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
