import { useRoutes } from "react-router-dom";
import AlunosListagem from "../pages/alunos/AlunosListagem";
import CadastrarAlunos from "../pages/alunos/CadastrarAlunos";
import Container from "@mui/material/Container";
import CadastrarMaterias from "../pages/materias/CadastrarMaterias";
import ListarMaterias from "../pages/materias/ListarMaterias";

const Routes = () => {
	const routes = useRoutes([
		{ path: "/", element: <AlunosListagem /> },
		{ path: "/cadastrar-alunos", element: <CadastrarAlunos /> },
		{ path: "/cadastrar-materias", element: <CadastrarMaterias /> },
		{ path: "/editar-alunos/:id", element: <CadastrarAlunos /> },
		{ path: "/listar-materias", element: <ListarMaterias /> },
	]);

	return routes;
};

const App = () => {
	return (
		<Container maxWidth="md">
			<Routes />
		</Container>
	);
};

export default App;
