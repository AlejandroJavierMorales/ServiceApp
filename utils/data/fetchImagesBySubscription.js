const fetchGetImagesBySubscriptionId = async (subscriptionId) => {
    let urlBase = '';
    if (process.env.NODE_ENV === 'development') {
        // Lógica para el entorno de producción
        urlBase = process.env.NEXT_PUBLIC_BASE_URL_DEV;
    } else {
        // Lógica para el entorno de desarrollo
        urlBase = process.env.NEXT_PUBLIC_BASE_URL_PROD;
    }
    // Construye la URL con los parámetros de consulta
    let url = `/api/images?subscriptionid=${subscriptionId}`;

    /* const res = await fetch(`${urlBase}${url}`, { */
    urlBase='https://calamuchita.ar'
    const res = await fetch(`${urlBase}${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status !== 200) {

                return {
                    status: 400,
                    message: data.message,
                    error: data.error
                }
            } else {
                console.log(
                    `Consulta de Sebscripciones Exitosa!`
                );
                return data;
            }
        })
        .catch((error) => {
            console.error("Error al realizar la solicitud: ", error);
            return {
                status: 500,
                message: 'Error de Servidor al consultar subscripciones',
                error: error
            }
        });

    return res;
}

export { fetchGetImagesBySubscriptionId }
