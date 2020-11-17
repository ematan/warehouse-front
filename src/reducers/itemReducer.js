import warehouseService from '../services/warehouse'


const reducer = (state=[], action) => {
  switch(action.type) {
    case 'FETCH_ITEMS': {
      return { ...state, [action.data.category]: action.data.items }
    }
    case 'SAVE_MANUFACTURERS': {
      if(!state.manufacturers) return { ...state, manufacturers: action.data }
      const manufacturers = Array.from(new Set([...state.manufacturers, ...action.data]))
      return { ...state, manufacturers: manufacturers }
    }
    default:
      return state
  }
}

export const fetchItems = (cat) => {
  return async dispatch => {
    try {
      const items = await warehouseService.getAll(cat)
      const manufacturers = Array.from(new Set(items.map(i => i.manufacturer)))

      dispatch({
        type: 'FETCH_ITEMS',
        data: {
          category: cat,
          items: items,
        }
      })
      dispatch({
        type: 'SAVE_MANUFACTURERS',
        data: manufacturers
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default reducer
