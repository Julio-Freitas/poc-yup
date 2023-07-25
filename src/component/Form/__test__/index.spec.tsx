import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Form } from "../form";

window.console.log = jest.fn();

const inputsValues = {
  name: "Novo valor campo nome",
  email: "julio@teste.com.br",
};

describe("<Form />", () => {
  it("should render Form and validate input", async () => {
    render(<Form />);

    const nomeInput = screen.getByLabelText(/Nome:/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const submitForm = screen.getByText(/Enviar/i);

    await userEvent.type(nomeInput, inputsValues.name);
    await userEvent.type(emailInput, inputsValues.email);
    await userEvent.click(submitForm);

    // Verifica se o console.log foi chamado com os dados do formulário
    expect(console.log).toHaveBeenCalledWith({
      name: "Novo valor campo nome",
      email: "julio@teste.com.br",
    });
  });

  it("should show error mensage try form whiout values", async () => {
    render(<Form />);

    const submitForm = screen.getByText(/Enviar/i);

    await userEvent.click(submitForm);

    expect(screen.getByText(/Campo nome obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/O e-mail é obrigatório./i)).toBeInTheDocument();
  });

  it("should show error menssage input name", async () => {
    render(<Form />);

    const emailInput = screen.getByLabelText(/Email:/i);
    const submitForm = screen.getByText(/Enviar/i);

    await userEvent.type(emailInput, inputsValues.email);
    await userEvent.click(submitForm);

    expect(screen.getByText(/Campo nome obrigatório/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/O e-mail é obrigatório./i)
    ).not.toBeInTheDocument();
  });

  it("should show error menssage input email", async () => {
    render(<Form />);
    const nomeInput = screen.getByLabelText(/Nome:/i);
    const submitForm = screen.getByText(/Enviar/i);

    await userEvent.type(nomeInput, inputsValues.name);
    await userEvent.click(submitForm);

    expect(
      screen.queryByText(/Campo nome obrigatório/i)
    ).not.toBeInTheDocument();
    expect(screen.getByText(/O e-mail é obrigatório./i)).toBeInTheDocument();
  });
});
