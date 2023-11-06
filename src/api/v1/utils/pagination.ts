const getPaginationSearchAndSortInfo = (queryData: { page: number; limit: number; sortBy: string; sortOrder: string; searchText: string }) => {
  const page = Number(queryData.page) || 1
  const limit = Number(queryData.limit) || 25
  const offset = (page - 1) * limit
  const sortBy = String(queryData.sortBy) || 'createdAt'
  const sortOrder = String(queryData.sortOrder) || 'DESC'
  const searchText = String(queryData.searchText) || ''

  return {
    page, limit, offset, sortBy, sortOrder, searchText,
  }
}

export default { getPaginationSearchAndSortInfo }
