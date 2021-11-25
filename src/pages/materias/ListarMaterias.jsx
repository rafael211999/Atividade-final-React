import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { StyledTableCell, StyledTableRow } from "../alunos/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_MATERIAS } from "../../constants";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ListarMaterias = () => {
	const MySwal = withReactContent(Swal);
	const [materias, setMaterias] = useState([]);

	useEffect(() => {
		getMaterias();
	}, []);

	const getMaterias = () => {
		axios.get(API_URL_MATERIAS).then((response) => {
			setMaterias(response.data);
		});
	};

	const deletarMateria = (materia) => {
		axios
			.delete(API_URL_MATERIAS, { data: materia })
			.then((response) => {
				MySwal.fire(<p>{response?.data?.message}</p>);

				const materiaIndex = materias.findIndex(
					(elemento) => elemento.id === materia.id
				);
				let newMaterias = [...materias];
				newMaterias.splice(materiaIndex, 1);
				setMaterias(newMaterias);
			})
			.catch((error) => {
				MySwal.fire({
					icon: "error",
					title: "Oops...",
					text: error,
				});
			});
	};

	return (
		<Box sx={{ marginTop: "25px" }}>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Matéria</StyledTableCell>
							<StyledTableCell>Professor</StyledTableCell>
							<StyledTableCell>Ações</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{materias.map((materia) => (
							<StyledTableRow>
								<StyledTableCell>
									{materia.titulo}
								</StyledTableCell>
								<StyledTableCell>
									{materia.professor_nome}
								</StyledTableCell>

								<StyledTableCell>
									<Button
										onClick={() => deletarMateria(materia)}
										variant="text"
									>
										<DeleteIcon />
									</Button>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default ListarMaterias;
