

export const getChapters = async (lang: string) => {
  const data = await fetch(`${process.env.API_URL}/api/v2/chapters/${lang}`);
  const json = await data.json()

  return {
    data: json,
    status: data.status
  }
}

export const getHashChapters = async (lang: string) => {
  const data = await fetch(`${process.env.API_URL}/api/v2/check/${lang}`);
  const json = await data.json()

  return {
    checkData: json,
    checkStatus: data.status
  }
}

export const ping = async () => {
  const data = await fetch(`${process.env.API_URL}/api/ping`);

  if (data.status === 200) {
    return true
  } 
  
  return false
}
