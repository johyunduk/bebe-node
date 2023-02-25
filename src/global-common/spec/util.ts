import _ from 'lodash'

/**
 * model 함수의 mock
*/
export function modelMock (model: any) {
  const mockSelect = (useFunction) => (returnValue?) => {
    model.mockImplementationOnce(() => {
      return {
        [useFunction]: jest.fn().mockResolvedValueOnce(returnValue),
      }
    })
  }

  const mockCUD = (useFunction) => (mockFn: any) => {
    model.mockImplementationOnce(() => {
      return {
        [useFunction]: mockFn,
      }
    })
  }

  return {
    findOne: mockSelect('findOne'),
    findByPk: mockSelect('findByPk'),
    findAll: mockSelect('findAll'),
    count: mockSelect('count'),
    update: mockCUD('update'),
    create: mockCUD('create'),
    bulkCreate: mockCUD('bulkCreate'),
    destroy: mockSelect('destroy'),
    createReturn: mockSelect('create'),
    sum: mockSelect('sum'),
  }
}

export function matchObjFn (obj: any) {
  return (value: any) => { expect(value).toMatchObject(obj) }
}
