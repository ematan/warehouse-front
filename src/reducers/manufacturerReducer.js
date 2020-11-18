import warehouseService from '../services/warehouse'

const reducer = (state={}, action) => {
  switch(action.type) {
    case 'FETCH_AVAILABILITY': {
      return { [action.data.manufacturer]: action.data.items, ...state }
    }
    default:
      return state
  }
}

export const fetchAvailability = (manufacturer, fetchCount=0) => {
  return async (dispatch) => {
    try {
      const res = await warehouseService.getAvailability(manufacturer)
      const items = await res.response
      //console.log(manufacturer, res)
      if (items && !Array.isArray(items)){
        if(fetchCount > 10) throw new Error(`Fetching ${manufacturer}'s availability failed after several attempts.`)
        dispatch(reFetch(manufacturer, fetchCount))
      }
      else {
        //reformat --->  manufacturer: { id: DATAPAYLOAD }
        const a = await items.reduce((a,b) => (a[b.id]=b.DATAPAYLOAD, a),  {})

        dispatch({
          type: 'FETCH_AVAILABILITY',
          data: {
            manufacturer: manufacturer,
            items: a,
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const reFetch = (manufacturer, count) => {
  return async dispatch => {
    //console.log('refetch:', manufacturer, 'times:', count+1)
    dispatch(fetchAvailability(manufacturer, count+1))
  }
}

export default reducer