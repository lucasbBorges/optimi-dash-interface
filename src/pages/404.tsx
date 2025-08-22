import { Link } from "react-router";

export function PageNotFound () {
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-2">
            <h1 className="text-4xl font-bold">Página não encontrada</h1>
            <p>Voltar ao <Link to="/" className="text-sky-500 dark:text-sky-400">dashboard</Link></p>
        </div>
    )
}