

export const checkResponse = async (response: Response): Promise<void> => {
    if(response.status !== 200){
        const responseData = await response.json();
        if('reason' in responseData) throw new Error(`Request error: ${responseData.reason}`);
        else throw new Error(`Fetch error. Already fix it.`);
    }
}
