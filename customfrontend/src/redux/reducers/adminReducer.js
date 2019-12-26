const initialState = {
 fullName: "",
 businessId: "",
 telephone: "",
 Id: "",
};

export const adminReducer = function(state = initialState, action) {
  switch(action.type){
    case "admin.login":
      const admin = Object.assign({}, state, {fullName: action.payload.fullName, businessId: action.payload.businessId, telephone: action.payload.telephone, id: action.payload.id});
      return admin;

      default :
      return state;
    }
}