import warehouseService from '../services/warehouse'

const reducer = (state={}, action) => {
  switch(action.type) {
    case 'FETCH_AVAILABILITY': {
      return { [action.data.manufacturer]: action.data.items, ...state }
    }
    /*case 'SET_FOR_RELOAD': {
      if (state.toBeReloaded){
        console.log('add toReload', action.data)
        if (state.toBeReloaded.includes(action.data)){
          console.log('already has', action.data)
          const newdata = [...state.toBeReloaded, action.data]
          return { state, toBeReloaded: newdata }
        }
        return { ...state, toBeReloaded: [...state.toBeReloaded, action.data] }
      }
      return { toBeReloaded: [action.data], ...state }
    }
    case 'REMOVE_FROM_RELOAD': {
      if (state.toBeReloaded && state.toBeReloaded.includes(action.data)){
        console.log('remove', action.data)
        const data = state.toBeReloaded.filter(value => value !== action.data)
        return { ...state, toBeReloaded: data }
      } else return state
    }*/
    default:
      return state
  }
}

export const fetchAvailability = (manufacturer, fetchCount=0) => {
  return async (dispatch) => {
    try {
      const res = await warehouseService.getAvailability(manufacturer)
      const items = await res.response
      console.log(manufacturer, res)
      if (items && !Array.isArray(items)){
        dispatch(reFetch(manufacturer, fetchCount))
        /*const reload = state().manufacturers.toBeReloaded
        if(!(reload && reload.includes(manufacturer))){
          setTimeout(() => {
            dispatch({
              type: 'SET_FOR_RELOAD',
              data: manufacturer
            })
          }, 3000)

        }*/
      }
      else {
        const a = await items.reduce((a,b) => (a[b.id]=b.DATAPAYLOAD, a),  {})

        dispatch({
          type: 'FETCH_AVAILABILITY',
          data: {
            manufacturer: manufacturer,
            items: a,
          }
        })
        /*dispatch({
          type: 'REMOVE_FROM_RELOAD',
          data: manufacturer
        })*/
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const reFetch = (manufacturer, count) => {
  return async dispatch => {
    console.log('refetch:', manufacturer, 'times:', count+1)
    dispatch(fetchAvailability(manufacturer, count+1))
  }
}

export default reducer