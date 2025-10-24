import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-white dark:bg-black text-center">
            <h1 className="text-5xl font-bold text-red-600">404</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mt-4">
                Cette page est introuvable.
            </p>
            <Link
                href="/"
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                {`Retour à l'accueil`}
            </Link>
        </div>
    );
}
