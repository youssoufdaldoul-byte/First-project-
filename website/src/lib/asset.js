/* Préfixe un chemin public avec la base Vite (ex. /First-project-/ sur GitHub Pages). */
export const asset = (p) => import.meta.env.BASE_URL + p.replace(/^\//, '')
