const apiURL = process.env.API_URL || 'http://localhost:5000';

export const api = async (
    endpoint: string,
    method = 'GET',
    body?:any
) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`$
        {apiURL}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ""
            },
            body:body? JSON.stringify(body): undefined
        })
}