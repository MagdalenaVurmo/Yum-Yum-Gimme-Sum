

const baseUrl = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/";  // API-Key

export const fetchApiKey = async () => {
    try {
        const response = await fetch(`${baseUrl}/keys`, {
            method: 'POST',
        });

        const data = await response.json();
        //console.log("🔑 fetchApiKey response:", data);

        return data.ApiKey;
    }   catch (error) {
        console.error('Error fetching API key:', error);

    }
};
// Getting the menu here. 

export const fetchMenu = async (ApiKey) => {
    try {
        const response = await fetch(`${baseUrl}/menu`, {
            method: 'GET',
            headers: { 'x-zocom': ApiKey },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
};
// Creating the order here.
export const createOrder = async (tenantId, DataOrder, ApiKey) => {
    try {
        const response = await fetch(`${baseUrl}/${tenantId}/orders`, { // order finns inte??
            method: 'POST',
            headers: {
                'x-zocom': ApiKey || "",
                'Content-Type': "application/json",
            },
            body: JSON.stringify(DataOrder),
        });

        if (!response.ok) {
            throw new Error(`API-Fel: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating order:', error);
        alert(`Fel vid skapande av order: ${error}`);
    }
};