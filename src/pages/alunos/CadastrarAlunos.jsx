import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
	ButtonCadastro,
	Form,
	InputCadastro,
} from "../../components/Cadastros";
import { API_URL } from "../../constants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AlunoContext } from "../../context";
import { useParams } from "react-router";
import animationData from "../../lotties/9844-loading-40-paperplane.json";
import Lottie from "react-lottie";
import { TableContainer } from "@mui/material";
import Box from "@mui/material/Box";

const CadastrarAlunos = () => {
	const { id } = useParams();
	const MySwal = withReactContent(Swal);
	const { alunos, setAlunos } = useContext(AlunoContext);

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	const valorInicial = id ? "" : null;
	const [nome, setNome] = useState(valorInicial);
	const [idade, setIdade] = useState(valorInicial);
	const [cidade, setCidade] = useState(valorInicial);

	useEffect(() => {
		console.log(alunos);
		getAlunos();
	}, []);

	const procurarNaLista = (listaAlunos) => {
		listaAlunos.forEach((aluno) => {
			if (aluno.id == id) {
				setNome(aluno.nome);
				setIdade(aluno.idade);
				setCidade(aluno.cidade);
			}
		});
	};
	const getAlunos = () => {
		if (alunos.length > 0) {
			procurarNaLista(alunos);
		} else {
			axios.get(API_URL).then((response) => {
				setAlunos(response.data);
				procurarNaLista(response.data);
			});
		}
	};

	const carregarAlunos = () => {
		axios.get(API_URL).then((response) => {
			setAlunos(response.data);
		});
	};

	const cadastrarAlunos = () => {
		if (id) {
			axios
				.put(API_URL, {
					id,
					nome,
					idade,
					cidade,
				})
				.then((response) => {
					console.log(response);
					if (response.status === 200) {
						carregarAlunos();
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
		} else {
			axios
				.post(API_URL, {
					nome,
					idade,
					cidade,
				})
				.then((response) => {
					if (response.status === 201) {
						carregarAlunos();
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
		}
	};

	const limparCampos = () => {
		setNome("");
		setIdade("");
		setCidade("");
	};

	console.log(alunos.length);
	return (
		<Box sx={{ marginTop: "25px" }}>
			{alunos.length > 0 ? (
				<TableContainer>
					<Form>
						<InputCadastro
							label="Nome"
							variant="outlined"
							value={nome}
							onChange={(e) => {
								console.log(e.target.value);
								setNome(e.target.value);
							}}
						/>
						<InputCadastro
							label="Idade"
							variant="outlined"
							value={idade}
							onChange={(e) => setIdade(e.target.value)}
						/>
						<InputCadastro
							label="Cidade"
							variant="outlined"
							value={cidade}
							onChange={(e) => setCidade(e.target.value)}
						/>

						<ButtonCadastro
							variant="contained"
							onClick={cadastrarAlunos}
						>
							{id ? "Editar" : "Cadastrar"}
						</ButtonCadastro>
					</Form>
				</TableContainer>
			) : (
				<>
					<Lottie options={defaultOptions} height={500} width={500} />
				</>
			)}
		</Box>
	);
};

export default CadastrarAlunos;
