import pagination from '../../api/v1/utils/pagination'

describe('pagination test', () => {
  describe('pagination', () => {
    it('Return default pagination data', () => {
      const result = pagination.getPaginationSearchAndSortInfo({})

      expect(result).toEqual({ page: 1, limit: 25, offset: 0 })
    })

    it('Parse pagination data successfully', () => {
      const result = pagination.getPaginationSearchAndSortInfo({ page: 4, limit: 10 })

      expect(result).toEqual({ page: 4, limit: 10, offset: 30 })
    })
  })
})
