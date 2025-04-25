import { createContext, useContext, useReducer } from 'react';
import Anonimous from './AnonimousMode.js';
import Authenticated from './AuthenticatedMode.js';

export const Mode = createContext(null);
export const ModeDispatch = createContext(null);

const ModeProvider = ({ children }) => {
  const [mode, dispatch] = useReducer(modeReducer, Anonimous);

  return (
    <Mode.Provider value={mode}>
      <ModeDispatch.Provider value={dispatch}>
        {children}
      </ModeDispatch.Provider>
    </Mode.Provider>
  );
};


export function useMode() {
  return useContext(Mode);
}

export function useModeDispatch() {
  return useContext(ModeDispatch);
}

function modeReducer(mode, action) {
  const { type } = action;
  switch (type) {
    case 'ANONIMOUS_MODE': {
      return Anonimous();
    }
    case 'AUTHENTICATED_MODE': {
      return Authenticated;
    }
    default: {
      throw Error('Unknown action: ' + type);
    }
  }
};

export default ModeProvider;
