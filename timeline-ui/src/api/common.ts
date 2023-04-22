export const apiConfig = {
    apiUrl : process.env.REACT_APP_API_URL as string
}

export const authHeader = (token: string) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});