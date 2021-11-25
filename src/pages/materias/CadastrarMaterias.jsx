import axios from "axios";
import Styles from "../../components/Styles";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { API_URL_MATERIAS } from "../../constants";
import { useState } from "react";

const CadastrarMaterias = () => {
	const MySwal = withReactContent(Swal);

	const [titulo, setTitulo] = useState();
	const [professor_nome, setProfessor_nome] = useState();

	const cadastrarMaterias = () => {
		axios
			.post(API_URL_MATERIAS, {
				titulo,
				professor_nome,
			})
			.then((response) => {
				if (response.status === 201) {
					MySwal.fire(<p>{response?.data?.message}</p>);
					limparCampos();
				}
			})
			.catch((error) => {
				MySwal.fire({
					icon: "error",
					title: "Oops...",
					text: error,
				});
			});
	};

	const limparCampos = () => {
		setTitulo("");
		setProfessor_nome("");
	};

	return (
		<Styles.Form>
			<Styles.InputCadastro
				label="Materia"
				variant="outlined"
				value={titulo}
				onChange={(e) => setTitulo(e.target.value)}
			/>
			<Styles.InputCadastro
				label="Professor_nome"
				variant="outlined"
				value={professor_nome}
				onChange={(e) => setProfessor_nome(e.target.value)}
			/>

			<Styles.ButtonCadastro
				variant="contained"
				onClick={cadastrarMaterias}
			>
				Cadastrar
			</Styles.ButtonCadastro>
		</Styles.Form>
	);
};
export default CadastrarMaterias;
