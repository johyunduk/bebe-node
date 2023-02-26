"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchObjFn = matchObjFn;
exports.modelMock = modelMock;
/**
 * model 함수의 mock
*/
function modelMock(model) {
  const mockSelect = useFunction => returnValue => {
    model.mockImplementationOnce(() => {
      return {
        [useFunction]: jest.fn().mockResolvedValueOnce(returnValue)
      };
    });
  };
  const mockCUD = useFunction => mockFn => {
    model.mockImplementationOnce(() => {
      return {
        [useFunction]: mockFn
      };
    });
  };
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
    sum: mockSelect('sum')
  };
}
function matchObjFn(obj) {
  return value => {
    expect(value).toMatchObject(obj);
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2RlbE1vY2siLCJtb2RlbCIsIm1vY2tTZWxlY3QiLCJ1c2VGdW5jdGlvbiIsInJldHVyblZhbHVlIiwibW9ja0ltcGxlbWVudGF0aW9uT25jZSIsImplc3QiLCJmbiIsIm1vY2tSZXNvbHZlZFZhbHVlT25jZSIsIm1vY2tDVUQiLCJtb2NrRm4iLCJmaW5kT25lIiwiZmluZEJ5UGsiLCJmaW5kQWxsIiwiY291bnQiLCJ1cGRhdGUiLCJjcmVhdGUiLCJidWxrQ3JlYXRlIiwiZGVzdHJveSIsImNyZWF0ZVJldHVybiIsInN1bSIsIm1hdGNoT2JqRm4iLCJvYmoiLCJ2YWx1ZSIsImV4cGVjdCIsInRvTWF0Y2hPYmplY3QiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ2xvYmFsLWNvbW1vbi9zcGVjL3V0aWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG4vKipcbiAqIG1vZGVsIO2VqOyImOydmCBtb2NrXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIG1vZGVsTW9jayAobW9kZWw6IGFueSkge1xuICBjb25zdCBtb2NrU2VsZWN0ID0gKHVzZUZ1bmN0aW9uKSA9PiAocmV0dXJuVmFsdWU/KSA9PiB7XG4gICAgbW9kZWwubW9ja0ltcGxlbWVudGF0aW9uT25jZSgoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBbdXNlRnVuY3Rpb25dOiBqZXN0LmZuKCkubW9ja1Jlc29sdmVkVmFsdWVPbmNlKHJldHVyblZhbHVlKSxcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY29uc3QgbW9ja0NVRCA9ICh1c2VGdW5jdGlvbikgPT4gKG1vY2tGbjogYW55KSA9PiB7XG4gICAgbW9kZWwubW9ja0ltcGxlbWVudGF0aW9uT25jZSgoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBbdXNlRnVuY3Rpb25dOiBtb2NrRm4sXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZmluZE9uZTogbW9ja1NlbGVjdCgnZmluZE9uZScpLFxuICAgIGZpbmRCeVBrOiBtb2NrU2VsZWN0KCdmaW5kQnlQaycpLFxuICAgIGZpbmRBbGw6IG1vY2tTZWxlY3QoJ2ZpbmRBbGwnKSxcbiAgICBjb3VudDogbW9ja1NlbGVjdCgnY291bnQnKSxcbiAgICB1cGRhdGU6IG1vY2tDVUQoJ3VwZGF0ZScpLFxuICAgIGNyZWF0ZTogbW9ja0NVRCgnY3JlYXRlJyksXG4gICAgYnVsa0NyZWF0ZTogbW9ja0NVRCgnYnVsa0NyZWF0ZScpLFxuICAgIGRlc3Ryb3k6IG1vY2tTZWxlY3QoJ2Rlc3Ryb3knKSxcbiAgICBjcmVhdGVSZXR1cm46IG1vY2tTZWxlY3QoJ2NyZWF0ZScpLFxuICAgIHN1bTogbW9ja1NlbGVjdCgnc3VtJyksXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoT2JqRm4gKG9iajogYW55KSB7XG4gIHJldHVybiAodmFsdWU6IGFueSkgPT4geyBleHBlY3QodmFsdWUpLnRvTWF0Y2hPYmplY3Qob2JqKSB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDTyxTQUFTQSxTQUFTLENBQUVDLEtBQVUsRUFBRTtFQUNyQyxNQUFNQyxVQUFVLEdBQUlDLFdBQVcsSUFBTUMsV0FBWSxJQUFLO0lBQ3BESCxLQUFLLENBQUNJLHNCQUFzQixDQUFDLE1BQU07TUFDakMsT0FBTztRQUNMLENBQUNGLFdBQVcsR0FBR0csSUFBSSxDQUFDQyxFQUFFLEVBQUUsQ0FBQ0MscUJBQXFCLENBQUNKLFdBQVc7TUFDNUQsQ0FBQztJQUNILENBQUMsQ0FBQztFQUNKLENBQUM7RUFFRCxNQUFNSyxPQUFPLEdBQUlOLFdBQVcsSUFBTU8sTUFBVyxJQUFLO0lBQ2hEVCxLQUFLLENBQUNJLHNCQUFzQixDQUFDLE1BQU07TUFDakMsT0FBTztRQUNMLENBQUNGLFdBQVcsR0FBR087TUFDakIsQ0FBQztJQUNILENBQUMsQ0FBQztFQUNKLENBQUM7RUFFRCxPQUFPO0lBQ0xDLE9BQU8sRUFBRVQsVUFBVSxDQUFDLFNBQVMsQ0FBQztJQUM5QlUsUUFBUSxFQUFFVixVQUFVLENBQUMsVUFBVSxDQUFDO0lBQ2hDVyxPQUFPLEVBQUVYLFVBQVUsQ0FBQyxTQUFTLENBQUM7SUFDOUJZLEtBQUssRUFBRVosVUFBVSxDQUFDLE9BQU8sQ0FBQztJQUMxQmEsTUFBTSxFQUFFTixPQUFPLENBQUMsUUFBUSxDQUFDO0lBQ3pCTyxNQUFNLEVBQUVQLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDekJRLFVBQVUsRUFBRVIsT0FBTyxDQUFDLFlBQVksQ0FBQztJQUNqQ1MsT0FBTyxFQUFFaEIsVUFBVSxDQUFDLFNBQVMsQ0FBQztJQUM5QmlCLFlBQVksRUFBRWpCLFVBQVUsQ0FBQyxRQUFRLENBQUM7SUFDbENrQixHQUFHLEVBQUVsQixVQUFVLENBQUMsS0FBSztFQUN2QixDQUFDO0FBQ0g7QUFFTyxTQUFTbUIsVUFBVSxDQUFFQyxHQUFRLEVBQUU7RUFDcEMsT0FBUUMsS0FBVSxJQUFLO0lBQUVDLE1BQU0sQ0FBQ0QsS0FBSyxDQUFDLENBQUNFLGFBQWEsQ0FBQ0gsR0FBRyxDQUFDO0VBQUMsQ0FBQztBQUM3RCJ9