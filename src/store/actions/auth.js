import * as actionTypes from './actionTypes'
import API from '../../API';


export const authStart=()=>{
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess=(token,userId)=>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId
    };
};

export const authFail=(error)=>{
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};
export const logout=()=>{
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout=(expirationtime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout());

        },expirationtime*1000*60)

    };
};


export const auth=(email,password,trainer)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            username:email,
            password:password,
            crossDomain: true 
        }
        if(trainer){
        API.post('trainers/authenticate',
        authData)
        .then(response=>{
            dispatch(authSuccess(response.data.token,response.data.id));
            dispatch(checkAuthTimeout(response.data.expirationTime))

        })
        .catch(err=>{
            dispatch(authFail(err.response));
        }

        )
    }else{
        API.post('players/authenticate',
        authData)
        .then(response=>{
            dispatch(authSuccess(response.data.token,response.data.id));
            dispatch(checkAuthTimeout(response.data.expirationTime))

        })
        .catch(err=>{
            dispatch(authFail(err.response));
        }

        )
        
    }
    };
};