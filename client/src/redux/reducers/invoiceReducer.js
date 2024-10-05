import { FETCH_INVOICES_REQUEST, FETCH_INVOICES_SUCCESS, FETCH_INVOICES_FAILURE } from '../actions/types';

const initialState = {
  invoices: [],
  loading: false,
  error: null,
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVOICES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_INVOICES_SUCCESS:
      return { ...state, loading: false, invoices: action.payload };
    case FETCH_INVOICES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default invoiceReducer;
