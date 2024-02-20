
export const generarId = () => {
    const currentTime = new Date().getTime().toString();
    return currentTime.slice(-6);
}

export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha)
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }

    return fechaNueva.toLocaleDateString('es-ES', opciones)
}