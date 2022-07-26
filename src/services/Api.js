const fetchCurrencies = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export default fetchCurrencies;
