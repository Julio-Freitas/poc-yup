import { useState } from "react";
import * as Yup from "yup";
import { FormDataFields } from "./types";

import styles from "./form.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campo nome obrigatório"),
  email: Yup.string()
    .email("Digite um e-mail válido.")
    .required("O e-mail é obrigatório."),
});

export const Form = () => {

  const [formData, setFormData] = useState<FormDataFields>({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        // caso de sucesso, mostra um console com os dados que foram preenchidos
        console.log(formData);
        setErrors({});
      })
      .catch((validationErrors: Yup.ValidationError) => {
        // Validação falhou, configurar os erros para exibição ao usuário
        const errors: { [key: string]: string } = {};
        validationErrors.inner.forEach((error) => {
          console.log();
          errors[error.path as string] = error.message;
        });
        setErrors(errors);
      });
  };

  return (
    <form className={styles["form"]} onSubmit={handleSubmit}>
      <div className={styles["form__field"]}>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div className={styles["form__field"]}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <button type="submit" className={styles["form__btn"]}>
        Enviar
      </button>
    </form>
  );
};
