async function postCons(usuario,consulta,detalle,tipo,fecha,hora) {
    try {
        const userData = { 
            usuario,
            consulta,
            detalle,
            tipo,
            fecha,
            hora
        };

        const response = await fetch("http://localhost:3001/Consultas", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return await response.json();
        
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}

export{postCons}