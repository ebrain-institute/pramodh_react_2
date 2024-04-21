
import { useReducer } from 'react'
import './App.css'

interface State {
  count:number,
  error:string | null
}

interface Action {
  type: 'increment' | 'decrement'
}

function reducer(state: State, action:Action){
  const { type } = action;

  switch (type){
    case 'increment':{
      const newCount = state.count + 1; 
      const hasError = newCount > 5;

      return {...state, 
        count:hasError ? state.count : newCount,
        error: hasError ? 'Maximum reached': null
      }
    }
    case 'decrement':{
      const newCount = state.count - 1;
      const hasError = newCount < 0;
      return {...state, 
        count:hasError ? state.count : newCount,
        error: hasError ? 'Minimum reached': null
      }
    }
  }
}
function App() {
   const [state, disptach] = useReducer(reducer, { count:0, error:null });
  return (
    <div className='tutorial'>

        <div>
          Count: {state.count}
        </div>
        {state.error && <div> {state.error} </div>}
        <button onClick={()=>disptach({type:'increment'})}>
          Increment
        </button>
        <button onClick={()=>disptach({type:'decrement'})}>
          Decrement
        </button>


    </div>
  )
}

export default App
