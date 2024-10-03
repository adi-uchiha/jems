export const DefaultPOSTRequest = async (apiEndpoint: string, formData: object) => {
  try {
    const response = await fetch(`${apiEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Response not OK');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error for ${apiEndpoint} path`)
    throw new Error;
  }
}

export const DefaultGETRequest = async (apiEndpoint: string) => {
  try {
    const response = await fetch(`${apiEndpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Response not OK');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error for ${apiEndpoint} path`)
    throw error;
  }
} 