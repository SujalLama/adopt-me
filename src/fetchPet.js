const fetchPet = async ({queryKey}) => {
    const id = queryKey[1];
    const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

    if(!apiRes.ok) {
        throw new Error(`details/${id} fetch not ok.`)
    }

    // don't need await here becuase of reactquery
    return apiRes.json()

}

export default fetchPet;