const getPaginationInfo = (queryData) => {
  const page = Number(queryData.page) || 1
  const limit = Number(queryData.limit) || 25
  const offset = (page - 1) * limit

  return { page, limit, offset }
}

export default { getPaginationInfo }
