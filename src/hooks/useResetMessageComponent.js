import { resetMessage } from '../slices/PhotoSlice'

export const useResetMessageComponent = (dispatch) => {
  return () => {
    setTimeout(() => {
        dispatch(resetMessage())
    }, 2000)
  }
}