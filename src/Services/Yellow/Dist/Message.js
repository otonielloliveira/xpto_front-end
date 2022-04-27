import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import iconLoading from "./img/icones/processing.gif";

const Swal2 = withReactContent(Swal);

// Função genérica para relatar erros
export function errorFn(msg, err = "", title = "Ops... tivemos um problema!") {
  Swal2.fire({
    title: title,
    text: msg,
    icon: "error",
    type: "error",
    confirmButtonText: "Fechar",
  });
}

// Função genérica para relatar carregamento
export function loadingFn(
  msgTitle,
  msgDesc = "Aguarde, estamos processando..."
) {
  return Swal2.fire({
    title: msgTitle,
    imageUrl: iconLoading,
    closeOnClickOutside: false,
    allowOutsideClick: false,
    showConfirmButton: false,
    text: msgDesc,
  });
}

// Função genérica para criar um diálogo de confirmação de exclusão
export const confirmDialog = (
  msgTitle,
  msgDesc,
  buttonDesc = "Sim, remover"
) => {
  return Swal2.fire({
    title: msgTitle,
    text: msgDesc,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    cancelButtonText: "Cancelar",
    confirmButtonText: buttonDesc,
  });
};

// Função genérica para crair um dialogo que questiona se o usuário tem certeza
export const goaheadDialog = (msgTitle, msgDesc) => {
  return Swal2.fire({
    title: msgTitle,
    text: msgDesc,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Sim",
  });
};

// Função genérica para criar um diálogo de cancelamento de edição
export const cancelDialog = (
  msgTitle = "Cancelar Edição?",
  msgDesc = "Se você cancelar nenhum alteração será feita."
) => {
  return Swal2.fire({
    title: msgTitle,
    text: msgDesc,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    cancelButtonText: "Voltar a editar",
    confirmButtonText: "Sim, cancelar",
  });
};

// Função genérica para criar um diálogo de sucesso
export const successDialog = (
  msgTitle = "Parabéns!",
  msgDesc = "A operação ocorreu com sucesso."
) => {
  return Swal2.fire({
    title: msgTitle,
    text: msgDesc,
    icon: "success",
    button: "Fechar",
  });
};

export function warningFn(msg, title = "Atenção!") {
  Swal2.fire({
    title: title,
    text: msg,
    icon: "warning",
    type: "warning",
    confirmButtonText: "Fechar",
  });
}
