import React from 'react';
import hookActions from './actions/hookActions';
import Input from './components/input/Input';

/**
 * Reducer to update state, call automatically by dispatch
 * @param {object} state - existing state
 * @param {object} action - contains 'type' and 'payload' properties for the state updated
 * @returns {object} - new state
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SECRET_WORD':
      return { ...state, secretWord: action.payload };

    default:
      throw new Error(`Invalid action type : ${action.type}`);
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, { secretWord: null });

  const setSecretWord = (secretWord) =>
    dispatch({ type: 'SET_SECRET_WORD', payload: secretWord });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  if (!state.secretWord) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    );
  }
  return (
    <div data-test="component-app">
      <Input secretWord={state.secretWord} />
    </div>
  );
};

export default App;
