import { createContext, useState } from "react";

export const AlunoContext = createContext();
export const AlunoProvider = ({ children }) => {
	const [alunos, setAlunos] = useState([]);

	return (
		<AlunoContext.Provider
			value={{
				alunos,
				setAlunos,
			}}
		>
			{children}
		</AlunoContext.Provider>
	);
};
